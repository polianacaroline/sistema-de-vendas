import React from 'react';
import { Building2, MapPin, Layers, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const FeaturedBuildingsSection: React.FC = () => {
  const buildings = [
    {
      id: 'predio-1',
      tag: 'Lançamento Exclusivo',
      title: 'Grand Tower Residence',
      location: 'Jardins - São Paulo, SP',
      type: 'Edifício Residencial de Alto Padrão',
      price: 'Sob Consulta / A partir de R$ 1.850.000',
      specs: {
        units: '36 Unidades',
        area: '140 m² a 320 m²',
        parking: '2 a 4 Vagas',
      },
      highlights: ['Rooftop com Piscina Aquecida', 'Portaria Blindada 24h', 'Gerador Full', 'Espaço Gourmet'],
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'predio-2',
      tag: 'Prédio Comercial Corporativo',
      title: 'Nexus Corporate Center',
      location: 'Av. Brigadeiro Faria Lima - São Paulo, SP',
      type: 'Edifício Comercial Inteiro / Lajes Corporativas',
      price: 'Venda de Prédio Inteiro ou Lajes',
      specs: {
        units: '14 Andares / Lajes',
        area: '520 m² por andar (7.280 m² total)',
        parking: '120 Vagas Garagem',
      },
      highlights: ['Certificação LEED Gold', 'Heliponto Homologado', 'Elevadores Inteligentes High-Speed', 'Auditório'],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'predio-3',
      tag: 'Oportunidade para Investidores',
      title: 'Horizon Horizon View & Suites',
      location: 'Beira-Mar - Balneário Camboriú, SC',
      type: 'Prédio Misto (Residencial + Studios)',
      price: 'A partir de R$ 980.000 / Unidade',
      specs: {
        units: '48 Studios & Apartamentos',
        area: '45 m² a 110 m²',
        parking: '1 a 2 Vagas',
      },
      highlights: ['Rentabilidade com Short-Stay', 'Gestão de Locação Integrada', 'Vista Panorâmica', 'Spa & Fitness'],
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const scrollToForm = () => {
    const el = document.getElementById('hero-lead-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="predios-a-venda" className="py-20 bg-[#0B1120] text-white relative border-b border-white/10">
      
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Empreendimentos em Destaque</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Prédios e Edifícios Disponíveis para Venda
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Conheça alguns dos principais prédios residenciais, comerciais e corporativos do nosso portfólio. Preencha o formulário para receber a apresentação completa e plantas.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {buildings.map((b) => (
            <div
              key={b.id}
              className="bg-white/5 border border-white/10 hover:border-indigo-500/40 rounded-3xl overflow-hidden backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/50 hover:-translate-y-1.5 group"
            >
              <div>
                {/* Building Photo Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-black/30" />
                  
                  {/* Top Tag */}
                  <div className="absolute top-4 left-4 bg-indigo-600/90 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md border border-white/20 shadow-md">
                    {b.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                      {b.type}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-indigo-300 transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{b.location}</span>
                    </p>
                  </div>

                  {/* Specs Pill Grid */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-white/5 rounded-2xl border border-white/10 text-[11px] text-center">
                    <div>
                      <div className="text-slate-400 text-[10px]">Unidades</div>
                      <div className="font-bold text-slate-100">{b.specs.units}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">Área</div>
                      <div className="font-bold text-slate-100">{b.specs.area}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">Vagas</div>
                      <div className="font-bold text-slate-100">{b.specs.parking}</div>
                    </div>
                  </div>

                  {/* Highlights List */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Diferenciais:</span>
                    <ul className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                      {b.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-6 pt-0 border-t border-white/5 mt-4">
                <div className="text-xs font-semibold text-amber-300 mb-3 font-mono">
                  {b.price}
                </div>
                <button
                  onClick={scrollToForm}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-white/20 active:scale-95"
                >
                  <span>Receber Apresentação & Plantas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
