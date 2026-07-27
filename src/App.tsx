import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturedBuildingsSection } from './components/FeaturedBuildingsSection';
import { BenefitsSection } from './components/BenefitsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TargetAudienceSection } from './components/TargetAudienceSection';
import { CtaSection } from './components/CtaSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { LeadsDrawer } from './components/LeadsDrawer';
import { Lead, SupabaseConfig } from './types';
import { getSavedSupabaseConfig, fetchAllLeads } from './lib/supabase';

export default function App() {
  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfig>(getSavedSupabaseConfig());
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showSupabaseModal, setShowSupabaseModal] = useState(false);
  const [showLeadsDrawer, setShowLeadsDrawer] = useState(false);

  // Carregar leads ao iniciar
  const loadLeads = async () => {
    try {
      const data = await fetchAllLeads();
      setLeads(data);
    } catch (e) {
      console.warn('Erro ao buscar leads:', e);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleLeadAdded = (newLead: Lead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] font-sans text-slate-100 antialiased selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* Header */}
      <Header
        supabaseConfig={supabaseConfig}
        onOpenSupabaseModal={() => setShowSupabaseModal(true)}
        onOpenLeadsDrawer={() => setShowLeadsDrawer(true)}
        leadsCount={leads.length}
      />

      {/* Main Long Page Content */}
      <main>
        {/* PRIMEIRA PÁGINA COM FORMULÁRIO DE CAPTURA (Nome, Email, Telefone) */}
        <HeroSection
          supabaseConfig={supabaseConfig}
          onLeadAdded={handleLeadAdded}
          onOpenSupabaseModal={() => setShowSupabaseModal(true)}
        />

        {/* VITRINE DE PRÉDIOS À VENDA */}
        <FeaturedBuildingsSection />

        {/* BENEFÍCIOS */}
        <BenefitsSection />

        {/* COMO FUNCIONA */}
        <HowItWorksSection />

        {/* DEPOIMENTOS / PROVA SOCIAL */}
        <TestimonialsSection />

        {/* PÚBLICO ALVO */}
        <TargetAudienceSection />

        {/* CALL TO ACTION SECUNDÁRIO */}
        <CtaSection />

        {/* PERGUNTAS FREQUENTES */}
        <FaqSection />
      </main>

      {/* FOOTER */}
      <Footer onOpenSupabaseModal={() => setShowSupabaseModal(true)} />

      {/* MODAL CONFIGURAÇÃO SUPABASE */}
      {showSupabaseModal && (
        <SupabaseConfigModal
          config={supabaseConfig}
          onClose={() => setShowSupabaseModal(false)}
          onUpdateConfig={newConfig => {
            setSupabaseConfig(newConfig);
            loadLeads();
          }}
        />
      )}

      {/* DRAWER PAINEL DE LEADS */}
      {showLeadsDrawer && (
        <LeadsDrawer
          leads={leads}
          onClose={() => setShowLeadsDrawer(false)}
          onRefresh={loadLeads}
          onLeadsUpdated={updated => setLeads(updated)}
        />
      )}

    </div>
  );
}
