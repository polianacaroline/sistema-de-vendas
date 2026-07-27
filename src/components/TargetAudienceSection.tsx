import React from 'react';
import { Check, X, Building2, UserCheck, Rocket, ShoppingBag } from 'lucide-react';

export const TargetAudienceSection: React.FC = () => {
  const targetGroups = [
    {
      title: 'Investidores Imobiliários',
      desc: 'Buscando rentabilidade com locação corporativa ou renda passiva de unidades residenciais e studios.',
      icon: <Rocket className="w-5 h-5 text-indigo-400" />,
    },
    {
      title: 'Compradores de Prédio Inteiro / Corporativo',
      desc: 'Empresas, family offices e fundos interessados em edifícios comerciais completos para sede ou patrimônio.',
      icon: <Building2 className="w-5 h-5 text-indigo-400" />,
    },
    {
      title: 'Famílias & Compradores Residenciais',
      desc: 'Procurando novos edifícios residenciais de alto padrão com infraestrutura completa de lazer e segurança.',
      icon: <UserCheck className="w-5 h-5 text-indigo-400" />,
    },
    {
      title: 'Imobiliárias & Corretores Parceiros',
      desc: 'Interessados em parcerias de vendas e apresentações comerciais de lançamentos imobiliários.',
      icon: <ShoppingBag className="w-5 h-5 text-indigo-400" />,
    },
  ];

  return (
    <section className="py-20 bg-[#0F172A] text-white relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20 backdrop-blur-md inline-block">
            Público-Alvo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Para quem nossos empreendimentos são indicados?
          </h2>
          <p className="text-slate-300 text-base">
            Desenvolvido para atender investidores exigentes, famílias e grandes empresas em busca dos melhores ativos imobiliários.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetGroups.map((group, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl hover:border-indigo-500/40 hover:bg-white/10 transition-all space-y-3 group">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-indigo-500/20 transition-all">
                {group.icon}
              </div>
              <h3 className="text-base font-bold text-white">{group.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{group.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
