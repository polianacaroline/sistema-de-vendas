import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const faqs = [
    {
      q: 'Onde as informações do formulário (Nome, Email, Telefone) são salvas?',
      a: 'As informações preenchidas são salvas diretamente no Supabase na tabela de leads cadastrada, bem como mantidas na memória do servidor e no histórico local para você poder visualizar e exportar a qualquer momento.',
    },
    {
      q: 'Como faço para integrar o meu próprio banco de dados do Supabase?',
      a: 'Clique no botão "Configurar Supabase" no cabeçalho ou no topo do formulário. Insira a URL do seu projeto e a sua Anon Key. Disponibilizamos também um script SQL pronto para você criar a tabela com apenas um clique!',
    },
    {
      q: 'O que acontece se eu não tiver uma conta no Supabase configurada ainda?',
      a: 'Não se preocupe! A landing page funciona perfeitamente em modo de demonstração local. Todas as capturas de leads são salvas localmente no seu navegador e no servidor para que você possa testar e visualizar todos os contatos imediatamente.',
    },
    {
      q: 'O número de telefone possui máscara de formatação automática?',
      a: 'Sim! O campo de telefone formata automaticamente os números no padrão brasileiro com DDD: (XX) XXXXX-XXXX para celulares e (XX) XXXX-XXXX para telefones fixos.',
    },
    {
      q: 'Posso exportar a lista de leads capturados?',
      a: 'Sim, através do painel "Leads Capturados" você pode buscar por nome/email, filtrar por status e exportar todos os seus dados em formato CSV para usar no Excel ou CRM.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#0F172A] text-white relative border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="text-slate-300 text-base">
            Tudo o que você precisa saber sobre o formulário de captura e a integração com Supabase.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl transition-all hover:bg-white/10 hover:border-indigo-500/40"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-100">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-indigo-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 text-xs sm:text-sm text-slate-300 border-t border-white/10 pt-4 leading-relaxed animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
