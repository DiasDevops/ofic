import React, { useState } from 'react';
import { 
  RepairHistoryRecord, 
  ReplacedPart 
} from '../types';
import { 
  History, 
  Search, 
  ShieldCheck, 
  Calendar, 
  Gauge, 
  CheckCircle, 
  FileText, 
  Download, 
  Wrench, 
  X, 
  Printer,
  ChevronRight
} from 'lucide-react';
import { SHOP_CONTACT_INFO } from '../data/mockData';

interface RepairHistoryProps {
  historyRecords: RepairHistoryRecord[];
  onOpenBookingForVehicle?: (plate: string, model: string) => void;
}

export const RepairHistory: React.FC<RepairHistoryProps> = ({
  historyRecords,
  onOpenBookingForVehicle,
}) => {
  const [filterPlate, setFilterPlate] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecordForModal, setSelectedRecordForModal] = useState<RepairHistoryRecord | null>(null);

  // Extract unique plates
  const uniquePlates = Array.from(new Set(historyRecords.map((r) => r.plate)));

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
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-400">
            <History className="h-3.5 w-3.5" />
            Prontuário Digital do Veículo
          </div>
          <h2 className="mt-1.5 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Histórico Completo de Reparos & Garantias
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Consulte intervenções anteriores, peças trocadas com número de série, laudos técnicos e validade de garantia.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick plate filter buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-xs sm:max-w-none">
            <button
              onClick={() => setFilterPlate('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterPlate === 'ALL'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              Todos
            </button>
            {uniquePlates.map((plate) => (
              <button
                key={plate}
                onClick={() => setFilterPlate(plate)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  filterPlate === plate
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {plate}
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
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* History Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRecords.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
            <p className="text-slate-400 text-sm">Nenhum registro de reparo encontrado para os filtros selecionados.</p>
          </div>
        ) : (
          filteredRecords.map((record) => (
            <div
              key={record.id}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 hover:border-amber-500/50 transition-all shadow-xl flex flex-col justify-between"
            >
              {/* Card top banner with vehicle photo */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                <img
                  src={record.vehiclePhoto}
                  alt={record.vehicleModel}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="rounded-md bg-white px-2 py-0.5 font-mono text-xs font-black tracking-wider text-slate-950 shadow">
                    {record.plate}
                  </span>
                  <span className="rounded-md bg-slate-950/80 backdrop-blur px-2 py-0.5 text-[11px] font-semibold text-slate-200 border border-slate-700">
                    {record.osNumber}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="rounded-lg bg-emerald-950/90 backdrop-blur px-2.5 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {record.status}
                  </span>
                </div>

                {/* Vehicle model title over image bottom */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-heading text-lg font-bold text-white truncate drop-shadow">
                    {record.vehicleModel}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-300 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-amber-400" />
                      {record.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Gauge className="h-3 w-3 text-amber-400" />
                      {record.mileage.toLocaleString()} km
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body: Services & Replaced Parts summary */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start gap-2">
                    <Wrench className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Intervenção Principal
                      </span>
                      <p className="text-sm font-bold text-white leading-snug">
                        {record.mainService}
                      </p>
                    </div>
                  </div>

                  {/* Replaced parts preview */}
                  <div className="mt-3.5 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                      <span className="font-semibold uppercase tracking-wider">Peças & Insumos Utilizados</span>
                      <span>{record.replacedParts.length} itens</span>
                    </div>
                    <div className="space-y-1.5">
                      {record.replacedParts.slice(0, 2).map((part, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-slate-300 truncate max-w-[200px]">
                            • {part.name}
                          </span>
                          <span className="text-slate-400 text-[11px] font-mono">
                            {part.brand}
                          </span>
                        </div>
                      ))}
                      {record.replacedParts.length > 2 && (
                        <span className="text-[10px] text-amber-400 font-medium block pt-1">
                          + {record.replacedParts.length - 2} outros componentes instalados
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer of card */}
                <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Total Investido</span>
                    <span className="font-heading text-base font-bold text-amber-400">
                      R$ {record.totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <button
                    id={`btn-view-receipt-${record.id}`}
                    onClick={() => setSelectedRecordForModal(record)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-bold text-white hover:bg-slate-700 hover:border-amber-500/50 transition-all"
                  >
                    <FileText className="h-3.5 w-3.5 text-amber-400" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {SHOP_CONTACT_INFO.name}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                  Laudo Técnico & Recibo de Garantia
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {selectedRecordForModal.osNumber} • Emitido em {selectedRecordForModal.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedRecordForModal(null)}
                className="rounded-xl border border-slate-700 bg-slate-800 p-2 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Vehicle & Client Info row */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl border border-slate-800 bg-slate-950/60 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Veículo</span>
                <strong className="text-white font-medium">{selectedRecordForModal.vehicleModel}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Placa</span>
                <strong className="text-amber-400 font-mono">{selectedRecordForModal.plate}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Odômetro</span>
                <strong className="text-white">{selectedRecordForModal.mileage.toLocaleString()} km</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Responsável</span>
                <strong className="text-white">{selectedRecordForModal.mechanicName}</strong>
              </div>
            </div>

            {/* Services Performed */}
            <div className="mt-5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Serviços & Procedimentos Executados
              </span>
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 space-y-1.5 text-xs text-slate-300">
                {selectedRecordForModal.allServices.map((srv, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{srv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Replaced Parts Breakdown Table */}
            <div className="mt-5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Discriminação de Peças e Garantia
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 bg-slate-900/80 text-[11px] text-slate-400 uppercase">
                    <tr>
                      <th className="p-2.5">Item / Código</th>
                      <th className="p-2.5">Marca</th>
                      <th className="p-2.5 text-center">Qtd</th>
                      <th className="p-2.5 text-right">Unitário</th>
                      <th className="p-2.5 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {selectedRecordForModal.replacedParts.map((p, pIndex) => (
                      <tr key={pIndex} className="hover:bg-slate-900/40">
                        <td className="p-2.5">
                          <span className="font-semibold text-white block">{p.name}</span>
                          <span className="font-mono text-[10px] text-slate-500">Cód: {p.code} (Garantia: {p.warrantyMonths}m)</span>
                        </td>
                        <td className="p-2.5 text-slate-400">{p.brand}</td>
                        <td className="p-2.5 text-center">{p.quantity}</td>
                        <td className="p-2.5 text-right font-mono">
                          R$ {p.unitPrice.toFixed(2)}
                        </td>
                        <td className="p-2.5 text-right font-mono font-bold text-slate-100">
                          R$ {(p.unitPrice * p.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Technical Observation */}
            <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 text-xs text-slate-300">
              <span className="font-bold text-amber-400 block mb-1">Observações do Mestre da Oficina:</span>
              <p>{selectedRecordForModal.observations}</p>
              <div className="mt-2 text-[11px] text-emerald-400 font-semibold">
                🛡️ Garantia de Mão de Obra e Peças válida até: {selectedRecordForModal.warrantyUntil}
              </div>
            </div>

            {/* Total and Print Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-4">
              <div>
                <span className="text-xs text-slate-400 block">Valor Total Liquidado</span>
                <span className="font-heading text-2xl font-bold text-amber-400">
                  R$ {selectedRecordForModal.totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition-all"
                >
                  <Printer className="h-4 w-4 text-slate-400" />
                  <span>Imprimir / Salvar PDF</span>
                </button>
                <button
                  onClick={() => setSelectedRecordForModal(null)}
                  className="rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-all"
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
