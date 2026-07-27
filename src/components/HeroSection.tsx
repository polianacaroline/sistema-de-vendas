import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  Database, 
  User, 
  Mail, 
  Phone, 
  ArrowRight, 
  Lock,
  Star,
  Zap
} from 'lucide-react';
import { FormState, FormErrors, Lead, SupabaseConfig } from '../types';
import { sendLead } from '../lib/supabase';

interface HeroSectionProps {
  supabaseConfig: SupabaseConfig;
  onLeadAdded: (lead: Lead) => void;
  onOpenSupabaseModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  supabaseConfig,
  onLeadAdded,
  onOpenSupabaseModal,
}) => {
  const [formData, setFormData] = useState<FormState>({
    nome: '',
    email: '',
    telefone: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [submitResultMsg, setSubmitResultMsg] = useState<{ isSupabase: boolean; text: string } | null>(null);

  // Phone mask helper for Brazilian phone numbers: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits ? `(${digits}` : '';
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, telefone: formatted }));
    if (errors.telefone) setErrors(prev => ({ ...prev, telefone: undefined }));
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Por favor, informe seu nome completo.';
    } else if (formData.nome.trim().length < 3) {
      newErrors.nome = 'O nome deve ter pelo menos 3 caracteres.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Por favor, informe seu e-mail.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Informe um e-mail válido (ex: seu@email.com).';
    }

    const phoneDigits = formData.telefone.replace(/\D/g, '');
    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Por favor, informe seu número de telefone/WhatsApp.';
    } else if (phoneDigits.length < 10) {
      newErrors.telefone = 'Informe um telefone com DDD válido (pelo menos 10 dígitos).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await sendLead(formData);
      setSubmittedLead(res.lead);
      setSubmitResultMsg({
        isSupabase: res.storedInSupabase,
        text: res.message
      });
      onLeadAdded(res.lead);
    } catch (err: any) {
      console.error('Erro no envio do formulário:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedLead(null);
    setSubmitResultMsg(null);
    setFormData({ nome: '', email: '', telefone: '' });
    setErrors({});
  };

  return (
    <section className="relative overflow-hidden bg-[#0F172A] text-white pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-white/10">
      
      {/* Mesh Gradient Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Oportunidade de Investimento • Lançamentos & Prédios Inteiros</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Encontre o Prédio Perfeito para{' '}
              <span className="bg-gradient-to-r from-amber-300 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Comprar ou Investir
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Receba o catálogo exclusivo com plantas técnicas, tabela de valores de lançamento e condições especiais de financiamento para edifícios residenciais e comerciais. Seus dados (Nome, E-mail e Telefone) são armazenados em tempo real no banco de dados{' '}
              <strong className="text-indigo-400 font-semibold underline decoration-indigo-500/50">Supabase</strong>.
            </p>

            {/* Key Value Bullets */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>Atendimento direto com a incorporadora</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>Integração e salvamento direto no Supabase</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>Catálogo de prédios com plantas e metragens</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>Suporte a negociação de prédios inteiros</span>
              </div>
            </div>

            {/* Social Proof Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 border-t border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0F172A]" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Usuário 1" referrerPolicy="no-referrer" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0F172A]" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Usuário 2" referrerPolicy="no-referrer" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0F172A]" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Usuário 3" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-semibold text-slate-200">+2.400 leads</span> cadastrados
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>100% Seguro & LGPD Compliant</span>
              </div>
            </div>

          </div>

          {/* Right Column: PRIMEIRA PÁGINA FORMULÁRIO DE CAPTURA - Frosted Glass Card */}
          <div className="lg:col-span-5" id="hero-lead-form">
            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-900/30">
              
              {/* Badge Top Form */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>Receber Tabela do Prédio</span>
                    <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                  </h2>
                  <p className="text-xs text-slate-300 mt-0.5">Preencha Nome, E-mail e Telefone (Salvo no Supabase)</p>
                </div>
                
                {/* Supabase connection indicator pill inside form header */}
                <button
                  type="button"
                  onClick={onOpenSupabaseModal}
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 border backdrop-blur-md ${
                    supabaseConfig.isConnected
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:underline'
                  }`}
                  title="Status de Conexão Supabase"
                >
                  <Database className="w-3 h-3" />
                  <span>{supabaseConfig.isConnected ? 'Supabase On' : 'Demo Mode'}</span>
                </button>
              </div>

              {/* SUCCESS CONFIRMATION STATE */}
              {submittedLead ? (
                <div className="space-y-6 py-4 text-center animate-fadeIn">
                  <div className="w-16 h-16 bg-indigo-500/20 text-indigo-300 rounded-full flex items-center justify-center mx-auto ring-8 ring-indigo-500/10">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Inscrição Confirmada!</h3>
                    <p className="text-sm text-slate-300">
                      Obrigado, <strong className="text-indigo-300">{submittedLead.nome}</strong>! Suas informações foram recebidas com sucesso.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl text-left border border-white/10 text-xs space-y-2 font-mono">
                    <div className="flex justify-between text-slate-400">
                      <span>Nome:</span>
                      <span className="text-slate-100 font-semibold">{submittedLead.nome}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>E-mail:</span>
                      <span className="text-slate-100 font-semibold">{submittedLead.email}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Telefone:</span>
                      <span className="text-slate-100 font-semibold">{submittedLead.telefone}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 border-t border-white/10 pt-2">
                      <span>Armazenado em:</span>
                      <span className={submitResultMsg?.isSupabase ? 'text-indigo-300 font-bold' : 'text-amber-300'}>
                        {submitResultMsg?.isSupabase ? 'Database Supabase ✓' : 'Memória Local / Servidor'}
                      </span>
                    </div>
                  </div>

                  {submitResultMsg && (
                    <p className="text-xs text-slate-400 italic">
                      {submitResultMsg.text}
                    </p>
                  )}

                  <button
                    onClick={resetForm}
                    className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors border border-white/20"
                  >
                    Cadastrar Outra Pessoa
                  </button>
                </div>
              ) : (
                /* ACTUAL FORM FIELDS */
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Field 1: Nome */}
                  <div className="space-y-1.5">
                    <label htmlFor="nome" className="block text-xs font-medium text-slate-300 uppercase tracking-wider ml-1">
                      Nome Completo <span className="text-indigo-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="nome"
                        value={formData.nome}
                        onChange={e => handleChange('nome', e.target.value)}
                        placeholder="Ex: Carlos Silva"
                        className={`w-full pl-10 pr-4 py-3 bg-white/5 border ${
                          errors.nome ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/50'
                        } rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all`}
                      />
                    </div>
                    {errors.nome && <p className="text-xs text-red-400 mt-1">{errors.nome}</p>}
                  </div>

                  {/* Field 2: Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-medium text-slate-300 uppercase tracking-wider ml-1">
                      E-mail Corporativo <span className="text-indigo-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={e => handleChange('email', e.target.value)}
                        placeholder="Ex: carlos@empresa.com"
                        className={`w-full pl-10 pr-4 py-3 bg-white/5 border ${
                          errors.email ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/50'
                        } rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all`}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>

                  {/* Field 3: Telefone */}
                  <div className="space-y-1.5">
                    <label htmlFor="telefone" className="block text-xs font-medium text-slate-300 uppercase tracking-wider ml-1">
                      Telefone / WhatsApp <span className="text-indigo-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        id="telefone"
                        value={formData.telefone}
                        onChange={handlePhoneChange}
                        placeholder="(11) 99999-9999"
                        maxLength={15}
                        className={`w-full pl-10 pr-4 py-3 bg-white/5 border ${
                          errors.telefone ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/50'
                        } rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all`}
                      />
                    </div>
                    {errors.telefone && <p className="text-xs text-red-400 mt-1">{errors.telefone}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-3 py-4 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.99] transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed border border-white/20"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Enviando para o Supabase...</span>
                      </>
                    ) : (
                      <>
                        <span>Solicitar Material & Plantas do Prédio</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="pt-2 flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-slate-400 text-center opacity-80">
                    <Lock className="w-3 h-3 text-indigo-400" />
                    <span>Criptografia de dados ativa • SSL Seguro</span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
