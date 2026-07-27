import React from 'react';
import { Zap, ShieldCheck, TrendingUp, Database, Users, Clock, Sparkles } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <Database className="w-6 h-6 text-indigo-400" />,
      title: 'Armazenamento Direto no Supabase',
      description: 'Cada interesse preenchido com Nome, E-mail e Telefone é gravado instantaneamente na tabela do seu projeto Supabase.',
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: 'Plantas Técnicas & Tabela de Valores',
      description: 'Receba imediatamente a tabela atualizada de valores de lançamento, metragem das unidades e plantas arquitetônicas.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
      title: 'Atendimento Direto & Segurança LGPD',
      description: 'Seus dados são protegidos com criptografia SSL e tratados exclusivamente pela equipe responsável do empreendimento.',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-indigo-400" />,
      title: 'Condições Especiais de Lançamento',
      description: 'Garantia de tabela VIP com fluxo de pagamento facilitado na planta e desconto para investidores.',
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-400" />,
      title: 'Gestão Completa de Interessados',
      description: 'Painel administrativo integrado para filtrar, organizar e exportar a lista de interessados em CSV com 1 clique.',
    },
    {
      icon: <Clock className="w-6 h-6 text-indigo-400" />,
      title: 'Agendamento Rápido de Visita',
      description: 'Atendimento via WhatsApp em poucos minutos para tirar dúvidas, visitar o decorado e analisar contratos.',
    },
  ];

  return (
    <section id="beneficios" className="py-20 bg-[#0F172A] text-white relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vantagens do Nosso Sistema</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Por que cadastrar seu interesse em nossos prédios?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Oferecemos uma experiência transparente e ágil para quem deseja comprar ou investir em edifícios e empreendimentos.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="group bg-white/5 border border-white/10 hover:border-indigo-500/40 hover:bg-white/10 p-6 rounded-3xl backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/40 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
