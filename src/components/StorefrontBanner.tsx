import React from 'react';
import { 
  MapPin, 
  Phone, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Tag, 
  ShieldCheck, 
  ArrowRight,
  Disc,
  Droplet
} from 'lucide-react';
import { SHOP_CONTACT_INFO, STOREFRONT_PROMOS } from '../data/mockData';
import { JomanoLogo } from './JomanoLogo';

interface StorefrontBannerProps {
  onScheduleService: (serviceName?: string) => void;
}

export const StorefrontBanner: React.FC<StorefrontBannerProps> = ({
  onScheduleService,
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-blue-600/30 bg-white shadow-xl">
      {/* Top Facade Style Strip */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 px-4 py-2.5 text-white">
        <div className="mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-extrabold tracking-wider uppercase">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 animate-ping" />
            <span className="text-yellow-300">Pátio Oficial Jomano</span>
            <span className="text-blue-200">|</span>
            <span className="tracking-widest">
              SUSPENSÃO • FREIO • MECÂNICA • BALANCEAMENTO • ALINHAMENTO
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-yellow-300 font-black">
              <MapPin className="h-3.5 w-3.5" />
              {SHOP_CONTACT_INFO.address} — {SHOP_CONTACT_INFO.locationShort}
            </span>
          </div>
        </div>
      </div>

      {/* Main Facade Presentation Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-50 via-white to-blue-50/40">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <JomanoLogo size="lg" />
            <p className="text-sm font-semibold text-slate-600 max-w-2xl">
              Ofertas e serviços oficiais do pátio na <strong className="text-slate-900">{SHOP_CONTACT_INFO.address}</strong>, Vicente de Carvalho / Vila da Penha — Rio de Janeiro (<strong className="text-blue-700">CEP {SHOP_CONTACT_INFO.cep}</strong>).
            </p>
          </div>

          {/* Quick Contact Chips directly from facade */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${SHOP_CONTACT_INFO.whatsappRaw}?text=${encodeURIComponent(
                'Olá Jomano Auto Serviço! Gostaria de informações e agendar um serviço na Av. Vicente de Carvalho, 730.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              id="banner-whatsapp-btn"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs sm:text-sm font-black text-white shadow-md shadow-emerald-700/20 hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all"
            >
              <Send className="h-4 w-4" />
              <span>WhatsApp: {SHOP_CONTACT_INFO.whatsapp}</span>
            </a>

            <a
              href={`tel:${SHOP_CONTACT_INFO.landlineRaw}`}
              id="banner-phone-btn"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-blue-600 bg-white px-4 py-2 text-xs sm:text-sm font-black text-blue-700 shadow-sm hover:bg-blue-50 transition-all"
            >
              <Phone className="h-4 w-4 text-blue-600" />
              <span>Fixo: {SHOP_CONTACT_INFO.phoneLandline}</span>
            </a>
          </div>
        </div>

        {/* 4 Official Facade Promo Cards (from photo) */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-red-600" />
              <h3 className="font-heading text-lg font-black uppercase tracking-tight text-slate-900">
                Promoções em Destaque no Pátio Jomano
              </h3>
            </div>
            <span className="text-xs font-bold text-blue-700">Valores com desconto à vista</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {STOREFRONT_PROMOS.map((promo, idx) => {
              const borderStyles = 
                promo.category === 'alinhamento'
                  ? 'border-blue-400 hover:border-blue-600 shadow-blue-500/10'
                  : promo.category === 'oleo'
                  ? 'border-amber-400 hover:border-amber-600 shadow-amber-500/10'
                  : promo.category === 'pneus'
                  ? 'border-red-400 hover:border-red-600 shadow-red-500/10'
                  : 'border-emerald-400 hover:border-emerald-600 shadow-emerald-500/10';

              const stripColor =
                promo.category === 'alinhamento'
                  ? 'bg-blue-600'
                  : promo.category === 'oleo'
                  ? 'bg-amber-500'
                  : promo.category === 'pneus'
                  ? 'bg-red-600'
                  : 'bg-emerald-600';

              return (
                <div
                  key={idx}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border-3 ${borderStyles} bg-white p-5 shadow-lg hover:shadow-2xl transition-all duration-300`}
                >
                  <div className={`h-1.5 -mx-5 -mt-5 mb-4 ${stripColor}`} />

                  {/* Promo Badge */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-red-700 border border-red-200">
                      {promo.badge}
                    </span>
                    {promo.category === 'alinhamento' && (
                      <span className="text-[11px] font-bold text-blue-700 flex items-center gap-1">
                        <Disc className="h-3 w-3" /> Roda Ferro
                      </span>
                    )}
                    {promo.category === 'oleo' && (
                      <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1">
                        <Droplet className="h-3 w-3" /> Super Troca
                      </span>
                    )}
                  </div>

                <div className="my-3 space-y-1.5">
                  <h4 className="font-heading text-base font-black text-slate-900 group-hover:text-red-600 transition-colors">
                    {promo.title}
                  </h4>
                  <p className="text-xs font-bold text-slate-700">
                    {promo.subtitle}
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                    {promo.details}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-end justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">
                      {promo.priceHighlight.includes('R$') ? 'Valor Especial' : 'Condição'}
                    </span>
                    <span
                      className={`font-heading font-black leading-snug block ${
                        promo.priceHighlight.includes('R$')
                          ? 'text-xl text-red-600'
                          : 'text-xs text-blue-700 max-w-[140px]'
                      }`}
                    >
                      {promo.priceHighlight}
                    </span>
                  </div>

                  <button
                    onClick={() => onScheduleService(promo.title)}
                    className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition-all group-hover:scale-105 shrink-0"
                  >
                    <span>Agendar</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
};
