import React, { useState } from 'react';
import { 
  RepairHistoryRecord 
} from '../types';
import { 
  History, 
  Search, 
  ShieldCheck, 
  Calendar, 
  Gauge, 
  CheckCircle, 
  FileText, 
  Wrench, 
  X, 
  Printer,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { SHOP_CONTACT_INFO } from '../data/mockData';

interface RepairHistoryProps {
  historyRecords: RepairHistoryRecord[];
  onOpenBookingForVehicle?: (plate: string, model: string) => void;
  isShopMode?: boolean;
}

export const RepairHistory: React.FC<RepairHistoryProps> = ({
  historyRecords,
  onOpenBookingForVehicle,
  isShopMode = false,
}) => {
  const [filterPlate, setFilterPlate] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecordForModal, setSelectedRecordForModal] = useState<RepairHistoryRecord | null>(null);

  const maskPlate = (plate: string): string => {
    if (isShopMode) return plate;
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

  const uniquePlates: string[] = Array.from(new Set(historyRecords.map((r) => r.plate)));

  const filteredRecords = historyRecords.filter((record) => {
    const matchesPlate = filterPlate === 'ALL' || record.plate === filterPlate;
    const matchesQuery =
      record.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.mainService.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.osNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlate && matchesQuery;
  });

  return (
    <section id="history-section" className="space-y-6">
      {/* Header with Title and Search Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-blue-700">
            <History className="h-3.5 w-3.5" />
            Prontuário Digital do Veículo
          </div>
          <h2 className="mt-1.5 font-heading text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Histórico de Reparos & Garantias
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Consulte intervenções anteriores, alinhamentos, peças substituídas e laudos técnicos da unidade Vicente de Carvalho.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick plate filter buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-xs sm:max-w-none">
            <button
              onClick={() => setFilterPlate('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                filterPlate === 'ALL'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-400'
              }`}
            >
              Todos
            </button>
            {uniquePlates.map((plate) => (
              <button
                key={plate}
                onClick={() => setFilterPlate(plate)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-black transition-all ${
                  filterPlate === plate
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-400'
                }`}
              >
                {maskPlate(plate)}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar serviço ou OS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* History Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRecords.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <p className="text-slate-500 font-semibold text-sm">Nenhum registro de reparo encontrado para os filtros selecionados.</p>
          </div>
        ) : (
          filteredRecords.map((record) => (
            <div
              key={record.id}
              className="group overflow-hidden rounded-3xl border-3 border-slate-200 hover:border-blue-600 bg-white transition-all shadow-lg hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Card top banner with vehicle photo */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                <img
                  src={record.vehiclePhoto}
                  alt={record.vehicleModel}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="rounded-md bg-white px-2 py-0.5 font-mono text-xs font-black tracking-wider text-slate-950 shadow">
                    {maskPlate(record.plate)}
                  </span>
                  <span className="rounded-md bg-slate-900/80 backdrop-blur px-2 py-0.5 text-[11px] font-bold text-white border border-slate-700">
                    {record.osNumber}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-black text-white shadow flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {record.status}
                  </span>
                </div>

                {/* Vehicle model title over image bottom */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-heading text-lg font-black truncate drop-shadow">
                    {record.vehicleModel}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-200 mt-0.5 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-yellow-300" />
                      {record.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Gauge className="h-3 w-3 text-yellow-300" />
                      {record.mileage.toLocaleString()} km
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body: Services & Replaced Parts summary */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start gap-2">
                    <Wrench className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Intervenção Principal
                      </span>
                      <p className="text-sm font-black text-slate-900 leading-snug">
                        {record.mainService}
                      </p>
                    </div>
                  </div>

                  {/* Replaced parts preview */}
                  <div className="mt-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2 font-bold">
                      <span className="uppercase tracking-wider">Peças & Insumos Utilizados</span>
                      <span>{record.replacedParts.length} itens</span>
                    </div>
                    <div className="space-y-1.5">
                      {record.replacedParts.slice(0, 2).map((part, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-slate-800 font-medium truncate max-w-[200px]">
                            • {part.name}
                          </span>
                          <span className="text-slate-500 text-[11px] font-mono font-bold">
                            {part.brand}
                          </span>
                        </div>
                      ))}
                      {record.replacedParts.length > 2 && (
                        <span className="text-[10px] text-blue-700 font-bold block pt-1">
                          + {record.replacedParts.length - 2} outros componentes instalados
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer of card */}
                <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">Total Investido</span>
                    <span className="font-heading text-lg font-black text-slate-900">
                      R$ {record.totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <button
                    id={`btn-view-receipt-${record.id}`}
                    onClick={() => setSelectedRecordForModal(record)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 hover:bg-white px-3.5 py-2 text-xs font-black text-slate-900 transition-all hover:border-blue-600 shadow-xs"
                  >
                    <FileText className="h-3.5 w-3.5 text-blue-600" />
                    <span>Ver Laudo & Recibo</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detailed Receipt & Technical Inspection Modal */}
      {selectedRecordForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
                  {SHOP_CONTACT_INFO.name} • {SHOP_CONTACT_INFO.address}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900">
                  Laudo Técnico & Recibo de Garantia
                </h3>
                <p className="text-xs text-slate-500 font-mono font-bold">
                  {selectedRecordForModal.osNumber} • Emitido em {selectedRecordForModal.date} ({SHOP_CONTACT_INFO.locationShort})
                </p>
              </div>
              <button
                onClick={() => setSelectedRecordForModal(null)}
                className="rounded-xl border border-slate-200 bg-slate-100 p-2 text-slate-500 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Vehicle & Client Info row */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Veículo</span>
                <strong className="text-slate-900 font-extrabold">{selectedRecordForModal.vehicleModel}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Placa</span>
                <strong className="text-blue-700 font-mono font-black">{maskPlate(selectedRecordForModal.plate)}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Odômetro</span>
                <strong className="text-slate-900 font-bold">{selectedRecordForModal.mileage.toLocaleString()} km</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Responsável</span>
                <strong className="text-slate-900 font-bold">{selectedRecordForModal.mechanicName}</strong>
              </div>
            </div>

            {/* Services Performed */}
            <div className="mt-5 space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                Serviços & Procedimentos Executados
              </span>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-2 text-xs text-slate-700">
                {selectedRecordForModal.allServices.map((srv, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-semibold">{srv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Replaced Parts Breakdown Table */}
            <div className="mt-5 space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                Discriminação de Peças e Garantia
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-slate-100 text-[11px] font-black text-slate-600 uppercase">
                    <tr>
                      <th className="p-3">Item / Código</th>
                      <th className="p-3">Marca</th>
                      <th className="p-3 text-center">Qtd</th>
                      <th className="p-3 text-right">Unitário</th>
                      <th className="p-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {selectedRecordForModal.replacedParts.map((p, pIndex) => (
                      <tr key={pIndex} className="hover:bg-slate-50">
                        <td className="p-3">
                          <span className="font-bold text-slate-900 block">{p.name}</span>
                          <span className="font-mono text-[10px] text-slate-500 font-semibold">Cód: {p.code} (Garantia: {p.warrantyMonths}m)</span>
                        </td>
                        <td className="p-3 text-slate-600 font-medium">{p.brand}</td>
                        <td className="p-3 text-center font-bold">{p.quantity}</td>
                        <td className="p-3 text-right font-mono">
                          R$ {p.unitPrice.toFixed(2)}
                        </td>
                        <td className="p-3 text-right font-mono font-black text-slate-900">
                          R$ {(p.unitPrice * p.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Technical Observation */}
            <div className="mt-5 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs text-slate-700">
              <span className="font-black text-amber-900 block mb-1">Observações do Mestre da Oficina:</span>
              <p className="font-medium">{selectedRecordForModal.observations}</p>
              <div className="mt-2 text-[11px] text-emerald-800 font-bold">
                🛡️ Garantia de Mão de Obra e Peças válida até: {selectedRecordForModal.warrantyUntil}
              </div>
            </div>

            {/* Total and Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4">
              <div>
                <span className="text-xs text-slate-500 block font-bold uppercase">Valor Total Liquidado</span>
                <span className="font-heading text-2xl font-black text-slate-900">
                  R$ {selectedRecordForModal.totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-all shadow-xs"
                >
                  <Printer className="h-4 w-4 text-slate-500" />
                  <span>Imprimir / Salvar PDF</span>
                </button>
                <button
                  onClick={() => setSelectedRecordForModal(null)}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-black text-white hover:bg-blue-700 transition-all shadow-sm"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
