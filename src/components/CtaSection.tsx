import React from 'react';
import { ArrowUp, Sparkles, ShieldCheck, Database, Zap } from 'lucide-react';

export const CtaSection: React.FC = () => {
  const scrollToForm = () => {
    const formEl = document.getElementById('hero-lead-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="py-20 bg-[#0F172A] text-white relative border-b border-white/10 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 sm:p-12 rounded-3xl shadow-2xl shadow-indigo-950/40 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Não Perca Esta Oportunidade</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white max-w-2xl mx-auto">
            Pronto para encontrar o prédio dos seus sonhos ou seu próximo investimento?
          </h2>

          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Preencha Nome, E-mail e Telefone no formulário localizado no topo desta página e receba a tabela completa de valores e plantas diretamente no seu WhatsApp e e-mail.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95 border border-white/20"
            >
              <ArrowUp className="w-5 h-5" />
              <span>Voltar ao Formulário no Topo</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 pt-4">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Garantia de Privacidade</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Database className="w-4 h-4 text-indigo-400" />
              <span>Conexão Supabase Pronta</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
