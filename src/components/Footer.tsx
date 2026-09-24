import React from 'react';
import { 
  Phone, 
  Send, 
  Mail, 
  Instagram, 
  MapPin, 
  Clock, 
  Wrench, 
  ShieldCheck, 
  ExternalLink,
  Disc,
  Droplet
} from 'lucide-react';
import { SHOP_CONTACT_INFO } from '../data/mockData';
import { JomanoLogo } from './JomanoLogo';

interface FooterProps {
  onOpenQuickSupport: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenQuickSupport,
  onOpenBooking,
}) => {
  return (
    <footer className="mt-16 border-t-2 border-slate-200 bg-white text-slate-700">
      {/* Upper quick banner */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 px-4 py-8 text-white">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-yellow-300">
              Atendimento no Pátio & WhatsApp
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-white mt-1">
              Precisa de Alinhamento, Balanceamento ou Mecânica?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1 font-medium">
              Venha direto ao nosso auto centro na <strong className="text-yellow-300">{SHOP_CONTACT_INFO.address}</strong> ou agende pelo WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${SHOP_CONTACT_INFO.whatsappRaw}?text=${encodeURIComponent(
                'Olá equipe Jomano! Gostaria de falar sobre alinhamento e serviços no pátio da Av. Vicente de Carvalho, 730.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 px-5 py-3 text-xs font-black text-slate-950 shadow-lg shadow-emerald-950/20 active:scale-95 transition-all"
            >
              <Send className="h-4 w-4" />
              <span>Chamar no WhatsApp ({SHOP_CONTACT_INFO.whatsapp})</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 rounded-2xl bg-yellow-400 hover:bg-yellow-300 px-5 py-3 text-xs font-black text-slate-950 shadow-lg shadow-yellow-500/20 active:scale-95 transition-all"
            >
              <Wrench className="h-4 w-4" />
              <span>Agendar no Pátio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <JomanoLogo size="md" />

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Centro automotivo de referência no Rio de Janeiro. Especialistas em alinhamento de pneus, balanceamento dinâmico em rodas de ferro e liga, troca de óleo, freios, suspensão e retífica de motor na bancada.
            </p>

            <div className="pt-2">
              <span className="rounded-lg bg-blue-50 border border-blue-200 px-2.5 py-1 text-[11px] font-black text-blue-800">
                Localização: {SHOP_CONTACT_INFO.locationShort}
              </span>
            </div>
          </div>

          {/* Col 2: Serviços em Destaque */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
              Serviços & Pneus
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li className="flex items-center justify-between text-slate-900 font-bold">
                <span className="flex items-center gap-1.5">
                  <Disc className="h-3.5 w-3.5 text-blue-600" />
                  Alinhamento e Balanceamento
                </span>
                <span className="text-blue-700 font-black">R$ 100,00</span>
              </li>
              <li className="flex items-center justify-between text-slate-900 font-bold">
                <span className="flex items-center gap-1.5">
                  <Disc className="h-3.5 w-3.5 text-blue-600" />
                  Pneu Piremax
                </span>
                <span className="text-red-600 font-black">R$ 281,08</span>
              </li>
              <li className="flex items-center justify-between text-slate-900 font-bold">
                <span className="flex items-center gap-1.5">
                  <Droplet className="h-3.5 w-3.5 text-amber-600" />
                  Kit Óleo 15w40 + Filtros Lubrax
                </span>
                <span className="text-amber-600 font-black">R$ 252,40</span>
              </li>
              <li className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Wrench className="h-3.5 w-3.5 text-red-600" />
                  Retífica & Motor na Bancada
                </span>
                <span className="text-xs text-blue-700 font-bold">Sob consulta</span>
              </li>
              <li className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Demais Serviços
                </span>
                <span className="text-xs text-emerald-700 font-bold">Consultar</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Unidade & Localização */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
              Pátio & Endereço RJ
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600 font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-bold">{SHOP_CONTACT_INFO.address}</strong>
                  <span>{SHOP_CONTACT_INFO.neighborhood}</span>
                  <span className="block font-bold text-blue-700">Rio de Janeiro - RJ, CEP {SHOP_CONTACT_INFO.cep}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Clock className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-900 font-bold block">Horário de Funcionamento:</span>
                  <span>{SHOP_CONTACT_INFO.workingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Canais de Contato */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
              Contatos Oficiais
            </h4>
            <div className="space-y-2.5 text-xs">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${SHOP_CONTACT_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-whatsapp-btn"
                className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-bold transition-colors"
              >
                <Send className="h-4 w-4 text-emerald-600" />
                <span>WhatsApp: {SHOP_CONTACT_INFO.whatsapp}</span>
              </a>

              {/* Fixo */}
              <a
                href={`tel:${SHOP_CONTACT_INFO.landlineRaw}`}
                id="footer-phone-btn"
                className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-bold transition-colors"
              >
                <Phone className="h-4 w-4 text-blue-600" />
                <span>Fixo: {SHOP_CONTACT_INFO.phoneLandline}</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${SHOP_CONTACT_INFO.email}`}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold transition-colors"
              >
                <Mail className="h-4 w-4 text-slate-400" />
                <span>{SHOP_CONTACT_INFO.email}</span>
              </a>

              {/* Instagram */}
              <a
                href={SHOP_CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-bold transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span>{SHOP_CONTACT_INFO.instagram}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <p className="font-semibold text-slate-700">
              © 2026 Todos os direitos reservados a
            </p>
            <p className="font-black text-slate-900 text-sm">
              Ditectecnologia
            </p>
            <p>
              <a
                href="https://wa.me/5521997835156"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1.5 transition-colors"
              >
                <Send className="h-3.5 w-3.5 text-emerald-600" />
                <span>55-21997835156</span>
              </a>
            </p>
          </div>

          <div className="text-right sm:text-right text-center">
            <p className="font-black text-slate-900">
              {SHOP_CONTACT_INFO.name}
            </p>
            <p className="font-semibold text-slate-600">
              {SHOP_CONTACT_INFO.address} — <span className="text-blue-700 font-bold">{SHOP_CONTACT_INFO.locationShort}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
