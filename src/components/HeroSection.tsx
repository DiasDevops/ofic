import React from 'react';
import { 
  Phone, 
  Send, 
  MapPin, 
  Calendar, 
  Search, 
  ShieldCheck, 
  Wrench, 
  Sparkles,
  Disc,
  Droplet,
  ChevronRight
} from 'lucide-react';
import { SHOP_CONTACT_INFO } from '../data/mockData';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onScrollToTracker: () => void;
  onScrollToEngineBench: () => void;
  onScrollToPromos: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onScrollToTracker,
  onScrollToEngineBench,
  onScrollToPromos,
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-4 sm:p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all max-w-full">
      {/* Top vivid motorsport racing gradient strip */}
      <div className="h-2.5 -mx-4 -mt-4 sm:-mx-8 sm:-mt-8 lg:-mx-12 lg:-mt-12 mb-5 sm:mb-8 bg-gradient-to-r from-red-600 via-yellow-400 via-blue-600 to-emerald-500" />

      {/* Background soft energetic automotive radial gradient */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-red-100/60 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5 sm:space-y-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-red-700 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
            <span>Centro Automotivo & Auto Serviço</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-blue-700 max-w-full truncate">
            <MapPin className="h-3.5 w-3.5 text-blue-600 shrink-0" />
            <span className="truncate">{SHOP_CONTACT_INFO.address} • {SHOP_CONTACT_INFO.locationShort}</span>
          </div>
        </div>

        {/* Big Bright Title */}
        <h1 className="font-heading text-2xl sm:text-4xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
          Jomano Centro Automotivo & Auto Serviço
        </h1>

        {/* Subtitle with key specialties */}
        <div className="inline-block rounded-xl bg-slate-100 px-3 py-1.5 sm:px-4 sm:py-2 border border-slate-200 max-w-full">
          <p className="font-heading text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-normal sm:tracking-widest text-slate-800 break-words">
            SUSPENSÃO • FREIO • MECÂNICA • BALANCEAMENTO • ALINHAMENTO • RETÍFICA
          </p>
        </div>

        <p className="text-sm sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
          O melhor atendimento na <strong className="text-slate-900 font-bold">Av. Vicente de Carvalho, 730</strong> (RJ 21210-000). Agendamento com acompanhamento em tempo real: <strong className="text-blue-700 font-bold">Alinhamento e Balanceamentos em rodas de ferro por R$ 140,00</strong>, <strong className="text-red-600 font-bold">Pneu Piremax aro 15 por R$ 280 a unidade</strong>, e <strong className="text-amber-600 font-bold">Troca de Óleo (04 litros) + filtro de óleo por R$ 255,00</strong> (demais preços consultar: 21-964122372 / loja 33811320).
        </p>

        {/* Contact Chips with WhatsApp & Rio Phones */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={`https://wa.me/${SHOP_CONTACT_INFO.whatsappRaw}?text=${encodeURIComponent(
              'Olá Jomano Auto Serviço! Gostaria de agendar um atendimento na Av. Vicente de Carvalho, 730.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-whatsapp-btn"
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs sm:text-sm font-black text-white shadow-md shadow-emerald-700/20 hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all"
          >
            <Send className="h-4 w-4" />
            <span>WhatsApp: {SHOP_CONTACT_INFO.whatsapp}</span>
          </a>

          <a
            href={`tel:${SHOP_CONTACT_INFO.landlineRaw}`}
            id="hero-landline-btn"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-blue-600 bg-white px-4 py-2 text-xs sm:text-sm font-black text-blue-700 hover:bg-blue-50 transition-all"
          >
            <Phone className="h-4 w-4 text-blue-600" />
            <span>Loja: {SHOP_CONTACT_INFO.phoneLandline}</span>
          </a>

          <a
            href="https://maps.google.com/?q=Avenida+Vicente+de+Carvalho,+730,+Rio+de+Janeiro"
            target="_blank"
            rel="noopener noreferrer"
            id="hero-maps-btn"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-white transition-all"
          >
            <MapPin className="h-4 w-4 text-red-600" />
            <span>Av. Vicente de Carvalho, 730 (RJ 21210-000)</span>
          </a>
        </div>

        {/* Call to Actions (Vivid buttons) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            id="hero-btn-book"
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-400 hover:bg-yellow-300 px-8 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-yellow-500/30 active:scale-95 transition-all hover:scale-105"
          >
            <Calendar className="h-4 w-4" />
            <span>Agendar Horário no Pátio</span>
          </button>

          <button
            id="hero-btn-tracker"
            onClick={onScrollToTracker}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Search className="h-4 w-4 text-yellow-300" />
            <span>Acompanhar Veículo ao Vivo</span>
          </button>

          <button
            id="hero-btn-promos"
            onClick={onScrollToPromos}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-red-600 bg-white px-5 py-3.5 text-sm font-black text-red-600 hover:bg-red-50 active:scale-95 transition-all"
          >
            <Disc className="h-4 w-4 text-red-600" />
            <span>Ver Ofertas da Fachada</span>
          </button>
        </div>

        {/* Quick Highlights Bar with Vivid Daylight Styling */}
        <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border-2 border-blue-200 hover:border-blue-500 shadow-xs hover:shadow-md transition-all">
            <span className="font-heading text-xl font-black text-blue-700 block">R$ 140,00</span>
            <span className="text-[11px] font-bold text-slate-700">Alinhamento e Balanceamentos (Roda Ferro)</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-red-50/70 border-2 border-red-200 hover:border-red-500 shadow-xs hover:shadow-md transition-all">
            <span className="font-heading text-xl font-black text-red-600 block">R$ 280,00</span>
            <span className="text-[11px] font-bold text-slate-700">Pneu Piremax Aro 15 (Unidade)</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border-2 border-amber-200 hover:border-amber-500 shadow-xs hover:shadow-md transition-all">
            <span className="font-heading text-xl font-black text-amber-700 block">R$ 255,00</span>
            <span className="text-[11px] font-bold text-slate-700">Troca de Óleo (04L) + Filtro</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all">
            <span className="text-[10px] font-extrabold text-emerald-800 uppercase block">Demais Preços Consultar:</span>
            <span className="font-heading text-xs sm:text-sm font-black text-emerald-950 block">21-964122372</span>
            <span className="text-[10px] font-bold text-emerald-800 block">Loja: 33811320</span>
          </div>
        </div>
      </div>
    </section>
  );
};
