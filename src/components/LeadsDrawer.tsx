import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Search, 
  Download, 
  Trash2, 
  Phone, 
  Mail, 
  User, 
  Calendar, 
  CheckCircle2, 
  MessageSquare,
  RefreshCw
} from 'lucide-react';
import { Lead } from '../types';
import { deleteLocalLead } from '../lib/supabase';

interface LeadsDrawerProps {
  leads: Lead[];
  onClose: () => void;
  onRefresh: () => void;
  onLeadsUpdated: (leads: Lead[]) => void;
}

export const LeadsDrawer: React.FC<LeadsDrawerProps> = ({
  leads,
  onClose,
  onRefresh,
  onLeadsUpdated,
}) => {
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredLeads = leads.filter(l => {
    const term = search.toLowerCase();
    return (
      l.nome.toLowerCase().includes(term) ||
      l.email.toLowerCase().includes(term) ||
      l.telefone.includes(term)
    );
  });

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      // 1. Apagar via API
      await fetch(`/api/leads/${id}`, { method: 'DELETE' }).catch(() => {});
      // 2. Apagar localmente
      const updated = deleteLocalLead(id);
      onLeadsUpdated(updated);
    } finally {
      setDeletingId(null);
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) return;

    const headers = ['ID', 'Nome', 'Email', 'Telefone', 'Origem', 'Data_Cadastro'];
    const rows = leads.map(l => [
      l.id,
      `"${l.nome}"`,
      `"${l.email}"`,
      `"${l.telefone}"`,
      `"${l.origem || 'Landing Page'}"`,
      `"${new Date(l.created_at).toLocaleString('pt-BR')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_supabase_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // WhatsApp click handler
  const openWhatsApp = (phone: string) => {
    const cleanDigits = phone.replace(/\D/g, '');
    const countryPhone = cleanDigits.length <= 11 ? `55${cleanDigits}` : cleanDigits;
    window.open(`https://wa.me/${countryPhone}?text=${encodeURIComponent('Olá! Vi que você se cadastrou em nossa landing page.')}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#090D16]/80 backdrop-blur-xl animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-[#0F172A]/95 border-l border-white/20 text-slate-200 flex flex-col shadow-2xl backdrop-blur-2xl">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-500/30">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Leads Capturados</span>
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-md">
                    {leads.length}
                  </span>
                </h2>
                <p className="text-xs text-slate-300">Contatos recebidos com Nome, E-mail e Telefone</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onRefresh}
                title="Atualizar lista"
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Action Bar (Search & Export CSV) */}
          <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-md flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar por nome, e-mail ou telefone..."
                className="w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            <button
              onClick={exportCSV}
              disabled={leads.length === 0}
              className="w-full sm:w-auto px-4 py-2 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Exportar CSV</span>
            </button>
          </div>

          {/* Leads List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredLeads.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Users className="w-12 h-12 text-slate-500 mx-auto opacity-60" />
                <h3 className="text-sm font-semibold text-slate-300">Nenhum lead encontrado</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  {search ? 'Nenhum resultado corresponde à sua pesquisa.' : 'Preencha o formulário na landing page para cadastrar o primeiro lead.'}
                </p>
              </div>
            ) : (
              filteredLeads.map(lead => (
                <div
                  key={lead.id}
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-indigo-500/40 hover:bg-white/10 backdrop-blur-md transition-all space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>{lead.nome}</span>
                      </h3>
                      <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
                      </p>
                      <p className="text-xs text-slate-200 flex items-center gap-1.5 mt-1">
                        <Phone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span className="font-mono">{lead.telefone}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openWhatsApp(lead.telefone)}
                        title="Chamar no WhatsApp"
                        className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </button>

                      <button
                        onClick={() => handleDelete(lead.id)}
                        disabled={deletingId === lead.id}
                        title="Excluir lead"
                        className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {new Date(lead.created_at).toLocaleString('pt-BR')}
                    </span>
                    <span className="text-indigo-300">
                      {lead.origem || 'Landing Page'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
