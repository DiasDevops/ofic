import React, { useState } from 'react';
import { 
  VehicleOrder, 
  MaintenanceStage 
} from '../types';
import { MAINTENANCE_STEPS, SHOP_CONTACT_INFO } from '../data/mockData';
import { verifyAdminPassword, setAdminAuthenticated } from '../utils/auth';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  Play, 
  ShieldCheck, 
  FileText, 
  Send, 
  MapPin,
  Lock,
  Unlock,
  Building2,
  Phone,
  Eye,
  EyeOff,
  Printer,
  X,
  FileSpreadsheet,
  AlertCircle,
  HelpCircle,
  Shield
} from 'lucide-react';

interface LiveVehicleTrackerProps {
  vehicles: VehicleOrder[];
  selectedVehicleId: string;
  onSelectVehicle: (id: string) => void;
  onSimulateStatusAdvance: (orderId: string) => void;
  onOpenQuickSupportForVehicle: (vehicle: VehicleOrder) => void;
  isShopMode?: boolean;
  onToggleShopMode?: (mode: boolean) => void;
  onNavigateToAdmin?: () => void;
}

export const LiveVehicleTracker: React.FC<LiveVehicleTrackerProps> = ({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
  onSimulateStatusAdvance,
  onOpenQuickSupportForVehicle,
  isShopMode: externalShopMode,
  onToggleShopMode: externalToggleShopMode,
  onNavigateToAdmin,
}) => {
  const [internalShopMode, setInternalShopMode] = useState<boolean>(false);
  const [searchPlate, setSearchPlate] = useState('');
  const [showShopAuthModal, setShowShopAuthModal] = useState(false);
  const [showOsDocModal, setShowOsDocModal] = useState(false);
  const [shopPin, setShopPin] = useState('');
  const [pinError, setPinError] = useState('');

  // Use external shop mode if supplied, otherwise fallback to internal state
  const isShop = externalShopMode !== undefined ? externalShopMode : internalShopMode;

  const handleToggleShop = (enabled: boolean) => {
    if (externalToggleShopMode) {
      externalToggleShopMode(enabled);
    }
    setInternalShopMode(enabled);
  };

  const currentVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const maskPlate = (plate: string): string => {
    if (isShop) return plate;
    if (!plate) return '***-****';
    const parts = plate.split('-');
    if (parts.length === 2) {
      return `${parts[0]}-••••`;
    }
    if (plate.length >= 7) {
      return `${plate.slice(0, 3)}-••••`;
    }
    return '•••••••';
  };

  const maskOwnerName = (name: string): string => {
    if (isShop) return name;
    if (!name) return 'Cliente';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0];
    return `${parts[0]} ${parts[parts.length - 1][0]}. (Iniciais)`;
  };

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
            Acompanhamento de Ordem de Serviço em Tempo Real
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Consulte a etapa da manutenção, laudos mecânicos e peças aplicadas com proteção de dados.
          </p>
        </div>

        {/* Search by plate or OS */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            id="search-plate-input"
            placeholder="Buscar por placa ou nº de OS..."
            value={searchPlate}
            onChange={(e) => setSearchPlate(e.target.value)}
            className="w-full rounded-2xl border-2 border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-900 font-semibold placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 shadow-xs"
          />
        </div>
      </div>

      {/* Vehicles selection pills */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin w-full max-w-full">
        <span className="text-xs font-bold text-slate-500 shrink-0">Ordens de Serviço:</span>
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
              <span className="font-mono font-black text-blue-700">
                {isShop ? vehicle.plate : maskPlate(vehicle.plate)}
              </span>
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

      {/* SHOP MODE BANNER (When unlocked) or Action Bar */}
      {isShop ? (
        <div 
          id="os-privacy-mode-banner"
          className="rounded-3xl border-2 border-amber-400 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100/60 text-amber-950 p-4 sm:p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
        >
          <div className="flex items-start gap-3.5">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl font-bold shadow-xs bg-amber-500 text-slate-950 ring-4 ring-amber-300/40">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                  🏢 MODO OFICINA / ADMIN ATIVO
                </span>
                <span className="rounded-md px-2 py-0.5 text-[10px] font-black uppercase border bg-amber-200 border-amber-300 text-amber-900">
                  Visualização da Loja (Dados Liberados)
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-600 font-medium leading-relaxed max-w-2xl">
                Acesso da equipe Jomano ativado. A placa completa, dados técnicos do veículo e telefone de contato do proprietário estão visíveis para atendimento da oficina.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-center shrink-0">
            <button
              type="button"
              id="btn-open-os-document"
              onClick={() => setShowOsDocModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 px-3.5 py-2.5 text-xs font-bold text-slate-800 transition-all shadow-xs active:scale-95"
            >
              <FileText className="h-3.5 w-3.5 text-blue-600" />
              <span>Espelho da OS Oficial</span>
            </button>

            {onNavigateToAdmin && (
              <button
                type="button"
                id="btn-go-to-admin-panel"
                onClick={onNavigateToAdmin}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 px-3.5 py-2.5 text-xs font-black text-slate-950 shadow-sm transition-all active:scale-95"
              >
                <Building2 className="h-3.5 w-3.5" />
                <span>Painel do Administrador</span>
              </button>
            )}

            <button
              type="button"
              id="btn-lock-shop-mode"
              onClick={() => handleToggleShop(false)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 px-3.5 py-2.5 text-xs font-black text-white shadow-sm transition-all active:scale-95"
            >
              <Lock className="h-3.5 w-3.5 text-amber-400" />
              <span>Ocultar Dados (Modo Cliente)</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            id="btn-open-os-document"
            onClick={() => setShowOsDocModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-800 transition-all shadow-xs active:scale-95"
          >
            <FileText className="h-3.5 w-3.5 text-blue-600" />
            <span>Espelho da OS Oficial</span>
          </button>

          <button
            type="button"
            id="btn-unlock-shop-mode"
            onClick={() => setShowShopAuthModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 px-4 py-2.5 text-xs font-black text-white shadow-sm transition-all active:scale-95"
          >
            <Lock className="h-3.5 w-3.5 text-amber-400" />
            <span>Área da Oficina (Modo Admin)</span>
          </button>
        </div>
      )}

      {/* Main Tracker Container */}
      <div className="overflow-hidden rounded-3xl border-3 border-blue-500/30 bg-white shadow-xl hover:shadow-2xl transition-all">
        <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-emerald-500 to-amber-500" />
        
        {/* Vehicle Header Card with Photo & Specs */}
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
                      {isShop ? currentVehicle.plate : maskPlate(currentVehicle.plate)}
                    </span>
                    {!isShop && (
                      <span className="flex items-center gap-0.5 rounded bg-slate-100 px-1 py-0.5 text-[9px] font-extrabold text-slate-600">
                        <Lock className="h-2.5 w-2.5 text-slate-500" /> Oculto
                      </span>
                    )}
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
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
                      Ordem de Serviço: {currentVehicle.id}
                    </span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200">
                      Entrada: {currentVehicle.entryDate}
                    </span>
                    {isShop ? (
                      <span className="rounded-md bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 text-[10px] font-black uppercase flex items-center gap-1">
                        <Building2 className="h-2.5 w-2.5" /> Exibição da Loja
                      </span>
                    ) : (
                      <span className="rounded-md bg-emerald-50 text-emerald-800 border border-emerald-300 px-2 py-0.5 text-[10px] font-bold uppercase flex items-center gap-1">
                        <Shield className="h-2.5 w-2.5" /> Privacidade Ativa
                      </span>
                    )}
                  </div>

                  <h3 className="mt-1.5 font-heading text-2xl sm:text-3xl font-black text-slate-900">
                    {currentVehicle.vehicleModel}
                  </h3>

                  {/* Vehicle Specs Chips (Shown in Full for Shop Mode, Protected in Client Mode) */}
                  <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {isShop ? (
                      <>
                        <span className="rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                          Marca: <strong className="text-slate-900">{currentVehicle.vehicleBrand}</strong>
                        </span>
                        <span className="rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                          Ano: <strong className="text-slate-900">{currentVehicle.year}</strong>
                        </span>
                        <span className="rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                          Cor: <strong className="text-slate-900">{currentVehicle.color}</strong>
                        </span>
                        <span className="rounded-lg bg-slate-900 text-white px-2.5 py-1 text-[11px] font-mono font-black">
                          Placa: {currentVehicle.plate}
                        </span>
                      </>
                    ) : (
                      <span className="rounded-xl bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
                        <Lock className="h-3 w-3 text-slate-500" />
                        <span>Dados do veículo (placa e chassi) protegidos • Visíveis apenas para a loja</span>
                      </span>
                    )}
                  </div>

                  {/* Owner & Phone row */}
                  <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm">
                    <p className="text-slate-600 font-medium">
                      Proprietário:{' '}
                      <span className="text-slate-900 font-bold">
                        {isShop ? currentVehicle.ownerName : maskOwnerName(currentVehicle.ownerName)}
                      </span>
                    </p>

                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 font-medium">Telefone:</span>
                      {isShop ? (
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-black text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-lg text-xs">
                            {currentVehicle.ownerPhone}
                          </span>
                          <a
                            href={`tel:${currentVehicle.ownerPhone.replace(/\D/g, '')}`}
                            className="inline-flex items-center gap-1 rounded-md bg-blue-600 hover:bg-blue-500 px-2 py-0.5 text-[10px] font-black text-white transition-colors"
                            title="Ligar para o proprietário"
                          >
                            <Phone className="h-2.5 w-2.5" /> Ligar
                          </a>
                          <a
                            href={`https://wa.me/55${currentVehicle.ownerPhone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md bg-emerald-600 hover:bg-emerald-500 px-2 py-0.5 text-[10px] font-black text-white transition-colors"
                            title="Chamar no WhatsApp"
                          >
                            <Send className="h-2.5 w-2.5" /> WhatsApp
                          </a>
                        </div>
                      ) : (
                        <span className="font-mono text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-lg text-xs flex items-center gap-1">
                          <Lock className="h-3 w-3 text-slate-400" />
                          <span>••••-•••• (Oculto - Apenas para a loja)</span>
                        </span>
                      )}
                    </div>

                    <p className="text-slate-600 font-medium">
                      Previsão: <span className="text-blue-700 font-bold">{currentVehicle.estimatedCompletion}</span>
                    </p>
                  </div>
                </div>

                {/* Top Action buttons */}
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

      {/* SHOP AUTHENTICATION MODAL */}
      {showShopAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border-2 border-slate-200 animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-heading font-black text-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
                <span>Acesso Exclusivo da Loja</span>
              </div>
              <button
                onClick={() => {
                  setShowShopAuthModal(false);
                  setPinError('');
                }}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-950 leading-relaxed space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-amber-700" />
                Área Restrita do Administrador da Oficina:
              </p>
              <p>
                Insira sua senha de administrador para liberar o acesso ao Modo Oficina e ao controle das Ordens de Serviço.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!shopPin) {
                  setPinError('Por favor, digite a senha do administrador.');
                  return;
                }
                if (verifyAdminPassword(shopPin)) {
                  handleToggleShop(true);
                  setAdminAuthenticated(true);
                  setShowShopAuthModal(false);
                  setShopPin('');
                  setPinError('');
                } else {
                  setPinError('Senha incorreta. Acesso restrito aos administradores da loja.');
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Senha do Administrador:
                </label>
                <input
                  type="password"
                  placeholder="Insira a senha do administrador"
                  value={shopPin}
                  onChange={(e) => {
                    setShopPin(e.target.value);
                    if (pinError) setPinError('');
                  }}
                  className="w-full rounded-xl border-2 border-slate-200 px-3.5 py-2.5 text-sm font-mono focus:border-amber-500 focus:outline-none"
                  autoFocus
                />
                {pinError && (
                  <p className="mt-1.5 text-xs font-bold text-red-600">{pinError}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowShopAuthModal(false);
                    setPinError('');
                    setShopPin('');
                  }}
                  className="rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-2.5 text-xs font-black text-slate-950 shadow-md active:scale-95 transition-all"
                >
                  Acessar Modo Oficina
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OFFICIAL SERVICE ORDER DOCUMENT MODAL (ESPELHO DA OS) */}
      {showOsDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 sm:p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border-2 border-slate-200 animate-in zoom-in-95 space-y-6">
            
            {/* Header of the OS Document */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-900 pb-4 gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 block">
                  Documento Oficial de Manutenção Automotiva
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900">
                  {SHOP_CONTACT_INFO.name}
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  {SHOP_CONTACT_INFO.fullAddress}
                </p>
                <p className="text-xs text-slate-700 font-bold mt-0.5">
                  Telefones: 21-964122372 (WhatsApp) • Loja: 33811320 • Email: {SHOP_CONTACT_INFO.email}
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-mono font-black text-white block sm:inline-block">
                  {currentVehicle.id}
                </span>
                <span className="text-[11px] font-bold text-slate-500 block mt-1">
                  Data de Abertura: {currentVehicle.entryDate}
                </span>
                <span className={`inline-block mt-1 text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                  isShop ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                }`}>
                  {isShop ? 'VIA DA LOJA (DADOS LIBERADOS)' : 'VIA DO CLIENTE (DADOS PROTEGIDOS)'}
                </span>
              </div>
            </div>

            {/* Split Information Blocks: Vehicle & Owner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Vehicle Data Box */}
              <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center justify-between">
                  <span>🚗 Dados do Veículo</span>
                  {!isShop && (
                    <span className="text-[10px] text-blue-700 font-bold flex items-center gap-1">
                      <Lock className="h-3 w-3" /> Protegido
                    </span>
                  )}
                </span>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500 font-bold">Placa:</span>
                    <span className="font-mono font-black text-slate-900">
                      {isShop ? currentVehicle.plate : `${maskPlate(currentVehicle.plate)} [Oculto]`}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500 font-bold">Modelo:</span>
                    <span className="font-bold text-slate-900">{currentVehicle.vehicleModel}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500 font-bold">Marca:</span>
                    <span className="font-bold text-slate-900">
                      {isShop ? currentVehicle.vehicleBrand : '[Oculto para o público]'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Ano / Cor:</span>
                    <span className="font-bold text-slate-900">
                      {isShop ? `${currentVehicle.year} • ${currentVehicle.color}` : '[Oculto - Apenas para a loja]'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Owner Data Box */}
              <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center justify-between">
                  <span>👤 Dados do Proprietário</span>
                  {!isShop && (
                    <span className="text-[10px] text-blue-700 font-bold flex items-center gap-1">
                      <Lock className="h-3 w-3" /> Protegido
                    </span>
                  )}
                </span>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500 font-bold">Nome do Cliente:</span>
                    <span className="font-bold text-slate-900">
                      {isShop ? currentVehicle.ownerName : maskOwnerName(currentVehicle.ownerName)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500 font-bold">Telefone / WhatsApp:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {isShop ? (
                        <span className="text-emerald-700">{currentVehicle.ownerPhone}</span>
                      ) : (
                        <span className="text-slate-500">••••-•••• (Oculto - Apenas para a loja)</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-1">
                    <span className="text-slate-500 font-bold">Previsão de Entrega:</span>
                    <span className="font-bold text-blue-700">{currentVehicle.estimatedCompletion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Status Atual:</span>
                    <span className="font-bold text-slate-900 capitalize">{currentVehicle.currentStage}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service & Replaced Parts Table */}
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-900 block">
                🔧 Discriminação de Serviços e Peças Homologadas
              </span>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-black border-b border-slate-200 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Descrição da Peça / Serviço</th>
                      <th className="p-3">Código</th>
                      <th className="p-3">Marca</th>
                      <th className="p-3 text-center">Qtd</th>
                      <th className="p-3 text-right">Valor Unit.</th>
                      <th className="p-3 text-right">Total</th>
                      <th className="p-3 text-center">Garantia</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {currentVehicle.partsList.map((part, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">{part.name}</td>
                        <td className="p-3 font-mono text-slate-600">{part.code}</td>
                        <td className="p-3 text-slate-700">{part.brand}</td>
                        <td className="p-3 text-center font-bold">{part.quantity}</td>
                        <td className="p-3 text-right font-mono">
                          R$ {part.unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-slate-900">
                          R$ {(part.unitPrice * part.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-3 text-center">
                          <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-black text-emerald-800">
                            {part.warrantyMonths}m
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50 border-t-2 border-slate-200 font-black">
                    <tr>
                      <td colSpan={5} className="p-3 text-right uppercase text-slate-600">
                        Valor Total da Ordem de Serviço:
                      </td>
                      <td className="p-3 text-right font-mono text-sm text-emerald-700">
                        R$ {currentVehicle.totalEstimate.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Shop Observação / Notice */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-800">
                Observações Legais e de Privacidade:
              </p>
              <p>
                • Ordem de Serviço gerada conforme as diretrizes do Centro Automotivo Jomano. Demais preços consultar: 21-964122372 / Loja 33811320.
              </p>
              <p>
                • Por segurança e conformidade, os dados do veículo e o telefone do proprietário são mantidos ocultos no acesso público, ficando disponíveis apenas para a equipe autorizada da loja.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between border-t border-slate-200 pt-4 gap-3">
              <div className="text-xs text-slate-500 font-semibold">
                Responsável Técnico: <strong className="text-slate-800">{currentVehicle.mechanicInCharge.name}</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 px-4 py-2 text-xs font-bold text-slate-800 shadow-xs transition-colors"
                >
                  <Printer className="h-4 w-4 text-slate-600" />
                  <span>Imprimir OS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowOsDocModal(false)}
                  className="rounded-xl bg-slate-900 hover:bg-slate-800 px-5 py-2 text-xs font-black text-white shadow-md transition-colors"
                >
                  Fechar Documento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
