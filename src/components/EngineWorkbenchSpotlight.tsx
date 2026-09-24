import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Compass, 
  FileBadge,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Wrench
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
    <section id="engine-bench-section" className="relative overflow-hidden rounded-3xl border-2 border-amber-400 bg-white p-6 sm:p-10 shadow-xl">
      {/* Decorative ambient light */}
      <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-yellow-100/60 blur-3xl" />

      {/* Header of section */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400 bg-amber-50 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-800 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            Diferencial em Destaque Exclusivo Jomano
          </div>
          <h2 className="mt-2 font-heading text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            Motor Desmontado na Bancada de Precisão
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-slate-600 font-medium max-w-3xl">
            Reconstrução cirúrgica com metrologia digital, tolerâncias micrométricas e garantia de 1 ano ou 30.000 km na Av. Vicente de Carvalho, 730.
          </p>
        </div>

        <button
          id="btn-schedule-engine-bench"
          onClick={onScheduleEngineService}
          className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 shadow-md shadow-amber-500/20 active:scale-95 transition-all hover:scale-105"
        >
          <span>Agendar Diagnóstico de Motor</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Main Grid: Workbench Visual Showcase + Interactive Metrology Panel */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Visual Engine Workbench Card */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative group overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-900 shadow-xl">
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1400&q=80"
                alt="Motor desmontado na bancada técnica de retífica da Jomano Oficina"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Status overlay */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="rounded-lg bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-black text-slate-900 border border-slate-200 shadow-sm">
                  🔬 Bancada Climatizada 20°C (Norma DIN)
                </span>
                <span className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-black text-white shadow-sm flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Garantia de 1 Ano / 30.000 km
                </span>
              </div>

              {/* Floating metrics badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-yellow-300">
                    Engenharia & Retífica no Pátio Jomano
                  </span>
                  <p className="text-sm font-bold drop-shadow">
                    Desmontagem Integral, Banho Químico Ultrassônico & Magnaflux
                  </p>
                </div>
                <div className="rounded-xl bg-slate-900/90 border border-slate-700 px-3 py-1.5 text-right backdrop-blur shadow-lg">
                  <span className="text-[10px] text-slate-300 block font-semibold">Precisão Micrométrica</span>
                  <span className="font-heading text-sm font-black text-amber-400">0,001 mm</span>
                </div>
              </div>
            </div>

            {/* Quick workbench features row */}
            <div className="grid grid-cols-3 divide-x divide-slate-200 border-t border-slate-200 bg-white p-3.5 text-center text-xs">
              <div>
                <span className="block text-slate-500 font-semibold">Aperto Angular</span>
                <strong className="text-slate-900 font-extrabold">Torquímetro Digital</strong>
              </div>
              <div>
                <span className="block text-slate-500 font-semibold">Limpeza Técnica</span>
                <strong className="text-slate-900 font-extrabold">Cuba Ultrassônica</strong>
              </div>
              <div>
                <span className="block text-slate-500 font-semibold">Balanceamento</span>
                <strong className="text-slate-900 font-extrabold">Balança 0.1g</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Component & Metrology Breakdown */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
          <div className="rounded-2xl border-2 border-slate-200 bg-slate-50/70 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-amber-600" />
                Componentes Inspecionados na Bancada
              </span>
              <span className="text-[11px] font-bold text-amber-700">Clique para inspecionar</span>
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
                    className={`text-left p-3 rounded-xl border-2 text-xs font-bold transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-100/70 text-slate-950 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
                    }`}
                  >
                    <span className="block font-black text-slate-900 truncate">{part.name.split('&')[0]}</span>
                    <span className="text-[10px] text-amber-700 font-extrabold truncate block">
                      Tol: {part.tolerance}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Component Details Box */}
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h4 className="font-heading text-base font-black text-slate-900">
                  {selectedPart.name}
                </h4>
                <span className="rounded-lg bg-amber-100 px-2.5 py-0.5 text-[11px] font-black text-amber-800 border border-amber-300">
                  {selectedPart.tolerance}
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-600 leading-relaxed font-medium">
                {selectedPart.precisionDetail}
              </p>

              <div className="mt-3.5 space-y-2 border-t border-slate-100 pt-3 text-[11px]">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Compass className="h-3.5 w-3.5 text-amber-600" />
                    Método de Ensaio:
                  </span>
                  <span className="font-bold text-slate-900">{selectedPart.inspectionType}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 font-bold">
                    <FileBadge className="h-3.5 w-3.5 text-emerald-600" />
                    Laudo Técnico Emitido:
                  </span>
                  <span className="font-black text-emerald-700">Entregue com o Veículo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pillars of trust box */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-black text-slate-900 block">Peças Genuínas</span>
                  <span className="text-[11px] text-slate-500 font-semibold">Mahle, Metal Leve & Sabó</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-black text-slate-900 block">Fotos no WhatsApp</span>
                  <span className="text-[11px] text-slate-500 font-semibold">(21) 96412-2372</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
