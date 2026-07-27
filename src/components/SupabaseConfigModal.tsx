import React, { useState } from 'react';
import { 
  X, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw,
  Code
} from 'lucide-react';
import { SupabaseConfig } from '../types';
import { testSupabaseConnection, saveSupabaseConfig, resetSupabaseInstance } from '../lib/supabase';

interface SupabaseConfigModalProps {
  config: SupabaseConfig;
  onClose: () => void;
  onUpdateConfig: (newConfig: SupabaseConfig) => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  config,
  onClose,
  onUpdateConfig,
}) => {
  const [url, setUrl] = useState(config.url || '');
  const [anonKey, setAnonKey] = useState(config.anonKey || '');
  const [tableName, setTableName] = useState(config.tableName || 'leads');

  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  const sqlScript = `-- Executar este código no SQL Editor do seu projeto Supabase:

CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  origem TEXT DEFAULT 'Landing Page',
  status TEXT DEFAULT 'Novo',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar inserção de formulário (Row Level Security):
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir inserções públicas de leads" 
  ON leads FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Permitir leitura de leads" 
  ON leads FOR SELECT 
  USING (true);
`;

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testSupabaseConnection(url, anonKey, tableName);
      setTestResult(res);
      if (res.success) {
        const updated: SupabaseConfig = {
          url: url.trim(),
          anonKey: anonKey.trim(),
          tableName: tableName.trim(),
          isConnected: true,
        };
        saveSupabaseConfig(updated);
        resetSupabaseInstance();
        onUpdateConfig(updated);
      }
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    const updated: SupabaseConfig = {
      url: url.trim(),
      anonKey: anonKey.trim(),
      tableName: tableName.trim(),
      isConnected: Boolean(url.trim() && anonKey.trim()),
    };
    saveSupabaseConfig(updated);
    resetSupabaseInstance();
    onUpdateConfig(updated);
    onClose();
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlScript);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090D16]/80 backdrop-blur-xl animate-fadeIn">
      <div className="bg-[#0F172A]/90 border border-white/20 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-slate-200 shadow-2xl shadow-indigo-950/50 backdrop-blur-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Configuração do Supabase</h3>
              <p className="text-xs text-slate-300">Conecte seu próprio banco de dados para salvar os leads</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Two Quick Supabase Links for Key & Setup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl backdrop-blur-md">
          <a
            href="https://supabase.com/dashboard/project/_/settings/api"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/40 text-xs text-indigo-300 font-semibold transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
              <ExternalLink className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-xs">1. Obter URL e Chave API</div>
              <div className="text-[10px] text-slate-300 font-normal">Configurações de API no Supabase</div>
            </div>
          </a>

          <a
            href="https://supabase.com/dashboard/project/_/sql/new"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/40 text-xs text-indigo-300 font-semibold transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
              <Code className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-xs">2. Criar Tabela no SQL Editor</div>
              <div className="text-[10px] text-slate-300 font-normal">Editor SQL do Supabase</div>
            </div>
          </a>
        </div>

        {/* Credentials Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Project URL do Supabase
            </label>
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://xyzxyz.supabase.co"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/50 font-mono transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Anon Key / Public API Key
            </label>
            <input
              type="password"
              value={anonKey}
              onChange={e => setAnonKey(e.target.value)}
              placeholder="eyJhY2Nlc3NfdG9rZW4iOi..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/50 font-mono transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Nome da Tabela
            </label>
            <input
              type="text"
              value={tableName}
              onChange={e => setTableName(e.target.value)}
              placeholder="leads"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/50 font-mono transition-all"
            />
          </div>

          {/* Test connection feedback */}
          {testResult && (
            <div className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 border backdrop-blur-md ${
              testResult.success 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                : 'bg-red-500/10 border-red-500/30 text-red-300'
            }`}>
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleTest}
              disabled={isTesting || !url || !anonKey}
              className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isTesting ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
              ) : (
                <Database className="w-3.5 h-3.5 text-indigo-400" />
              )}
              <span>Testar Conexão</span>
            </button>

            <button
              onClick={handleSave}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs transition-colors shadow-lg shadow-indigo-600/25 border border-white/20 cursor-pointer"
            >
              Salvar Configurações
            </button>
          </div>
        </div>

        {/* SQL Setup Helper Section */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <Code className="w-4 h-4 text-indigo-400" />
              <span>Script SQL para criar a tabela no Supabase</span>
            </div>
            <button
              onClick={handleCopySql}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 border border-white/10 transition-colors cursor-pointer"
            >
              {copiedSql ? (
                <>
                  <Check className="w-3 h-3 text-indigo-400" />
                  <span className="text-indigo-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copiar SQL</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-slate-400">
            Acesse o painel do seu projeto no Supabase &gt; <strong>SQL Editor</strong> e execute este comando para estruturar os campos de Nome, Email e Telefone:
          </p>

          <pre className="p-3 bg-black/30 border border-white/10 rounded-2xl text-[11px] font-mono text-indigo-300 overflow-x-auto max-h-40 backdrop-blur-md">
            {sqlScript}
          </pre>

          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:underline pt-1"
          >
            <span>Abrir Dashboard do Supabase</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
