import React from 'react';
import { FormInput, Server, Database, PhoneCall, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Preenchimento do Form',
      description: 'O interessado insere Nome, E-mail e Telefone (WhatsApp) no formulário do topo.',
      icon: <FormInput className="w-6 h-6 text-indigo-400" />,
    },
    {
      step: '02',
      title: 'Armazenamento no Supabase',
      description: 'As informações são enviadas e salvas com segurança na tabela de leads do banco Supabase.',
      icon: <Database className="w-6 h-6 text-indigo-400" />,
    },
    {
      step: '03',
      title: 'Recebimento de Materiais',
      description: 'O comprador recebe o book executivo, plantas baixas e tabela de preços dos prédios.',
      icon: <Server className="w-6 h-6 text-indigo-400" />,
    },
    {
      step: '04',
      title: 'Atendimento & Negociação',
      description: 'Nossa equipe de consultores especialistas entra em contato via WhatsApp para tirar dúvidas.',
      icon: <PhoneCall className="w-6 h-6 text-indigo-400" />,
    },
  ];

  const scrollToForm = () => {
    const el = document.getElementById('hero-lead-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="como-funciona" className="py-20 bg-[#0F172A] text-white relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20 backdrop-blur-md inline-block">
            Passo a Passo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Como funciona da captura ao atendimento comercial
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Um processo automatizado e ágil para conectar investidores e compradores aos melhores edifícios do mercado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => (
            <div key={index} className="relative bg-white/5 border border-white/10 hover:border-indigo-500/40 hover:bg-white/10 p-6 rounded-3xl backdrop-blur-xl flex flex-col justify-between transition-all group">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-indigo-500/20 transition-all">
                    {item.icon}
                  </div>
                  <span className="text-3xl font-black text-white/20 tracking-tighter">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-indigo-400/40" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-600/25 border border-white/20"
          >
            <span>Testar o Formulário Agora</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
