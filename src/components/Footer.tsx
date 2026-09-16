import React from 'react';
import { 
  Wrench, 
  Phone, 
  Mail, 
  Instagram, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { SHOP_CONTACT_INFO } from '../data/mockData';

interface FooterProps {
  onOpenQuickSupport: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenQuickSupport,
  onOpenBooking,
}) => {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-bold">
                <Wrench className="h-5 w-5" />
              </div>
              <span className="font-heading text-lg font-bold text-white tracking-tight">
                JOMANO
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Jomano Oficina e Auto Center — Referência em retífica de motores na bancada, diagnóstico computadorizado e manutenção veicular com acompanhamento 100% digital.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <button
                id="footer-support-btn"
                onClick={onOpenQuickSupport}
                className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-500 transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Suporte Imediato</span>
              </button>
              <button
                id="footer-booking-btn"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors"
              >
                <span>Agendar Horário</span>
              </button>
            </div>
          </div>

          {/* Contacts - Phone, Mail, Instagram strictly requested */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Canais de Contato Oficial
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`tel:${SHOP_CONTACT_INFO.phoneRaw}`}
                  className="flex items-center gap-2 hover:text-amber-400 transition-colors"
                >
                  <Phone className="h-4 w-4 text-amber-500 shrink-0" />
                  <div>
                    <span className="block text-white font-medium">{SHOP_CONTACT_INFO.phone}</span>
                    <span className="text-[10px] text-slate-500">WhatsApp & Ligação Rápida</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SHOP_CONTACT_INFO.phoneRaw}`}
                  className="flex items-center gap-2 hover:text-amber-400 transition-colors"
                >
                  <Phone className="h-4 w-4 text-slate-500 shrink-0" />
                  <div>
                    <span className="block text-slate-300">{SHOP_CONTACT_INFO.phoneLandline}</span>
                    <span className="text-[10px] text-slate-500">Fixo Central</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SHOP_CONTACT_INFO.email}`}
                  className="flex items-center gap-2 hover:text-sky-400 transition-colors"
                >
                  <Mail className="h-4 w-4 text-sky-400 shrink-0" />
                  <span className="truncate">{SHOP_CONTACT_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={SHOP_CONTACT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <Instagram className="h-4 w-4 shrink-0" />
                  <span className="font-semibold">{SHOP_CONTACT_INFO.instagram}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Localização & Horários
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{SHOP_CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{SHOP_CONTACT_INFO.workingHours}</span>
              </div>
            </div>
            <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 text-[11px]">
              <span className="text-amber-400 font-bold block mb-0.5">Estacionamento para Clientes</span>
              <span>Área de recepção com lounge climatizado, café espresso e Wi-Fi de alta velocidade.</span>
            </div>
          </div>

          {/* Diferencial em destaque */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-400" />
              Diferencial em Destaque
            </h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              <strong className="text-white">Motor desmontado na bancada:</strong> retífica própria com ensaios não-destrutivos, banho químico e aferição em bancada metrológica certificada.
            </p>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400" />
              <div>
                <span className="font-bold block text-xs">Garantia Registrada</span>
                <span className="text-[10px] text-emerald-400/80">Certificado digital com QR Code</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Jomano Oficina e Auto Center. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Privacidade & Termos</span>
            <span>•</span>
            <span className="text-slate-400">Desenvolvido com padrão de alta engenharia automotiva</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
