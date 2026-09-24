import React, { useState } from 'react';
import { 
  VehicleOrder, 
  MaintenanceStage 
} from '../types';
import { MAINTENANCE_STEPS, SHOP_CONTACT_INFO } from '../data/mockData';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  Play, 
  ShieldCheck, 
  FileText,
  Send,
  MapPin
} from 'lucide-react';

interface LiveVehicleTrackerProps {
  vehicles: VehicleOrder[];
  selectedVehicleId: string;
  onSelectVehicle: (id: string) => void;
  onSimulateStatusAdvance: (orderId: string) => void;
  onOpenQuickSupportForVehicle: (vehicle: VehicleOrder) => void;
}

export const LiveVehicleTracker: React.FC<LiveVehicleTrackerProps> = ({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
  onSimulateStatusAdvance,
  onOpenQuickSupportForVehicle,
}) => {
  const [searchPlate, setSearchPlate] = useState('');

  const currentVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.plate.toLowerCase().includes(searchPlate.toLowerCase()) ||
      v.vehicleModel.toLowerCase().includes(searchPlate.toLowerCase()) ||
      v.id.toLowerCase().includes(searchPlate.toLowerCase())
  );

  const stagesOrder: MaintenanceStage[] = ['checkin', 'diagnostico', 'execucao', 'testes', 'pronto'];
  const currentStageIndex = stagesOrder.indexOf(currentVehicle.currentStage);

  return (
    <section id="tracker-section" className="space-y-6">
      {/* Header bar of the tracker with search and status info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-600"></span>
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
              Acompanhamento ao Vivo • Pátio Vicente de Carvalho, 730
            </span>
          </div>
          <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Progresso do seu Veículo na Oficina
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Acompanhe o status do alinhamento, balanceamento, troca de óleo ou retífica com laudos em tempo real.
          </p>
        </div>

        {/* Search by plate */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            id="search-plate-input"
            placeholder="Buscar por placa (ex: RIO-2E19, JMN-4A88)"
            value={searchPlate}
            onChange={(e) => setSearchPlate(e.target.value)}
            className="w-full rounded-2xl border-2 border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-900 font-semibold placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 shadow-xs"
          />
        </div>
      </div>

      {/* Vehicles selection pills */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
        <span className="text-xs font-bold text-slate-500 shrink-0">Veículos no Pátio:</span>
        {filteredVehicles.map((vehicle) => {
          const isSelected = vehicle.id === currentVehicle.id;
          return (
            <button
              key={vehicle.id}
              id={`vehicle-pill-${vehicle.id}`}
              onClick={() => onSelectVehicle(vehicle.id)}
              className={`flex items-center gap-2.5 rounded-2xl border-2 px-3.5 py-2 text-xs font-bold shrink-0 transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-600/20 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              <span className="font-mono font-black text-blue-700">{vehicle.plate}</span>
              <span className="text-slate-800 truncate max-w-[140px]">{vehicle.vehicleModel}</span>
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  vehicle.currentStage === 'pronto'
                    ? 'bg-emerald-500'
                    : vehicle.currentStage === 'execucao'
                    ? 'bg-amber-500'
                    : 'bg-blue-500'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Main Tracker Container */}
      <div className="overflow-hidden rounded-3xl border-3 border-blue-500/30 bg-white shadow-xl hover:shadow-2xl transition-all">
        <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-emerald-500 to-amber-500" />
        {/* Vehicle Header Card with Photo */}
        <div className="relative border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-blue-50/50 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Vehicle Photo Card */}
            <div className="lg:col-span-4 relative group">
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-950 shadow-md">
                <img
                  src={currentVehicle.imageUrl}
                  alt={currentVehicle.vehicleModel}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Mercosul Plate badge */}
                <div className="absolute bottom-3 left-3 rounded-lg bg-white px-2.5 py-1 text-slate-950 shadow-md ring-1 ring-slate-900/30">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-xs bg-blue-700 px-1 py-0.5 text-[8px] font-black text-white uppercase">
                      Brasil
                    </span>
                    <span className="font-mono text-xs font-black tracking-widest text-slate-900">
                      {currentVehicle.plate}
                    </span>
                  </div>
                </div>

                {currentVehicle.isEngineTeardownJob && (
                  <div className="absolute top-3 right-3 rounded-lg bg-amber-400 px-2.5 py-1 text-[10px] font-black text-slate-950 shadow">
                    ⚙️ Bancada de Precisão
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle Specs & Live Info */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
                      Ordem de Serviço: {currentVehicle.id}
                    </span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200">
                      Entrada: {currentVehicle.entryDate}
                    </span>
                  </div>
                  <h3 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-slate-900">
                    {currentVehicle.vehicleModel}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    Proprietário: <span className="text-slate-900 font-bold">{currentVehicle.ownerName}</span> • Previsão: <span className="text-blue-700 font-bold">{currentVehicle.estimatedCompletion}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="btn-simulate-status"
                    onClick={() => onSimulateStatusAdvance(currentVehicle.id)}
                    title="Avançar status e disparar notificação automática"
                    className="inline-flex items-center gap-1.5 rounded-2xl bg-amber-400 hover:bg-amber-300 px-3.5 py-2.5 text-xs font-black text-slate-950 shadow-sm active:scale-95 transition-all"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Simular Próximo Passo</span>
                  </button>

                  <button
                    id="btn-contact-mechanic-order"
                    onClick={() => onOpenQuickSupportForVehicle(currentVehicle)}
                    className="inline-flex items-center gap-1.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2.5 text-xs font-black text-white shadow-sm transition-all"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>WhatsApp Oficina</span>
                  </button>
                </div>
              </div>

              {/* Service requested banner */}
              <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <Wrench className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block uppercase">
                      Serviço em Execução
                    </span>
                    <span className="text-xs sm:text-sm font-black text-slate-900">
                      {currentVehicle.serviceRequested}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-500 block font-bold uppercase">Orçamento Aprovado</span>
                  <span className="font-heading text-base font-black text-emerald-700">
                    R$ {currentVehicle.totalEstimate.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Step Visual Maintenance Timeline */}
        <div className="p-6 sm:p-8 bg-white border-b border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              Etapas do Processo no Pátio Jomano
            </span>
            <span className="text-xs font-black text-blue-700">
              Progresso Geral: {currentVehicle.stageProgressPercent}%
            </span>
          </div>

          {/* Stepper container */}
          <div className="relative">
            {/* Background connection bar */}
            <div className="absolute top-5 left-6 right-6 h-1.5 bg-slate-200 rounded-full hidden md:block">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-700 rounded-full"
                style={{
                  width: `${(currentStageIndex / (stagesOrder.length - 1)) * 100}%`,
                }}
              />
            </div>

            {/* Steps grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
              {MAINTENANCE_STEPS.map((step, idx) => {
                const isPast = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                const isFuture = idx > currentStageIndex;

                return (
                  <div
                    key={step.id}
                    className={`flex flex-col p-4 rounded-2xl border-2 transition-all ${
                      isCurrent
                        ? 'border-blue-600 bg-blue-50/80 shadow-md ring-2 ring-blue-600/20'
                        : isPast
                        ? 'border-emerald-300 bg-emerald-50/70 text-slate-800'
                        : 'border-slate-200 bg-slate-50 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black text-xs transition-all ${
                          isPast
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : isCurrent
                            ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-600/20'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {isPast ? <CheckCircle2 className="h-5 w-5" /> : idx + 1}
                      </div>

                      <div className="overflow-hidden">
                        <span className="block text-xs font-black text-slate-900 truncate">
                          {step.label.replace(/^\d\.\s*/, '')}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 block">
                          {isCurrent ? '⚡ Em andamento' : isPast ? '✓ Concluído' : 'Aguardando'}
                        </span>
                      </div>
                    </div>

                    <p className="mt-2.5 text-[11px] leading-relaxed text-slate-600 font-medium">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lower Details: Live Mechanic Feed + Parts List */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50">
          {/* Live Mechanic Notes */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                Diário de Bordo & Notas do Mecânico
              </span>
              <span className="text-[11px] text-emerald-700 font-extrabold flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                Atualização em Tempo Real
              </span>
            </div>

            {/* Mechanic in charge */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-white shadow-xs">
              <img
                src={currentVehicle.mechanicInCharge.avatar}
                alt={currentVehicle.mechanicInCharge.name}
                referrerPolicy="no-referrer"
                className="h-11 w-11 rounded-full object-cover border-2 border-blue-600"
              />
              <div>
                <span className="text-xs font-black text-slate-900 block">
                  {currentVehicle.mechanicInCharge.name}
                </span>
                <span className="text-[11px] text-blue-700 font-bold">
                  {currentVehicle.mechanicInCharge.specialty}
                </span>
              </div>
            </div>

            {/* Live notes list */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {currentVehicle.liveNotes.map((note, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700 font-medium leading-relaxed flex items-start gap-2.5 shadow-xs"
                >
                  <span className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Replaced Parts & Warranty List */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Peças & Serviços Homologados
              </span>
              <span className="text-[11px] text-slate-500 font-bold">
                {currentVehicle.partsList.length} itens registrados
              </span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {currentVehicle.partsList.map((part, pIdx) => (
                <div
                  key={pIdx}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-white text-xs shadow-xs"
                >
                  <div className="overflow-hidden pr-2">
                    <span className="font-extrabold text-slate-900 block truncate">{part.name}</span>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      Cód: {part.code} • Marca: <strong className="text-slate-800">{part.brand}</strong> • Qtd: {part.quantity}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-black text-blue-700 block">
                      R$ {(part.unitPrice * part.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-black">
                      Garantia {part.warrantyMonths}m
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
