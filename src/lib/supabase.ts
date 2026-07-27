import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Lead, SupabaseConfig } from '../types';

const STORAGE_KEY_CONFIG = 'supabase_landing_config';
const STORAGE_KEY_LEADS = 'local_saved_leads';

export function getSavedSupabaseConfig(): SupabaseConfig {
  const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }

  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

  return {
    url: envUrl,
    anonKey: envKey,
    tableName: 'leads',
    isConnected: Boolean(envUrl && envKey),
  };
}

export function saveSupabaseConfig(config: SupabaseConfig) {
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const config = getSavedSupabaseConfig();
  if (!config.url || !config.anonKey) return null;

  try {
    if (!supabaseInstance) {
      supabaseInstance = createClient(config.url, config.anonKey);
    }
    return supabaseInstance;
  } catch (error) {
    console.error('Erro ao inicializar cliente Supabase:', error);
    return null;
  }
}

export function resetSupabaseInstance() {
  supabaseInstance = null;
}

export async function testSupabaseConnection(url: string, key: string, tableName = 'leads'): Promise<{ success: boolean; message: string }> {
  if (!url || !key) {
    return { success: false, message: 'URL e Anon Key do Supabase são obrigatórios.' };
  }

  try {
    const tempClient = createClient(url, key);
    // Tenta selecionar 1 registro da tabela
    const { error } = await tempClient.from(tableName).select('count', { count: 'exact', head: true });

    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return { 
          success: false, 
          message: `A tabela "${tableName}" não foi encontrada no Supabase. Execute o script SQL para criá-la.` 
        };
      }
      return { success: false, message: `Erro no Supabase: ${error.message}` };
    }

    return { success: true, message: `Conexão efetuada com sucesso! Tabela "${tableName}" pronta.` };
  } catch (err: any) {
    return { success: false, message: `Falha ao conectar: ${err.message || 'Verifique a URL e Chave.'}` };
  }
}

// Salva lead localmente (Fallback)
export function getLocalLeads(): Lead[] {
  const saved = localStorage.getItem(STORAGE_KEY_LEADS);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveLocalLead(lead: Lead): Lead[] {
  const current = getLocalLeads();
  const updated = [lead, ...current];
  localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(updated));
  return updated;
}

export function deleteLocalLead(id: string): Lead[] {
  const current = getLocalLeads();
  const updated = current.filter(l => l.id !== id);
  localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(updated));
  return updated;
}

// Salva lead no Supabase + Servidor + LocalStorage
export async function sendLead(data: { nome: string; email: string; telefone: string }): Promise<{ success: boolean; lead: Lead; storedInSupabase: boolean; message: string }> {
  const newLead: Lead = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead_${Date.now()}`,
    nome: data.nome.trim(),
    email: data.email.trim().toLowerCase(),
    telefone: data.telefone.trim(),
    origem: 'Landing Page Lead Form',
    created_at: new Date().toISOString(),
    status: 'Novo'
  };

  // 1. Tentar enviar via Backend Express API
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead)
    });
    
    if (res.ok) {
      const result = await res.json();
      saveLocalLead(result.lead || newLead);
      return result;
    }
  } catch (e) {
    console.warn('API local indisponível, tentando Supabase direto no cliente...', e);
  }

  // 2. Tentar via Supabase Client direto
  const client = getSupabaseClient();
  const config = getSavedSupabaseConfig();
  let supabaseSuccess = false;
  let supabaseMsg = '';

  if (client) {
    try {
      const { data: dbData, error } = await client
        .from(config.tableName || 'leads')
        .insert([
          {
            nome: newLead.nome,
            email: newLead.email,
            telefone: newLead.telefone,
            origem: newLead.origem,
            status: newLead.status,
            created_at: newLead.created_at,
          }
        ])
        .select();

      if (!error) {
        supabaseSuccess = true;
        if (dbData && dbData[0]) {
          newLead.id = dbData[0].id || newLead.id;
        }
      } else {
        supabaseMsg = error.message;
        console.error('Erro ao salvar no Supabase:', error);
      }
    } catch (err: any) {
      supabaseMsg = err.message || 'Erro de conexão Supabase';
      console.error('Erro de requisição Supabase:', err);
    }
  }

  // Sempre salva na memória local para garantia visual de captura
  saveLocalLead(newLead);

  return {
    success: true,
    lead: newLead,
    storedInSupabase: supabaseSuccess,
    message: supabaseSuccess 
      ? 'Lead gravado com sucesso no Supabase!' 
      : (supabaseMsg ? `Salvo localmente (Supabase avisou: ${supabaseMsg})` : 'Salvo no modo de demonstração local.')
  };
}

export async function fetchAllLeads(): Promise<Lead[]> {
  let leadsList: Lead[] = getLocalLeads();

  // Tenta buscar no servidor
  try {
    const res = await fetch('/api/leads');
    if (res.ok) {
      const serverLeads = await res.json();
      if (Array.isArray(serverLeads) && serverLeads.length > 0) {
        // Mesclar
        const combined = [...serverLeads, ...leadsList];
        const uniqueMap = new Map();
        combined.forEach(item => uniqueMap.set(item.id || item.email, item));
        return Array.from(uniqueMap.values());
      }
    }
  } catch (err) {
    console.warn('Falha ao buscar do servidor express', err);
  }

  // Tenta buscar do Supabase
  const client = getSupabaseClient();
  const config = getSavedSupabaseConfig();
  if (client) {
    try {
      const { data, error } = await client
        .from(config.tableName || 'leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data as Lead[];
      }
    } catch (e) {
      console.warn('Erro ao buscar do Supabase directly', e);
    }
  }

  return leadsList;
}
