import React from 'react';
import { Building2, Users, Sparkles, Database, ArrowUpRight } from 'lucide-react';
import { SupabaseConfig } from '../types';

interface HeaderProps {
  supabaseConfig: SupabaseConfig;
  onOpenSupabaseModal: () => void;
  onOpenLeadsDrawer: () => void;
  leadsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  supabaseConfig,
  onOpenSupabaseModal,
  onOpenLeadsDrawer,
  leadsCount,
}) => {
  const scrollToForm = () => {
    const formEl = document.getElementById('hero-lead-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/10 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToForm}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
              <Building2 className="w-5 h-5 text-white font-bold" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                TOWER<span className="text-amber-400">PRÉDIOS</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-semibold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full ml-2 border border-amber-500/30">
                VENDAS
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#predios-a-venda" className="hover:text-indigo-400 transition-colors">
              Prédios à Venda
            </a>
            <a href="#beneficios" className="hover:text-indigo-400 transition-colors">
              Benefícios
            </a>
            <a href="#como-funciona" className="hover:text-indigo-400 transition-colors">
              Como Funciona
            </a>
            <a href="#depoimentos" className="hover:text-indigo-400 transition-colors">
              Depoimentos
            </a>
            <a href="#faq" className="hover:text-indigo-400 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Supabase connection indicator button */}
            <button
              onClick={onOpenSupabaseModal}
              title="Configurar Conexão Supabase"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border backdrop-blur-md ${
                supabaseConfig.isConnected
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">
                {supabaseConfig.isConnected ? 'Supabase Conectado' : 'Configurar Supabase'}
              </span>
              <span className={`w-2 h-2 rounded-full ${supabaseConfig.isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            </button>

            {/* View captured leads drawer button */}
            <button
              onClick={onOpenLeadsDrawer}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10 backdrop-blur-md transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Interessados</span>
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-1.5 py-0.2 text-[11px] rounded-full">
                {leadsCount}
              </span>
            </button>

            {/* CTA button */}
            <button
              onClick={scrollToForm}
              className="hidden sm:flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all transform active:scale-95 shadow-lg shadow-indigo-600/25 border border-white/20"
            >
              <span>Quero Receber Ofertas</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
