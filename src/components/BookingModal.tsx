import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Wrench, 
  Car, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { DIVERSIFIED_SERVICES, SHOP_CONTACT_INFO } from '../data/mockData';
import { BookingFormState, VehicleOrder } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
  onBookingConfirmed: (newOrder: VehicleOrder) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
  onBookingConfirmed,
}) => {
  const [formData, setFormData] = useState<BookingFormState>({
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    vehicleBrand: 'Toyota',
    vehicleModel: '',
    vehiclePlate: '',
    vehicleYear: '2022',
    serviceId: preSelectedServiceId || DIVERSIFIED_SERVICES[0].id,
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredTime: '09:00',
    notes: '',
  });

  const [confirmedOrder, setConfirmedOrder] = useState<VehicleOrder | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ownerName || !formData.vehicleModel || !formData.vehiclePlate) {
      alert('Por favor, preencha o seu nome, modelo do veículo e placa.');
      return;
    }

    const selectedService = DIVERSIFIED_SERVICES.find((s) => s.id === formData.serviceId) || DIVERSIFIED_SERVICES[0];
    const generatedOsNumber = `OS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newVehicleOrder: VehicleOrder = {
      id: generatedOsNumber,
      plate: formData.vehiclePlate.toUpperCase().trim(),
      vehicleModel: `${formData.vehicleBrand} ${formData.vehicleModel}`,
      vehicleBrand: formData.vehicleBrand,
      year: parseInt(formData.vehicleYear) || 2022,
      color: 'Personalizado',
      imageUrl: selectedService.vehiclePhoto,
      ownerName: formData.ownerName,
      ownerPhone: formData.ownerPhone || SHOP_CONTACT_INFO.phone,
      entryDate: `${formData.preferredDate} às ${formData.preferredTime}`,
      estimatedCompletion: 'Previsão no Check-in',
      serviceRequested: selectedService.title,
      currentStage: 'checkin',
      stageProgressPercent: 10,
      mechanicInCharge: {
        name: 'Mestre Jomano Silva',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        specialty: 'Chefe de Oficina & Especialista em Motores',
      },
      liveNotes: [
        `Agendamento confirmado via aplicativo para ${formData.preferredDate} às ${formData.preferredTime}.`,
        'Box reservado e equipe técnica notificada.',
      ],
      partsList: [],
      totalEstimate: selectedService.startingPrice,
      isEngineTeardownJob: selectedService.category === 'motor',
    };

    setConfirmedOrder(newVehicleOrder);
    onBookingConfirmed(newVehicleOrder);
  };

  const handleResetAndClose = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 rounded-xl border border-slate-800 bg-slate-800/80 p-2 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {confirmedOrder ? (
          /* Confirmation Success State */
          <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-8 ring-emerald-500/10">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <h3 className="font-heading text-2xl font-bold text-white">
              Agendamento Confirmado com Sucesso!
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Sua Ordem de Serviço foi gerada. Seu veículo já foi inserido no sistema de rastreamento em tempo real da Jomano.
            </p>

            <div className="my-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Número da OS:</span>
                <span className="font-mono font-bold text-amber-400">{confirmedOrder.id}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Veículo & Placa:</span>
                <span className="font-bold text-white">{confirmedOrder.vehicleModel} ({confirmedOrder.plate})</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Data e Hora:</span>
                <span className="font-semibold text-slate-200">{confirmedOrder.entryDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Serviço:</span>
                <span className="font-semibold text-emerald-400">{confirmedOrder.serviceRequested}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/${SHOP_CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(
                  `Olá Jomano Oficina! Confirmei meu agendamento da OS ${confirmedOrder.id} para meu veículo ${confirmedOrder.vehicleModel} (${confirmedOrder.plate}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-950"
              >
                <Send className="h-4 w-4" />
                <span>Enviar Confirmação no WhatsApp</span>
              </a>

              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto rounded-xl bg-amber-500 px-6 py-3 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-all"
              >
                Acompanhar na Linha do Tempo
              </button>
            </div>
          </div>
        ) : (
          /* Main Booking Form */
          <div>
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {SHOP_CONTACT_INFO.name}
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mt-1">
                Agendamento de Horário & Reserva de Box
              </h3>
              <p className="text-xs text-slate-400">
                Escolha o serviço desejado, informe os dados do veículo e garanta atendimento prioritário.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  1. Selecione o Serviço Principal
                </label>
                <select
                  id="booking-service-select"
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                >
                  {DIVERSIFIED_SERVICES.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.title} — A partir de R$ {srv.startingPrice.toFixed(2)} ({srv.warranty})
                    </option>
                  ))}
                </select>
              </div>

              {/* Vehicle Details */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  2. Dados do Veículo
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <input
                      type="text"
                      id="vehicle-brand-input"
                      placeholder="Marca (ex: Toyota, BMW)"
                      value={formData.vehicleBrand}
                      onChange={(e) => setFormData({ ...formData, vehicleBrand: e.target.value })}
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="vehicle-model-input"
                      placeholder="Modelo (ex: Corolla, Hilux)"
                      value={formData.vehicleModel}
                      onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="vehicle-plate-input"
                      placeholder="Placa (ex: BRA2E19)"
                      value={formData.vehiclePlate}
                      onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value.toUpperCase() })}
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-white font-mono uppercase placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Date and Time slot */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  3. Data & Horário Preferencial
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="date"
                      id="preferred-date-input"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-3 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <select
                      id="preferred-time-select"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-3 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="08:00">08:00 (Abertura)</option>
                      <option value="09:00">09:00</option>
                      <option value="10:30">10:30</option>
                      <option value="13:30">13:30</option>
                      <option value="15:00">15:00</option>
                      <option value="16:30">16:30</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Customer Contact */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  4. Contato do Proprietário
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    id="owner-name-input"
                    placeholder="Seu Nome Completo"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                  />
                  <input
                    type="tel"
                    id="owner-phone-input"
                    placeholder="WhatsApp / Telefone"
                    value={formData.ownerPhone}
                    onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    id="owner-email-input"
                    placeholder="E-mail"
                    value={formData.ownerEmail}
                    onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Observations */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Observações ou Sintomas Notados no Veículo (Opcional)
                </label>
                <textarea
                  id="booking-notes-input"
                  placeholder="Ex: Barulho na dianteira ao passar em lombadas, luz da injeção acesa..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Sem taxa de cancelamento
                </span>

                <button
                  type="submit"
                  id="btn-submit-booking"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all hover:scale-105"
                >
                  <span>Confirmar Agendamento</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
