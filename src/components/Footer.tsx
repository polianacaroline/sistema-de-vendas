import React, { useState } from 'react';
import { Building2, Database, Heart, Shield, Lock } from 'lucide-react';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';

interface FooterProps {
  onOpenSupabaseModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSupabaseModal }) => {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer className="bg-[#0B1120] text-slate-400 border-t border-white/10 text-xs py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-white/10">
          
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">TOWER<span className="text-amber-400">PRÉDIOS</span> VENDAS</span>
            </div>
            <p className="text-slate-300 max-w-md leading-relaxed">
              Plataforma de apresentação e captura de interessados para venda de edifícios, prédios comerciais e residenciais com salvamento automático de Nome, E-mail e Telefone no Supabase.
            </p>
            <div className="flex items-center gap-2 text-indigo-400 font-medium">
              <Lock className="w-3.5 h-3.5" />
              <span>Conexão Segura SSL Criptografada & LGPD</span>
            </div>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3 uppercase tracking-wider text-[11px]">Navegação</h4>
            <ul className="space-y-2">
              <li><a href="#beneficios" className="hover:text-indigo-400 transition-colors">Benefícios</a></li>
              <li><a href="#como-funciona" className="hover:text-indigo-400 transition-colors">Como Funciona</a></li>
              <li><a href="#depoimentos" className="hover:text-indigo-400 transition-colors">Depoimentos</a></li>
              <li><a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3 uppercase tracking-wider text-[11px]">Banco de Dados</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenSupabaseModal} className="text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer">
                  <Database className="w-3 h-3" />
                  <span>Configurar Supabase</span>
                </button>
              </li>
              <li>
                <button onClick={() => setShowPrivacy(true)} className="hover:text-slate-200 transition-colors cursor-pointer">
                  Política de Privacidade
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© {new Date().getFullYear()} NEXUSDATA PRO. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1 text-slate-300">
            <span>Integrado com</span>
            <span className="text-indigo-400 font-bold">Supabase</span>
          </div>
        </div>
      </div>

      {showPrivacy && <PrivacyPolicyModal onClose={() => setShowPrivacy(false)} />}
    </footer>
  );
};
