import React from 'react';
import { 
  Phone, 
  Mail, 
  Instagram, 
  Calendar, 
  Search, 
  ShieldCheck, 
  Gauge, 
  Wrench, 
  CheckCircle, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SHOP_CONTACT_INFO } from '../data/mockData';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onScrollToTracker: () => void;
  onScrollToEngineBench: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onScrollToTracker,
  onScrollToEngineBench,
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-6 sm:p-12 shadow-2xl">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-rose-600/10 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Differential Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-amber-400 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Oficina Mecânica & Centro Tecnológico Automotivo</span>
        </div>

        {/* Title */}
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          Jomano Oficina e Auto Center
        </h1>

        <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Agende serviços automotivos com <strong className="text-white">acompanhamento em tempo real</strong> do progresso do veículo, <strong className="text-amber-400">notificações automáticas</strong> a cada etapa e nosso diferencial exclusivo de <strong className="text-white">motor desmontado na bancada</strong> de alta precisão.
        </p>

        {/* Direct Contacts Bar in Hero (Phone, Email, Instagram) */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <a
            href={`tel:${SHOP_CONTACT_INFO.phoneRaw}`}
            id="hero-phone-btn"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2 text-xs font-semibold text-white hover:border-amber-500 hover:text-amber-400 transition-all shadow-sm"
          >
            <Phone className="h-3.5 w-3.5 text-amber-500" />
            <span>{SHOP_CONTACT_INFO.phone}</span>
          </a>

          <a
            href={`mailto:${SHOP_CONTACT_INFO.email}`}
            id="hero-email-btn"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2 text-xs font-semibold text-white hover:border-sky-500 hover:text-sky-300 transition-all shadow-sm"
          >
            <Mail className="h-3.5 w-3.5 text-sky-400" />
            <span>{SHOP_CONTACT_INFO.email}</span>
          </a>

          <a
            href={SHOP_CONTACT_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-instagram-btn"
            className="inline-flex items-center gap-2 rounded-xl border border-pink-500/30 bg-pink-950/20 px-4 py-2 text-xs font-semibold text-pink-300 hover:bg-pink-950/40 hover:text-pink-200 transition-all shadow-sm"
          >
            <Instagram className="h-3.5 w-3.5 text-pink-400" />
            <span>{SHOP_CONTACT_INFO.instagram}</span>
          </a>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            id="hero-btn-book"
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-amber-500/20 hover:bg-amber-400 active:scale-95 transition-all"
          >
            <Calendar className="h-4 w-4" />
            <span>Agendar Horário Online</span>
          </button>

          <button
            id="hero-btn-tracker"
            onClick={onScrollToTracker}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3.5 text-sm font-bold text-white hover:bg-slate-700 hover:border-amber-500/50 active:scale-95 transition-all"
          >
            <Search className="h-4 w-4 text-amber-400" />
            <span>Acompanhar Progresso em Tempo Real</span>
          </button>

          <button
            id="hero-btn-engine"
            onClick={onScrollToEngineBench}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-5 py-3.5 text-sm font-bold text-amber-300 hover:bg-amber-500/20 active:scale-95 transition-all"
          >
            <Wrench className="h-4 w-4" />
            <span>Ver Motor na Bancada</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <span className="font-heading text-lg sm:text-xl font-bold text-white block">100% Ao Vivo</span>
            <span className="text-[11px] text-slate-400">Progresso por etapas e fotos</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <span className="font-heading text-lg sm:text-xl font-bold text-amber-400 block">1 Ano</span>
            <span className="text-[11px] text-slate-400">Garantia em motor na bancada</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <span className="font-heading text-lg sm:text-xl font-bold text-emerald-400 block">Certificado</span>
            <span className="text-[11px] text-slate-400">Peças originais homologadas</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <span className="font-heading text-lg sm:text-xl font-bold text-rose-400 block">Suporte Imediato</span>
            <span className="text-[11px] text-slate-400">Contato direto com mecânicos</span>
          </div>
        </div>
      </div>
    </section>
  );
};
