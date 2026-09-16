import React, { useState } from 'react';
import { 
  VehicleOrder, 
  MaintenanceStage, 
  AppNotification 
} from '../types';
import { MAINTENANCE_STEPS } from '../data/mockData';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  Cpu, 
  Gauge, 
  Car, 
  ShieldCheck, 
  UserCheck, 
  Sparkles, 
  PhoneCall, 
  FileText,
  AlertTriangle,
  Play,
  RotateCcw
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

  // Filtering vehicles if user searches by plate or model
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
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Acompanhamento em Tempo Real
            </span>
          </div>
          <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Progresso do seu Veículo na Oficina
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Acompanhe cada etapa técnica, peças substituídas e laudos da bancada com atualizações instantâneas.
          </p>
        </div>

        {/* Search by plate */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            id="search-plate-input"
            placeholder="Buscar por placa (ex: BRA-2E19)"
            value={searchPlate}
            onChange={(e) => setSearchPlate(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Vehicles selection pills (horizontal scrollable bar) */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
        <span className="text-xs font-semibold text-slate-400 shrink-0">Veículos no Pátio:</span>
        {filteredVehicles.map((vehicle) => {
          const isSelected = vehicle.id === currentVehicle.id;
          return (
            <button
              key={vehicle.id}
              id={`vehicle-pill-${vehicle.id}`}
              onClick={() => onSelectVehicle(vehicle.id)}
              className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 text-xs font-medium shrink-0 transition-all ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500/40 shadow-md'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className="font-mono font-bold text-amber-400">{vehicle.plate}</span>
              <span className="text-slate-300 truncate max-w-[140px]">{vehicle.vehicleModel}</span>
              <span
                className={`h-2 w-2 rounded-full ${
                  vehicle.currentStage === 'pronto'
                    ? 'bg-emerald-400'
                    : vehicle.currentStage === 'execucao'
                    ? 'bg-amber-400'
                    : 'bg-sky-400'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Main Tracker Container */}
      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl">
        {/* Vehicle Header Card with Vehicle Photo */}
        <div className="relative border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Vehicle Photo in Card (satisfies "quero fotos de veiculos em alguns cards") */}
            <div className="lg:col-span-4 relative group">
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-950 shadow-lg">
                <img
                  src={currentVehicle.imageUrl}
                  alt={currentVehicle.vehicleModel}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                
                {/* Plate Badge styled like Mercosul Plate */}
                <div className="absolute bottom-3 left-3 rounded-md bg-white px-2.5 py-1 text-slate-950 shadow-md ring-1 ring-slate-900/40">
                  <div className="flex items-center gap-1">
                    <span className="rounded-xs bg-blue-700 px-1 py-0.5 text-[8px] font-bold text-white uppercase">
                      Brasil
                    </span>
                    <span className="font-mono text-xs font-black tracking-widest text-slate-900">
                      {currentVehicle.plate}
                    </span>
                  </div>
                </div>

                {currentVehicle.isEngineTeardownJob && (
                  <div className="absolute top-3 right-3 rounded-lg bg-amber-500/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-slate-950 shadow">
                    ⚙️ Bancada de Precisão
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle Specs & Live Info */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Ordem de Serviço: {currentVehicle.id}
                    </span>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                      Entrada: {currentVehicle.entryDate}
                    </span>
                  </div>
                  <h3 className="mt-1 font-heading text-2xl sm:text-3xl font-bold text-white">
                    {currentVehicle.vehicleModel}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Proprietário: <span className="text-slate-200 font-medium">{currentVehicle.ownerName}</span> • Previsão: <span className="text-amber-400 font-medium">{currentVehicle.estimatedCompletion}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Status advance simulator for testing live notifications */}
                  <button
                    id="btn-simulate-status"
                    onClick={() => onSimulateStatusAdvance(currentVehicle.id)}
                    title="Avançar status e disparar notificação automática do mecânico"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/20 active:scale-95 transition-all"
                  >
                    <Play className="h-3.5 w-3.5" />
                    <span>Simular Próximo Passo</span>
                  </button>

                  <button
                    id="btn-contact-mechanic-order"
                    onClick={() => onOpenQuickSupportForVehicle(currentVehicle)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-rose-500 transition-all"
                  >
                    <PhoneCall className="h-3.5 w-3.5" />
                    <span>Falar com Oficina</span>
                  </button>
                </div>
              </div>

              {/* Service requested badge */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <Wrench className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                      Serviço em Execução
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {currentVehicle.serviceRequested}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Orçamento Aprovado</span>
                    <span className="font-heading text-sm font-bold text-emerald-400">
                      R$ {currentVehicle.totalEstimate.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Step Visual Maintenance Timeline */}
        <div className="p-6 sm:p-8 bg-slate-900/60 border-b border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400" />
              Etapas do Processo de Reparação
            </span>
            <span className="text-xs font-bold text-amber-400">
              Progresso Geral: {currentVehicle.stageProgressPercent}%
            </span>
          </div>

          {/* Stepper container */}
          <div className="relative">
            {/* Background connection bar */}
            <div className="absolute top-5 left-6 right-6 h-1 bg-slate-800 rounded-full hidden md:block">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-700 rounded-full"
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
                    className={`flex flex-col p-3.5 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'border-amber-500 bg-amber-500/10 shadow-lg ring-1 ring-amber-500/30'
                        : isPast
                        ? 'border-emerald-500/40 bg-emerald-950/20 text-slate-300'
                        : 'border-slate-800 bg-slate-950/30 text-slate-500 opacity-70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-xs transition-all ${
                          isPast
                            ? 'bg-emerald-500 text-slate-950 font-black'
                            : isCurrent
                            ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20 animate-pulse'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isPast ? <CheckCircle2 className="h-5 w-5" /> : idx + 1}
                      </div>

                      <div className="overflow-hidden">
                        <span className="block text-xs font-bold text-white truncate">
                          {step.label.replace(/^\d\.\s*/, '')}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {isCurrent ? '⚡ Em andamento' : isPast ? '✓ Concluído' : 'Aguardando'}
                        </span>
                      </div>
                    </div>

                    <p className="mt-2.5 text-[11px] leading-relaxed text-slate-400 line-clamp-2">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lower Details: Live Mechanic Feed + Parts List */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950/60">
          {/* Live Mechanic Notes */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-400" />
                Diário de Bordo & Notas do Mecânico
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">● Transmissão Ativa</span>
            </div>

            {/* Mechanic in charge mini card */}
            <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-800 bg-slate-900/60">
              <img
                src={currentVehicle.mechanicInCharge.avatar}
                alt={currentVehicle.mechanicInCharge.name}
                referrerPolicy="no-referrer"
                className="h-11 w-11 rounded-full object-cover border border-amber-500/40"
              />
              <div>
                <span className="text-xs font-bold text-white block">
                  {currentVehicle.mechanicInCharge.name}
                </span>
                <span className="text-[11px] text-amber-400">
                  {currentVehicle.mechanicInCharge.specialty}
                </span>
              </div>
            </div>

            {/* Live notes list */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {currentVehicle.liveNotes.map((note, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-3 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
                >
                  <span className="h-2 w-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Replaced Parts & Warranty List */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Peças Substituídas com Garantia
              </span>
              <span className="text-[11px] text-slate-400">
                {currentVehicle.partsList.length} itens homologados
              </span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {currentVehicle.partsList.map((part, pIdx) => (
                <div
                  key={pIdx}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900/40 text-xs"
                >
                  <div className="overflow-hidden pr-2">
                    <span className="font-semibold text-white block truncate">{part.name}</span>
                    <span className="text-[10px] text-slate-400">
                      Cód: {part.code} • Marca: <strong className="text-slate-300">{part.brand}</strong> • Qtd: {part.quantity}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-amber-400 block">
                      R$ {(part.unitPrice * part.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium">
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
