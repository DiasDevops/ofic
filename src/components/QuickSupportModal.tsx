import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  Instagram, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  Send, 
  Truck, 
  ShieldAlert,
  Headphones
} from 'lucide-react';
import { SHOP_CONTACT_INFO } from '../data/mockData';
import { VehicleOrder } from '../types';

interface QuickSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeVehicle?: VehicleOrder | null;
}

export const QuickSupportModal: React.FC<QuickSupportModalProps> = ({
  isOpen,
  onClose,
  activeVehicle,
}) => {
  const [fastMessage, setFastMessage] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  if (!isOpen) return null;

  const defaultWhatsappMessage = activeVehicle
    ? `Olá equipe da Jomano Oficina! Gostaria de suporte imediato sobre o meu veículo ${activeVehicle.vehicleModel} (Placa ${activeVehicle.plate}, Ordem de Serviço ${activeVehicle.id}).`
    : `Olá equipe da Jomano Oficina! Preciso de suporte rápido sobre meu veículo.`;

  const handleSendFastTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone) {
      alert('Por favor, digite seu número de telefone ou WhatsApp.');
      return;
    }
    setTicketSent(true);
    setTimeout(() => {
      setTicketSent(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-rose-500/40 bg-slate-900 p-6 sm:p-8 shadow-2xl ring-1 ring-rose-500/20">
        {/* Decorative badge */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-lg shadow-rose-950">
              <Headphones className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg font-bold text-white">
                  Suporte Imediato Jomano
                </span>
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-slate-400">Atendimento prioritário direto com os mecânicos de plantão</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-800 bg-slate-800/80 p-2 text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {ticketSent ? (
          <div className="py-8 text-center space-y-3 animate-in zoom-in-95">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-bold text-white">Chamado Prioritário Recebido!</h4>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Nosso consultor técnico entrará em contato via WhatsApp/Ligação no número informado em menos de 5 minutos.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            {/* Active context if an order is being inspected */}
            {activeVehicle && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Veículo em Acompanhamento:</span>
                  <span>{activeVehicle.vehicleModel} ({activeVehicle.plate}) • {activeVehicle.id}</span>
                </div>
                <span className="text-[10px] rounded bg-amber-500/20 px-2 py-1 font-mono font-bold text-amber-300">
                  {activeVehicle.currentStage.toUpperCase()}
                </span>
              </div>
            )}

            {/* Quick 1-click Contact Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* WhatsApp direct */}
              <a
                href={`https://wa.me/${SHOP_CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(defaultWhatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-support-whatsapp"
                className="flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-3.5 hover:bg-emerald-900/50 hover:border-emerald-400 transition-all text-left group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 font-bold group-hover:scale-105 transition-transform">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">WhatsApp Direto</span>
                  <span className="text-[11px] text-emerald-400">{SHOP_CONTACT_INFO.phone}</span>
                </div>
              </a>

              {/* Direct Call */}
              <a
                href={`tel:${SHOP_CONTACT_INFO.phoneRaw}`}
                id="btn-support-call"
                className="flex items-center gap-3 rounded-2xl border border-amber-500/40 bg-amber-950/40 p-3.5 hover:bg-amber-900/50 hover:border-amber-400 transition-all text-left group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-bold group-hover:scale-105 transition-transform">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Ligar na Oficina</span>
                  <span className="text-[11px] text-amber-300">{SHOP_CONTACT_INFO.phoneLandline}</span>
                </div>
              </a>
            </div>

            {/* Secondary Contacts (Email & Instagram) */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <a
                href={`mailto:${SHOP_CONTACT_INFO.email}`}
                id="btn-support-email"
                className="flex items-center gap-2 p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              >
                <Mail className="h-4 w-4 text-sky-400 shrink-0" />
                <span className="truncate">{SHOP_CONTACT_INFO.email}</span>
              </a>

              <a
                href={SHOP_CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-support-instagram"
                className="flex items-center gap-2 p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-pink-300 hover:text-pink-200 hover:border-pink-500/40 transition-colors"
              >
                <Instagram className="h-4 w-4 text-pink-400 shrink-0" />
                <span className="truncate">{SHOP_CONTACT_INFO.instagram}</span>
              </a>
            </div>

            {/* Quick Callback Form */}
            <form onSubmit={handleSendFastTicket} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  Solicitar Ligação de Retorno Urgente
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">Em ~5 min</span>
              </div>

              <input
                type="tel"
                id="support-phone-input"
                placeholder="Seu telefone ou WhatsApp com DDD"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs text-white placeholder:text-slate-500 focus:border-rose-500 focus:outline-none"
              />

              <input
                type="text"
                id="support-message-input"
                placeholder="Motivo (ex: barulho estranho no motor, pane elétrica, dúvida na OS)"
                value={fastMessage}
                onChange={(e) => setFastMessage(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs text-white placeholder:text-slate-500 focus:border-rose-500 focus:outline-none"
              />

              <button
                type="submit"
                id="btn-send-fast-ticket"
                className="w-full rounded-xl bg-gradient-to-r from-rose-600 to-red-600 py-2.5 text-xs font-bold text-white shadow-md shadow-rose-950 hover:from-rose-500 hover:to-red-500 transition-all active:scale-95"
              >
                Solicitar Contato Agora
              </button>
            </form>

            {/* Emergency Tow Service */}
            <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/40 p-3 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-amber-400" />
                <span>Veículo sem partida? Guincho parceiro 24h</span>
              </div>
              <a
                href={`tel:${SHOP_CONTACT_INFO.phoneRaw}`}
                className="font-bold text-amber-400 hover:underline"
              >
                Pedir Guincho
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Floating Quick Support Trigger Button
export const FloatingSupportButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        id="floating-support-btn"
        onClick={onClick}
        title="Falar Imediatamente com a Equipe da Oficina"
        className="group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 px-4 py-3.5 text-sm font-bold text-white shadow-2xl shadow-rose-950/80 ring-2 ring-rose-400/40 hover:scale-105 active:scale-95 transition-all"
      >
        {/* Pulse beacon */}
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-white"></span>
        </span>
        <MessageSquare className="h-5 w-5" />
        <span className="hidden sm:inline">Suporte Imediato</span>
      </button>
    </div>
  );
};
