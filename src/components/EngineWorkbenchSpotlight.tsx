import React, { useState } from 'react';
import { 
  Cpu, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Compass, 
  Flame, 
  FileBadge,
  ArrowRight,
  Info
} from 'lucide-react';
import { ENGINE_TEARDOWN_PARTS } from '../data/mockData';

interface EngineWorkbenchSpotlightProps {
  onScheduleEngineService: () => void;
}

export const EngineWorkbenchSpotlight: React.FC<EngineWorkbenchSpotlightProps> = ({
  onScheduleEngineService,
}) => {
  const [selectedPartId, setSelectedPartId] = useState(ENGINE_TEARDOWN_PARTS[0].id);

  const selectedPart = ENGINE_TEARDOWN_PARTS.find((p) => p.id === selectedPartId) || ENGINE_TEARDOWN_PARTS[0];

  return (
    <section id="engine-bench-section" className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-6 sm:p-10 shadow-2xl">
      {/* Decorative mechanical ambient glow */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-orange-600/10 blur-3xl"></div>

      {/* Badge of prominence */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            Diferencial em Destaque Exclusivo Jomano
          </div>
          <h2 className="mt-2 font-heading text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Motor Desmontado na Bancada de Precisão
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-slate-400 max-w-3xl">
            Reconstrução cirúrgica com metrologia digital, tolerâncias micrométricas e garantia de 1 ano ou 30.000 km.
          </p>
        </div>

        <button
          id="btn-schedule-engine-bench"
          onClick={onScheduleEngineService}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-105"
        >
          <span>Agendar Diagnóstico de Motor</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Main Grid: Workbench Visual Showcase + Interactive Metrology Panel */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Visual Engine Workbench Card (Featured Photo with details) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative group overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900 shadow-xl">
            {/* Real workbench photo */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1400&q=80"
                alt="Motor desmontado na bancada técnica de retífica da Jomano Oficina"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              {/* Status overlay */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="rounded-lg bg-slate-950/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/30">
                  🔬 Bancada Climatizada 20°C (Norma DIN)
                </span>
                <span className="rounded-lg bg-emerald-950/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  Garantia de 1 Ano / 30.000 km
                </span>
              </div>

              {/* Floating metrics badge on the photo */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    Processo Artesanal de Alta Engenharia
                  </span>
                  <p className="text-sm font-semibold text-white">
                    Desmontagem Integral, Banho Químico Ultrassônico & Magnaflux
                  </p>
                </div>
                <div className="rounded-lg bg-slate-900/90 border border-slate-700 px-3 py-1.5 text-right backdrop-blur">
                  <span className="text-[10px] text-slate-400 block">Precisão de Medição</span>
                  <span className="font-heading text-sm font-bold text-amber-400">0,001 mm</span>
                </div>
              </div>
            </div>

            {/* Quick workbench features row */}
            <div className="grid grid-cols-3 divide-x divide-slate-800 border-t border-slate-800 bg-slate-900/60 p-3 text-center text-xs">
              <div>
                <span className="block text-slate-400">Torque</span>
                <strong className="text-white font-medium">Torquímetro Digital</strong>
              </div>
              <div>
                <span className="block text-slate-400">Limpeza</span>
                <strong className="text-white font-medium">Cuba Ultrassônica</strong>
              </div>
              <div>
                <span className="block text-slate-400">Balanceamento</span>
                <strong className="text-white font-medium">Balança Analítica 0.1g</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Component & Metrology Breakdown */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-amber-400" />
                Exploração Interativa de Peças na Bancada
              </span>
              <span className="text-[11px] text-amber-400/90">Clique para inspecionar</span>
            </div>

            {/* Selector tabs */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              {ENGINE_TEARDOWN_PARTS.map((part) => {
                const isSelected = part.id === selectedPartId;
                return (
                  <button
                    key={part.id}
                    id={`btn-engine-part-${part.id}`}
                    onClick={() => setSelectedPartId(part.id)}
                    className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 text-white shadow-sm ring-1 ring-amber-500/30'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span className="block font-bold text-white truncate">{part.name.split('&')[0]}</span>
                    <span className="text-[10px] text-slate-400 truncate block">
                      Tol: {part.tolerance}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Component Details Box */}
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-heading text-base font-bold text-white">
                  {selectedPart.name}
                </h4>
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-300 ring-1 ring-amber-500/40">
                  {selectedPart.tolerance}
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {selectedPart.precisionDetail}
              </p>

              <div className="mt-3.5 space-y-2 border-t border-slate-800/80 pt-3 text-[11px]">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Compass className="h-3.5 w-3.5 text-amber-400" />
                    Método de Ensaio:
                  </span>
                  <span className="font-semibold text-slate-200">{selectedPart.inspectionType}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <FileBadge className="h-3.5 w-3.5 text-emerald-400" />
                    Laudo Técnico Emitido:
                  </span>
                  <span className="font-semibold text-emerald-400">Entregue com o Veículo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pillars of trust box */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Peças Genuínas</span>
                  <span className="text-[11px] text-slate-400">Mahle, KS, Metal Leve & Elring</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Fotos da Bancada</span>
                  <span className="text-[11px] text-slate-400">Enviadas direto no WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
