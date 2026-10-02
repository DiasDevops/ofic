import React, { useState } from 'react';
import { 
  VehicleOrder, 
  MaintenanceStage 
} from '../types';
import { SHOP_CONTACT_INFO } from '../data/mockData';
import { changeAdminPassword } from '../utils/auth';
import { 
  Building2, 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Phone, 
  Send, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Play, 
  LogOut, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Printer, 
  Search,
  Wrench,
  Car
} from 'lucide-react';

interface AdminPanelProps {
  vehicles: VehicleOrder[];
  onSimulateStatusAdvance: (orderId: string) => void;
  onLogout: () => void;
  onReturnToPublicSite: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  vehicles,
  onSimulateStatusAdvance,
  onLogout,
  onReturnToPublicSite,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'os-document' | 'security' | 'pricing'>('orders');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(vehicles[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Password change form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordInputs, setShowPasswordInputs] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // New note on current vehicle
  const [newLiveNote, setNewLiveNote] = useState('');

  const currentVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordFeedback(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordFeedback({
        type: 'error',
        message: 'Por favor, preencha todos os campos para alterar a senha.',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordFeedback({
        type: 'error',
        message: 'A nova senha e a confirmação não coincidem.',
      });
      return;
    }

    const result = changeAdminPassword(currentPassword, newPassword);
    if (result.success) {
      setPasswordFeedback({
        type: 'success',
        message: result.message,
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordFeedback({
        type: 'error',
        message: result.message,
      });
    }
  };

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in-50">
      
      {/* Top Admin Header Bar */}
      <div className="rounded-3xl border-3 border-amber-500 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1 text-xs font-black text-slate-950 shadow-sm uppercase tracking-wider">
                <Building2 className="h-4 w-4" />
                Painel do Administrador • Modo Oficina
              </span>
              <span className="rounded-full bg-emerald-500/20 border border-emerald-400 px-2.5 py-0.5 text-xs font-bold text-emerald-300 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                Sessão Autenticada
              </span>
            </div>
            
            <h1 className="font-heading text-2xl sm:text-4xl font-black tracking-tight text-white">
              Gestão da Oficina Jomano
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl">
              Área restrita aos administradores para controle de Ordens de Serviço, visualização completa de telefones e placas, espelho da OS e configurações de segurança da loja.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center shrink-0">
            <button
              onClick={onReturnToPublicSite}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 text-xs font-bold text-white transition-all backdrop-blur-xs active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Ver Site do Cliente</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 px-4 py-2.5 text-xs font-black text-white shadow-md transition-all active:scale-95"
            >
              <LogOut className="h-4 w-4" />
              <span>Sair do Modo Oficina</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-slate-800 pt-5">
          <button
            onClick={() => setActiveTab('orders')}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all ${
              activeTab === 'orders'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Car className="h-4 w-4" />
            <span>Ordens de Serviço ({vehicles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('os-document')}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all ${
              activeTab === 'os-document'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Espelho da OS Oficial</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all ${
              activeTab === 'security'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <KeyRound className="h-4 w-4" />
            <span>Segurança & Trocar Senha</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all ${
              activeTab === 'pricing'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Wrench className="h-4 w-4" />
            <span>Tabela de Preços & Contatos</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ORDENS DE SERVIÇO (FULL UNFILTERED SHOP ACCESS) */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          
          {/* Search bar and counter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border-2 border-slate-200">
            <div>
              <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
                Visão Completa dos Clientes & Veículos
              </span>
              <p className="text-xs text-slate-600 font-medium">
                Os dados de telefone e placa estão liberados exclusivamente para esta página.
              </p>
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por placa, cliente, OS ou modelo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2 text-xs font-semibold focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Vehicle Selector Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {filteredVehicles.map((vehicle) => {
              const isSelected = vehicle.id === currentVehicle?.id;
              return (
                <button
                  key={vehicle.id}
                  onClick={() => setSelectedVehicleId(vehicle.id)}
                  className={`flex items-center gap-2.5 rounded-2xl border-2 px-4 py-2.5 text-xs font-bold shrink-0 transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 text-slate-950 ring-2 ring-amber-400/30 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className="font-mono font-black text-blue-700">{vehicle.plate}</span>
                  <span className="truncate max-w-[130px]">{vehicle.vehicleModel}</span>
                  <span className="text-[10px] text-slate-500">({vehicle.ownerName.split(' ')[0]})</span>
                </button>
              );
            })}
          </div>

          {/* Current Vehicle Detailed Management Card */}
          {currentVehicle && (
            <div className="overflow-hidden rounded-3xl border-3 border-amber-400 bg-white shadow-lg">
              
              {/* Card Header with Unrestricted Vehicle & Owner Data */}
              <div className="bg-gradient-to-r from-amber-50/80 via-white to-amber-100/50 p-6 sm:p-8 border-b border-slate-200">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Photo & Original Plate */}
                  <div className="lg:col-span-4 relative">
                    <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-950 shadow-md">
                      <img
                        src={currentVehicle.imageUrl}
                        alt={currentVehicle.vehicleModel}
                        className="h-full w-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      
                      {/* Official Mercosul Plate (Uncensored) */}
                      <div className="absolute bottom-3 left-3 rounded-lg bg-white px-3 py-1.5 text-slate-950 shadow-md ring-1 ring-slate-900/30">
                        <div className="flex items-center gap-2">
                          <span className="rounded-xs bg-blue-700 px-1 py-0.5 text-[8px] font-black text-white uppercase">
                            Brasil
                          </span>
                          <span className="font-mono text-sm font-black tracking-widest text-slate-900">
                            {currentVehicle.plate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Complete Specs & Direct Contact Buttons */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-black text-blue-700 uppercase tracking-wider">
                            OS: {currentVehicle.id}
                          </span>
                          <span className="rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                            Entrada: {currentVehicle.entryDate}
                          </span>
                          <span className="rounded-md bg-amber-100 border border-amber-300 px-2 py-0.5 text-[10px] font-black text-amber-900 uppercase">
                            Liberado para a Loja
                          </span>
                        </div>

                        <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-slate-900">
                          {currentVehicle.vehicleModel}
                        </h2>

                        {/* Technical details tags */}
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                          <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-bold text-slate-700 border border-slate-200">
                            Marca: <strong className="text-slate-900">{currentVehicle.vehicleBrand}</strong>
                          </span>
                          <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-bold text-slate-700 border border-slate-200">
                            Ano: <strong className="text-slate-900">{currentVehicle.year}</strong>
                          </span>
                          <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-bold text-slate-700 border border-slate-200">
                            Cor: <strong className="text-slate-900">{currentVehicle.color}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Header Actions: Espelho da OS & Advance Stage */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveTab('os-document')}
                          className="inline-flex items-center gap-1.5 rounded-2xl bg-blue-600 hover:bg-blue-500 px-3.5 py-2.5 text-xs font-black text-white shadow-md active:scale-95 transition-all"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>Espelho da OS</span>
                        </button>

                        <button
                          onClick={() => onSimulateStatusAdvance(currentVehicle.id)}
                          className="inline-flex items-center gap-1.5 rounded-2xl bg-amber-500 hover:bg-amber-400 px-4 py-2.5 text-xs font-black text-slate-950 shadow-md active:scale-95 transition-all"
                        >
                          <Play className="h-3.5 w-3.5 fill-current" />
                          <span>Avançar Etapa da OS</span>
                        </button>
                      </div>
                    </div>

                    {/* OWNER DIRECT CONTACT BOX (EXCLUSIVE TO ADMIN) */}
                    <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/70 p-4 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                          <Phone className="h-4 w-4 text-emerald-700" />
                          Contato Direto do Proprietário (Visível apenas para a loja):
                        </span>
                        <span className="text-[11px] font-bold text-emerald-800">
                          Previsão: {currentVehicle.estimatedCompletion}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-emerald-200">
                        <div>
                          <span className="text-xs font-bold text-slate-500 block">Nome do Cliente:</span>
                          <span className="font-heading text-base font-black text-slate-900">
                            {currentVehicle.ownerName}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div>
                            <span className="text-[10px] font-bold text-slate-500 block">Telefone:</span>
                            <span className="font-mono text-sm font-black text-emerald-800">
                              {currentVehicle.ownerPhone}
                            </span>
                          </div>

                          <a
                            href={`tel:${currentVehicle.ownerPhone.replace(/\D/g, '')}`}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-3.5 py-2 text-xs font-black text-white shadow-xs transition-colors"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            <span>Ligar</span>
                          </a>

                          <a
                            href={`https://wa.me/55${currentVehicle.ownerPhone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-black text-white shadow-xs transition-colors"
                          >
                            <Send className="h-3.5 w-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Details & Replaced Parts */}
              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50">
                
                {/* Mechanic Log Notes */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-black uppercase text-slate-800 flex items-center gap-1.5">
                      <FileText className="h-4 w-4 text-blue-600" />
                      Diário de Bordo da Oficina
                    </span>
                    <span className="text-xs font-bold text-blue-700">
                      Mecânico: {currentVehicle.mechanicInCharge.name}
                    </span>
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {currentVehicle.liveNotes.map((note, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700 font-medium flex items-start gap-2 shadow-xs"
                      >
                        <span className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>

                  {/* Add note input */}
                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Adicionar nova observação da bancada..."
                      value={newLiveNote}
                      onChange={(e) => setNewLiveNote(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold focus:border-amber-500 focus:outline-none bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newLiveNote.trim()) {
                          currentVehicle.liveNotes.unshift(
                            `${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - ${newLiveNote.trim()}`
                          );
                          setNewLiveNote('');
                        }
                      }}
                      className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 text-xs font-black shrink-0"
                    >
                      Gravar
                    </button>
                  </div>
                </div>

                {/* Parts & Total Approved */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-black uppercase text-slate-800 flex items-center gap-1.5">
                      <Wrench className="h-4 w-4 text-emerald-600" />
                      Peças e Serviços Homologados
                    </span>
                    <span className="font-mono font-black text-emerald-700 text-sm">
                      Total: R$ {currentVehicle.totalEstimate.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {currentVehicle.partsList.map((part, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white text-xs shadow-xs"
                      >
                        <div>
                          <strong className="text-slate-900 block">{part.name}</strong>
                          <span className="text-[10px] text-slate-500 font-semibold">
                            Cód: {part.code} • Marca: {part.brand} • Qtd: {part.quantity}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-blue-700 block">
                            R$ {(part.unitPrice * part.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                          <span className="text-[10px] text-emerald-700 font-bold">
                            {part.warrantyMonths}m garantia
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ESPELHO DA ORDEM DE SERVIÇO (OFICIAL DA OFICINA) */}
      {activeTab === 'os-document' && (
        <div className="space-y-6">
          
          {/* OS Selector & Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
                Selecionar OS para Visualizar:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {vehicles.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVehicleId(v.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-black transition-all ${
                      selectedVehicleId === v.id
                        ? 'bg-amber-500 text-slate-950 shadow-xs ring-2 ring-amber-400'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {v.id} ({v.plate})
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-black text-white shadow-sm transition-all active:scale-95"
              >
                <Printer className="h-4 w-4" />
                <span>Imprimir Espelho da OS</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-800 transition-all shadow-xs"
              >
                <span>Voltar às Ordens</span>
              </button>
            </div>
          </div>

          {/* Official Document Sheet */}
          <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-xl border-2 border-slate-300 space-y-6 print:border-none print:shadow-none print:p-0">
            
            {/* Header of the OS Document */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-900 pb-5 gap-4">
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-blue-700 block">
                  Documento Oficial de Manutenção Automotiva • Espelho da OS
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-900">
                  {SHOP_CONTACT_INFO.name}
                </h2>
                <p className="text-xs text-slate-600 font-medium">
                  {SHOP_CONTACT_INFO.fullAddress}
                </p>
                <p className="text-xs text-slate-700 font-bold mt-1">
                  Telefones: 21-964122372 (WhatsApp) • Loja: 33811320 • Email: {SHOP_CONTACT_INFO.email}
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="rounded-lg bg-slate-900 px-3.5 py-1.5 text-sm font-mono font-black text-white block sm:inline-block shadow-xs">
                  {currentVehicle.id}
                </span>
                <span className="text-xs font-bold text-slate-500 block mt-1">
                  Data de Abertura: {currentVehicle.entryDate}
                </span>
                <span className="inline-block mt-1 text-[11px] font-black uppercase px-2.5 py-0.5 rounded border bg-amber-100 text-amber-900 border-amber-300">
                  VIA DA LOJA (DADOS COMPLETOS E LIBERADOS)
                </span>
              </div>
            </div>

            {/* Split Information Blocks: Vehicle & Owner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vehicle Data Box */}
              <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 block">
                  🚗 Dados do Veículo (Oficina)
                </span>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500 font-bold">Placa do Veículo:</span>
                    <span className="font-mono font-black text-blue-700 text-sm">
                      {currentVehicle.plate}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500 font-bold">Modelo:</span>
                    <span className="font-bold text-slate-900">{currentVehicle.vehicleModel}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500 font-bold">Marca:</span>
                    <span className="font-bold text-slate-900">{currentVehicle.vehicleBrand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Ano / Cor:</span>
                    <span className="font-bold text-slate-900">{currentVehicle.year} • {currentVehicle.color}</span>
                  </div>
                </div>
              </div>

              {/* Owner Data Box */}
              <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 block">
                  👤 Dados do Proprietário
                </span>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500 font-bold">Nome do Cliente:</span>
                    <span className="font-bold text-slate-900">{currentVehicle.ownerName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500 font-bold">Telefone de Contato:</span>
                    <span className="font-mono font-black text-emerald-800 text-sm">
                      {currentVehicle.ownerPhone}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500 font-bold">Previsão de Entrega:</span>
                    <span className="font-bold text-blue-700">{currentVehicle.estimatedCompletion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Status Atual:</span>
                    <span className="font-bold text-slate-900 uppercase">{currentVehicle.currentStage}</span>
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

            {/* Mechanic Notes / Diário de Bordo */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block uppercase">Diário de Bordo & Procedimentos Realizados:</span>
              <div className="space-y-1 text-slate-700 font-medium">
                {currentVehicle.liveNotes.map((note, nIdx) => (
                  <p key={nIdx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span>{note}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Document Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-200 pt-5 gap-4">
              <div className="text-xs text-slate-600 space-y-0.5">
                <p>Responsável Técnico: <strong className="text-slate-900">{currentVehicle.mechanicInCharge.name}</strong></p>
                <p className="text-[11px] text-slate-500">Jomano Centro Automotivo & Auto Serviço • Av. Vicente de Carvalho, 730</p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-black text-white shadow-md transition-all active:scale-95"
                >
                  <Printer className="h-4 w-4" />
                  <span>Imprimir Documento</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SEGURANÇA & LOCAL PARA TROCAR A SENHA DO ADMINISTRADOR */}
      {activeTab === 'security' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-md space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-slate-950 font-bold shadow-xs">
                  <KeyRound className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-900">
                    Alterar Senha do Administrador
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Configure uma nova credencial para proteger o acesso exclusivo ao Modo Oficina.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Explanation */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50/80 p-4 text-xs text-blue-900 space-y-1.5 leading-relaxed">
              <p className="font-extrabold flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-blue-700" />
                Controle de Segurança da Oficina:
              </p>
              <p>
                A senha de administrador garante que apenas a equipe autorizada da oficina acesse a gestão completa das Ordens de Serviço, laudos e contatos diretos.
              </p>
              <p className="font-bold text-blue-950">
                • A senha nunca é exibida na tela para clientes comuns e permanece salva de forma segura.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              
              {/* Current Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Senha Atual de Administrador:
                </label>
                <div className="relative">
                  <input
                    type={showPasswordInputs ? 'text' : 'password'}
                    placeholder="Digite a senha atual"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full rounded-xl border-2 border-slate-200 px-3.5 py-2.5 text-sm font-mono focus:border-amber-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordInputs(!showPasswordInputs)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    tabIndex={-1}
                  >
                    {showPasswordInputs ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nova Senha:
                  </label>
                  <input
                    type={showPasswordInputs ? 'text' : 'password'}
                    placeholder="Mínimo 4 caracteres"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-xl border-2 border-slate-200 px-3.5 py-2.5 text-sm font-mono focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirmar Nova Senha:
                  </label>
                  <input
                    type={showPasswordInputs ? 'text' : 'password'}
                    placeholder="Repita a nova senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border-2 border-slate-200 px-3.5 py-2.5 text-sm font-mono focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Feedback messages */}
              {passwordFeedback && (
                <div
                  className={`rounded-xl border p-3 text-xs font-bold flex items-center gap-2 ${
                    passwordFeedback.type === 'success'
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                      : 'border-red-300 bg-red-50 text-red-800'
                  }`}
                >
                  {passwordFeedback.type === 'success' ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                  )}
                  <span>{passwordFeedback.message}</span>
                </div>
              )}

              {/* Submit button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 hover:bg-amber-400 px-6 py-3 text-xs font-black text-slate-950 shadow-md active:scale-95 transition-all"
                >
                  Salvar Nova Senha de Administrador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: TABELA DE PREÇOS E CONTATOS OFICIAIS */}
      {activeTab === 'pricing' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Promo 1 */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 space-y-2 shadow-xs">
              <span className="rounded-md bg-blue-100 text-blue-800 px-2 py-0.5 text-[10px] font-black uppercase">
                Alinhamento & Balanceamento
              </span>
              <h3 className="font-heading text-lg font-black text-slate-900">
                Rodas de Ferro
              </h3>
              <p className="font-mono text-2xl font-black text-blue-700">
                R$ 140,00
              </p>
              <p className="text-xs text-slate-600 font-medium">
                Alinhamento dianteiro + 4 balanceamentos com chumbo de precisão.
              </p>
            </div>

            {/* Promo 2 */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 space-y-2 shadow-xs">
              <span className="rounded-md bg-red-100 text-red-800 px-2 py-0.5 text-[10px] font-black uppercase">
                Pneus Ecológicos
              </span>
              <h3 className="font-heading text-lg font-black text-slate-900">
                Pneu Piremax Aro 15
              </h3>
              <p className="font-mono text-2xl font-black text-red-600">
                R$ 280,00
              </p>
              <p className="text-xs text-slate-600 font-medium">
                Unidade com montagem e alta durabilidade e aderência.
              </p>
            </div>

            {/* Promo 3 */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 space-y-2 shadow-xs">
              <span className="rounded-md bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-black uppercase">
                Lubrificação Completa
              </span>
              <h3 className="font-heading text-lg font-black text-slate-900">
                Troca de Óleo + Filtro
              </h3>
              <p className="font-mono text-2xl font-black text-amber-700">
                R$ 255,00
              </p>
              <p className="text-xs text-slate-600 font-medium">
                Troca de óleo (04 litros) + filtro de óleo automotivo.
              </p>
            </div>
          </div>

          {/* Shop official contact details */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 space-y-4">
            <h3 className="font-heading text-lg font-black text-slate-900">
              Canais Oficiais de Atendimento da Oficina:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold block">WhatsApp da Loja:</span>
                <strong className="text-slate-900 text-sm font-mono font-black">21-964122372</strong>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold block">Telefone Fixo da Loja:</span>
                <strong className="text-slate-900 text-sm font-mono font-black">33811320</strong>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold block">E-mail da Loja:</span>
                <strong className="text-slate-900 text-xs font-bold block truncate">
                  jomanocentroautomotivo@gmail.com
                </strong>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold block">Observação Geral:</span>
                <strong className="text-slate-900 text-xs">Demais preços consultar</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
