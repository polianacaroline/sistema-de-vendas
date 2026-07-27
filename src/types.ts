export interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  origem?: string;
  created_at: string;
  status?: 'Novo' | 'Em Atendimento' | 'Convertido' | 'Finalizado';
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  tableName: string;
  isConnected: boolean;
}

export interface FormState {
  nome: string;
  email: string;
  telefone: string;
}

export interface FormErrors {
  nome?: string;
  email?: string;
  telefone?: string;
}
