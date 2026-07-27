import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyPolicyModalProps {
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090D16]/80 backdrop-blur-xl animate-fadeIn">
      <div className="bg-[#0F172A]/90 border border-white/20 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 max-h-[85vh] overflow-y-auto text-slate-300 text-xs sm:text-sm shadow-2xl backdrop-blur-2xl">
        
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2 font-bold text-white text-base">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <span>Política de Privacidade e LGPD</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 leading-relaxed">
          <p>
            Esta página respeita rigorosamente a privacidade e os direitos dos titulares de dados pessoais de acordo com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>

          <h4 className="font-bold text-slate-100 text-sm">1. Coleta de Informações</h4>
          <p>
            Coletamos exclusivamente os dados fornecidos voluntariamente por você através do formulário de cadastro: <strong>Nome Completo</strong>, <strong>E-mail</strong> e <strong>Telefone/WhatsApp</strong>.
          </p>

          <h4 className="font-bold text-slate-100 text-sm">2. Finalidade e Armazenamento</h4>
          <p>
            Os dados coletados são armazenados com segurança em banco de dados <strong>Supabase</strong> e utilizados estritamente para entrar em contato com você sobre os serviços e ofertas solicitados.
          </p>

          <h4 className="font-bold text-slate-100 text-sm">3. Direitos do Usuário</h4>
          <p>
            Você pode solicitar a alteração ou exclusão definitiva dos seus dados a qualquer momento enviando um pedido para a nossa equipe.
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:from-indigo-500 hover:to-purple-500 transition-colors cursor-pointer border border-white/20"
          >
            Entendi e Concordo
          </button>
        </div>

      </div>
    </div>
  );
};
