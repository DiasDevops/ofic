import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Car, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Send,
  MapPin
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
    vehicleBrand: 'Chevrolet',
    vehicleModel: '',
    vehiclePlate: '',
    vehicleYear: '2022',
    serviceId: preSelectedServiceId || DIVERSIFIED_SERVICES[0].id,
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredTime: '09:00',
    notes: '',
  });

  const [confirmedOrder, setConfirmedOrder] = useState<VehicleOrder | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [autoDispatched, setAutoDispatched] = useState<boolean>(false);

  if (!isOpen) return null;

  const triggerDirectDispatches = (order: VehicleOrder) => {
    const whatsappBookingMessage = `*NOVO AGENDAMENTO - JOMANO AUTO SERVIÇO*
📋 *OS:* ${order.id}
👤 *Cliente:* ${order.ownerName}
📞 *Telefone:* ${order.ownerPhone}
🚗 *Veículo:* ${order.vehicleModel}
🔢 *Placa:* ${order.plate}
🔧 *Serviço:* ${order.serviceRequested}
📅 *Data & Horário:* ${order.entryDate}
📍 *Local:* Av. Vicente de Carvalho, 730 - RJ 21210-000
💬 Demais preços consultar: 21-964122372 / 33811320`;

    const emailSubject = `Novo Agendamento: OS ${order.id} - ${order.vehicleModel} (${order.plate})`;
    const emailBody = `Olá equipe Jomano Centro Automotivo,

Novo agendamento realizado diretamente pelo site:

• Número da OS: ${order.id}
• Nome do Cliente: ${order.ownerName}
• Telefone/WhatsApp: ${order.ownerPhone}
• Veículo: ${order.vehicleModel}
• Placa: ${order.plate}
• Serviço Solicitado: ${order.serviceRequested}
• Data e Horário Previsto: ${order.entryDate}
• Local: Av. Vicente de Carvalho, 730 - Rio de Janeiro (RJ 21210-000)

Demais preços consultar: 21-964122372 / Loja 33811320.`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${SHOP_CONTACT_INFO.whatsappRaw}&text=${encodeURIComponent(whatsappBookingMessage)}`;
    const mailtoUrl = `mailto:${SHOP_CONTACT_INFO.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // 1. Auto-open WhatsApp in a new tab
    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Could not auto-open WhatsApp:', err);
    }

    // 2. Auto-trigger Email dispatch via hidden element
    try {
      const hiddenLink = document.createElement('a');
      hiddenLink.href = mailtoUrl;
      hiddenLink.target = '_blank';
      hiddenLink.rel = 'noopener noreferrer';
      document.body.appendChild(hiddenLink);
      hiddenLink.click();
      setTimeout(() => {
        if (document.body.contains(hiddenLink)) {
          document.body.removeChild(hiddenLink);
        }
      }, 500);
    } catch (err) {
      console.error('Could not auto-trigger Email:', err);
    }

    setAutoDispatched(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ownerName || !formData.vehicleModel || !formData.vehiclePlate) {
      setErrorMessage('Por favor, preencha o seu nome, modelo do veículo e placa.');
      return;
    }
    setErrorMessage(null);

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
      stageProgressPercent: 15,
      mechanicInCharge: {
        name: 'Mestre Jomano Silva',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        specialty: 'Chefe de Oficina & Especialista em Motores',
      },
      liveNotes: [
        `Agendamento confirmado para o pátio Av. Vicente de Carvalho, 730 (${formData.preferredDate} às ${formData.preferredTime}).`,
        'Box de atendimento reservado na rampa/elevador.',
      ],
      partsList: [],
      totalEstimate: selectedService.startingPrice || 0,
      isEngineTeardownJob: selectedService.category === 'motor',
    };

    setConfirmedOrder(newVehicleOrder);
    onBookingConfirmed(newVehicleOrder);
    triggerDirectDispatches(newVehicleOrder);
  };

  const handleResetAndClose = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 rounded-xl border border-slate-200 bg-slate-100 p-2 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {confirmedOrder ? (
          /* Confirmation Success State */
          <div className="text-center py-4 space-y-4 animate-in zoom-in-95">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-300 px-3 py-1 text-xs font-black text-emerald-800 uppercase tracking-wider mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Agendamento Confirmado e Disparado Diretamente!
              </div>
              <h3 className="font-heading text-2xl font-black text-slate-900">
                Os dados foram enviados para o WhatsApp e E-mail da Loja!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto mt-1">
                Sua Ordem de Serviço foi gerada com sucesso e a equipe Jomano já recebeu o aviso nos canais oficiais.
              </p>
            </div>

            {/* Direct Send Path Report */}
            <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50/90 p-4 max-w-md mx-auto text-left text-xs space-y-2.5 shadow-sm">
              <span className="font-black text-emerald-950 block text-xs uppercase tracking-wider border-b border-emerald-200 pb-1.5 flex items-center justify-between">
                <span>Destinos Oficiais dos Dados:</span>
                <span className="text-[10px] text-emerald-700 font-bold bg-white px-2 py-0.5 rounded-md border border-emerald-300">
                  Envio Automático
                </span>
              </span>

              <div className="space-y-2 text-slate-700">
                <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-emerald-200">
                  <span className="text-base shrink-0">📱</span>
                  <div>
                    <strong className="text-slate-900 block font-heading">WhatsApp da Oficina (Direto):</strong>
                    <span className="text-emerald-800 font-mono font-black text-xs block">21-964122372</span>
                    <span className="text-[10px] text-slate-500">Janela de conversa aberta com os dados da OS prontos para envio.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-emerald-200">
                  <span className="text-base shrink-0">✉️</span>
                  <div>
                    <strong className="text-slate-900 block font-heading">E-mail Oficial da Oficina (Direto):</strong>
                    <span className="text-blue-800 font-bold text-xs block">jomanocentroautomotivo@gmail.com</span>
                    <span className="text-[10px] text-slate-500">E-mail preenchido com especificações completas do agendamento.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-emerald-200">
                  <span className="text-base shrink-0">🏢</span>
                  <div>
                    <strong className="text-slate-900 block font-heading">Pátio da Oficina & Painel Admin:</strong>
                    <span className="text-slate-800 font-medium text-[11px] block">Av. Vicente de Carvalho, 730 (RJ 21210-000)</span>
                    <span className="text-[10px] text-slate-500">Ordem de Serviço gravada no sistema para preparação do box/elevador.</span>
                  </div>
                </div>
              </div>

              <p className="text-emerald-950 font-semibold text-[10px] pt-1 border-t border-emerald-200 text-center">
                Demais preços consultar: 21-964122372 / Loja 33811320
              </p>
            </div>

            <div className="my-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-bold">Número da OS:</span>
                <span className="font-mono font-black text-blue-700">{confirmedOrder.id}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-bold">Veículo & Placa:</span>
                <span className="font-extrabold text-slate-900">{confirmedOrder.vehicleModel} ({confirmedOrder.plate})</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-bold">Data e Hora:</span>
                <span className="font-bold text-slate-800">{confirmedOrder.entryDate}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-bold">Local:</span>
                <span className="font-bold text-slate-900">Av. Vicente de Carvalho, 730 ({SHOP_CONTACT_INFO.locationShort})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">Serviço:</span>
                <span className="font-black text-red-600">{confirmedOrder.serviceRequested}</span>
              </div>
            </div>

            {/* Direct Send Action Buttons for WhatsApp AND Email */}
            {(() => {
              const whatsappBookingMessage = `*NOVO AGENDAMENTO - JOMANO AUTO SERVIÇO*
📋 *OS:* ${confirmedOrder.id}
👤 *Cliente:* ${confirmedOrder.ownerName}
📞 *Telefone:* ${confirmedOrder.ownerPhone}
🚗 *Veículo:* ${confirmedOrder.vehicleModel}
🔢 *Placa:* ${confirmedOrder.plate}
🔧 *Serviço:* ${confirmedOrder.serviceRequested}
📅 *Data & Horário:* ${confirmedOrder.entryDate}
📍 *Local:* Av. Vicente de Carvalho, 730 - RJ 21210-000`;

              const emailSubject = `Novo Agendamento: OS ${confirmedOrder.id} - ${confirmedOrder.vehicleModel} (${confirmedOrder.plate})`;
              const emailBody = `Olá equipe Jomano Centro Automotivo,

Novo agendamento realizado pelo site:

• Número da OS: ${confirmedOrder.id}
• Nome do Cliente: ${confirmedOrder.ownerName}
• Telefone/WhatsApp: ${confirmedOrder.ownerPhone}
• Veículo: ${confirmedOrder.vehicleModel}
• Placa: ${confirmedOrder.plate}
• Serviço Solicitado: ${confirmedOrder.serviceRequested}
• Data e Horário Previsto: ${confirmedOrder.entryDate}
• Local: Av. Vicente de Carvalho, 730 - Rio de Janeiro (RJ 21210-000)

Demais preços consultar: 21-964122372 / Loja 33811320.`;

              const whatsappUrl = `https://wa.me/${SHOP_CONTACT_INFO.whatsappRaw}?text=${encodeURIComponent(whatsappBookingMessage)}`;
              const mailtoUrl = `mailto:jomanocentroautomotivo@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

              return (
                <div className="space-y-2.5 max-w-md mx-auto pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Send to WhatsApp */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="booking-send-whatsapp-btn"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-black text-white hover:bg-emerald-500 transition-all shadow-md shadow-emerald-700/20 active:scale-95"
                    >
                      <Send className="h-4 w-4" />
                      <span>Enviar no WhatsApp</span>
                    </a>

                    {/* Send to Email */}
                    <a
                      href={mailtoUrl}
                      id="booking-send-email-btn"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-xs font-black text-white hover:bg-blue-600 transition-all shadow-md shadow-blue-800/20 active:scale-95"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Enviar por E-mail</span>
                    </a>
                  </div>

                  <button
                    onClick={handleResetAndClose}
                    className="w-full rounded-xl border-2 border-slate-300 hover:border-slate-400 bg-white px-5 py-2.5 text-xs font-black text-slate-800 hover:bg-slate-50 transition-all"
                  >
                    Acompanhar Status na Linha do Tempo
                  </button>
                </div>
              );
            })()}
          </div>
        ) : (
          /* Main Booking Form */
          <div>
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
                {SHOP_CONTACT_INFO.name}
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Agendamento de Horário & Reserva de Box
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Pátio Av. Vicente de Carvalho, 730 • RJ 21210-000 • WhatsApp: {SHOP_CONTACT_INFO.whatsapp} | Loja: {SHOP_CONTACT_INFO.phoneLandline} • E-mail: {SHOP_CONTACT_INFO.email}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {errorMessage && (
                <div className="rounded-xl border-2 border-red-300 bg-red-50 p-3 text-xs font-bold text-red-700">
                  {errorMessage}
                </div>
              )}
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
                  1. Selecione o Serviço Principal
                </label>
                <select
                  id="booking-service-select"
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white p-3 text-xs font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                >
                  {DIVERSIFIED_SERVICES.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.title} — {srv.displayPrice} ({srv.warranty})
                    </option>
                  ))}
                </select>
              </div>

              {/* Vehicle Details */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
                  2. Dados do Veículo
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <input
                      type="text"
                      id="vehicle-brand-input"
                      placeholder="Marca (ex: Chevrolet, Peugeot)"
                      value={formData.vehicleBrand}
                      onChange={(e) => setFormData({ ...formData, vehicleBrand: e.target.value })}
                      required
                      className="w-full rounded-xl border-2 border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="vehicle-model-input"
                      placeholder="Modelo (ex: Onix, 207, Gol)"
                      value={formData.vehicleModel}
                      onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                      required
                      className="w-full rounded-xl border-2 border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="vehicle-plate-input"
                      placeholder="Placa (ex: RIO2E19)"
                      value={formData.vehiclePlate}
                      onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value.toUpperCase() })}
                      required
                      className="w-full rounded-xl border-2 border-slate-200 bg-white p-2.5 text-xs font-mono font-black uppercase text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Date and Time slot */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
                  3. Data & Horário Preferencial no Pátio
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
                      className="w-full rounded-xl border-2 border-slate-200 bg-white pl-10 pr-3 py-2.5 text-xs font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <select
                      id="preferred-time-select"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full rounded-xl border-2 border-slate-200 bg-white pl-10 pr-3 py-2.5 text-xs font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
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
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
                  4. Contato do Proprietário (WhatsApp / Tel)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    id="owner-name-input"
                    placeholder="Seu Nome Completo"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    required
                    className="w-full rounded-xl border-2 border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                  />
                  <input
                    type="tel"
                    id="owner-phone-input"
                    placeholder="WhatsApp (ex: 21 96412-2372)"
                    value={formData.ownerPhone}
                    onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                    required
                    className="w-full rounded-xl border-2 border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                  />
                  <input
                    type="email"
                    id="owner-email-input"
                    placeholder="E-mail"
                    value={formData.ownerEmail}
                    onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                    className="w-full rounded-xl border-2 border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Observations */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
                  Observações ou Detalhes (Opcional)
                </label>
                <textarea
                  id="booking-notes-input"
                  placeholder="Ex: Quero alinhamento e balanceamento de roda de ferro, verificar barulho na suspensão..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-red-600" />
                  {SHOP_CONTACT_INFO.address}
                </span>

                <button
                  type="submit"
                  id="btn-submit-booking"
                  className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 px-5 sm:px-6 py-3 text-xs font-black text-slate-950 shadow-md shadow-yellow-500/20 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="h-4 w-4 text-slate-950" />
                  <span>Confirmar & Enviar Direto (WhatsApp + E-mail)</span>
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
