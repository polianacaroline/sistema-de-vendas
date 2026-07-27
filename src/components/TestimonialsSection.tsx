import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Dr. Eduardo Fontes',
      role: 'Investidor Imobiliário',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      text: 'Adquiri duas lajes corporativas através do formulário de lançamento. O atendimento foi ágil e recebi todo o material técnico e contrato com total transparência.',
      rating: 5,
    },
    {
      name: 'Mariana Siqueira',
      role: 'Compradora - Grand Tower Residence',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      text: 'Preenchi meu nome, e-mail e telefone no site e em menos de 10 minutos um consultor especializado me chamou no WhatsApp com as plantas do prédio. Processo perfeito!',
      rating: 5,
    },
    {
      name: 'Carlos Eduardo Meirelles',
      role: 'Diretor de Incorporação',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
      text: 'A integração com o Supabase permite que nossa equipe receba os cadastros de novos compradores de edifícios em tempo real sem qualquer perda de informação.',
      rating: 5,
    },
  ];

  return (
    <section id="depoimentos" className="py-20 bg-[#0F172A] text-white relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20 backdrop-blur-md inline-block">
            Prova Social
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Quem usa, recomenda e aprova
          </h2>
          <p className="text-slate-300 text-base">
            Veja o depoimento de quem já gera centenas de cadastros diariamente com esta estrutura.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl hover:bg-white/10 hover:border-indigo-500/40 transition-all flex flex-col justify-between relative group">
              <Quote className="w-8 h-8 text-indigo-400/20 absolute top-6 right-6" />

              <div className="space-y-4 relative z-10">
                <div className="flex text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-200 italic leading-relaxed">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-white/10">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/40"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{t.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                  </h4>
                  <p className="text-xs text-slate-300">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
