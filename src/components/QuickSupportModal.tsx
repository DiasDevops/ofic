import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Phone, 
  Clock, 
  MapPin, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight,
  Headphones,
  Sparkles
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
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [urgencyReason, setUrgencyReason] = useState('Dúvida sobre manutenção em andamento');
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim()) {
      setPhoneError('Por favor, digite seu telefone com DDD.');
      return;
    }
    setPhoneError(null);
    setCallbackRequested(true);
  };

  const whatsappMessage = activeVehicle
    ? `Olá equipe Jomano Auto Serviço! Estou acompanhando meu veículo ${activeVehicle.vehicleModel} (Placa ${activeVehicle.plate}, OS ${activeVehicle.id}) e preciso de suporte com a equipe da Av. Vicente de Carvalho, 730.`
    : `Olá equipe Jomano Auto Serviço! Gostaria de tirar dúvidas sobre serviços na unidade Av. Vicente de Carvalho, 730.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-xl border border-slate-200 bg-slate-100 p-2 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Heading */}
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-black text-emerald-700 uppercase tracking-wider">
              Plantão Técnico Oficina Aberta
            </span>
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Suporte Rápido & Contato Imediato
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Atendimento direto com os chefes de oficina na <strong className="text-slate-800">{SHOP_CONTACT_INFO.address}</strong> (RJ 21210-000).
          </p>
        </div>

        {/* Context Vehicle Info Pill */}
        {activeVehicle && (
          <div className="mt-4 rounded-2xl border-2 border-blue-200 bg-blue-50/70 p-3.5 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] font-bold text-blue-700 block uppercase">
                Veículo Vinculado ao Chamado
              </span>
              <span className="font-black text-slate-900">
                {activeVehicle.vehicleModel} ({activeVehicle.plate})
              </span>
            </div>
            <span className="font-mono text-xs font-black text-blue-800 bg-white px-2.5 py-1 rounded-lg border border-blue-200 shadow-xs">
              {activeVehicle.id}
            </span>
          </div>
        )}

        {/* Immediate Channels Grid */}
        <div className="mt-5 space-y-3">
          {/* WhatsApp Direct 1-Click */}
          <a
            href={`https://wa.me/${SHOP_CONTACT_INFO.whatsappRaw}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            id="modal-whatsapp-direct"
            className="group flex items-center justify-between p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/50 hover:bg-emerald-100 transition-all shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
                <Send className="h-5 w-5" />
              </div>
              <div>
                <span className="font-heading text-sm sm:text-base font-black text-emerald-950 block">
                  WhatsApp da Oficina Jomano
                </span>
                <span className="text-xs font-bold text-emerald-800">
                  {SHOP_CONTACT_INFO.whatsapp} • Resposta média: ~2 min
                </span>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-emerald-700 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Direct Landline Phone Call */}
          <a
            href={`tel:${SHOP_CONTACT_INFO.landlineRaw}`}
            id="modal-phone-direct"
            className="group flex items-center justify-between p-4 rounded-2xl border-2 border-blue-200 bg-blue-50/50 hover:bg-blue-100 transition-all shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <span className="font-heading text-sm sm:text-base font-black text-blue-950 block">
                  Ligar no Telefone Fixo
                </span>
                <span className="text-xs font-bold text-blue-800">
                  {SHOP_CONTACT_INFO.phoneLandline} • Recepção & Balcão
                </span>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-blue-700 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Request Immediate Callback Form */}
        <div className="mt-6 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 sm:p-5">
          {callbackRequested ? (
            <div className="text-center py-4 space-y-2">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
              <h4 className="font-black text-slate-900 text-sm">
                Solicitação de Retorno Recebida!
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                Nossa equipe ligará para você no número informado em até 10 minutos.
              </p>
            </div>
          ) : (
            <form onSubmit={handleCallbackSubmit} className="space-y-3">
              {phoneError && (
                <div className="rounded-xl border border-red-300 bg-red-50 p-2 text-xs font-bold text-red-700">
                  {phoneError}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-slate-700" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Deseja que a Oficina Ligue para Você?
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="Seu Nome"
                  value={callbackName}
                  onChange={(e) => setCallbackName(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-white p-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="DDD + Telefone (ex: 21 96412-2372)"
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  required
                  className="rounded-xl border border-slate-300 bg-white p-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <select
                value={urgencyReason}
                onChange={(e) => setUrgencyReason(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs font-bold text-slate-800 focus:border-blue-600 focus:outline-none"
              >
                <option value="Dúvida sobre alinhamento e balanceamento">Dúvida sobre alinhamento e balanceamento</option>
                <option value="Dúvida sobre manutenção em andamento">Dúvida sobre manutenção em andamento</option>
                <option value="Aprovação urgente de orçamento">Aprovação urgente de orçamento</option>
                <option value="Orçamento de retífica de motor na bancada">Orçamento de retífica de motor na bancada</option>
                <option value="Super Troca de Óleo ou Pneus">Super Troca de Óleo ou Pneus</option>
              </select>

              <button
                type="submit"
                id="btn-request-callback-submit"
                className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 p-2.5 text-xs font-black text-white transition-all shadow-xs"
              >
                Solicitar Ligação Imediata
              </button>
            </form>
          )}
        </div>

        {/* Footer info note */}
        <div className="mt-5 border-t border-slate-200 pt-3 flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-medium">
          <span className="flex items-center gap-1 text-slate-700 font-bold">
            <MapPin className="h-3.5 w-3.5 text-red-600" />
            {SHOP_CONTACT_INFO.address} ({SHOP_CONTACT_INFO.locationShort})
          </span>
          <span className="text-slate-500">{SHOP_CONTACT_INFO.workingHours}</span>
        </div>
      </div>
    </div>
  );
};

export const FloatingSupportButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      id="floating-support-btn"
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full bg-red-600 p-3.5 sm:px-5 sm:py-3.5 text-white shadow-2xl shadow-red-600/40 hover:bg-red-700 hover:scale-110 active:scale-95 transition-all ring-4 ring-white"
      title="Suporte Rápido Imediato com a Equipe Jomano"
    >
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-300 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-yellow-400" />
      </span>
      <Headphones className="h-5 w-5" />
      <span className="hidden sm:inline text-xs font-black tracking-wide uppercase">
        Suporte Rápido: 21-964122372 / Loja: 33811320
      </span>
    </button>
  );
};
