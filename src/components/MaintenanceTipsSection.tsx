import React, { useState, useEffect, useRef } from 'react';
import { MaintenanceTip } from '../types';
import { MAINTENANCE_TIPS, SHOP_CONTACT_INFO } from '../data/mockData';
import { 
  Lightbulb, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Disc, 
  Droplet, 
  Wrench, 
  ShieldCheck, 
  Flame, 
  Zap, 
  Gauge, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  ArrowRight,
  BookOpen,
  LayoutGrid,
  SlidersHorizontal,
  X
} from 'lucide-react';

interface MaintenanceTipsSectionProps {
  onScheduleServiceWithTitle?: (serviceTitle?: string) => void;
}

export const MaintenanceTipsSection: React.FC<MaintenanceTipsSectionProps> = ({
  onScheduleServiceWithTitle,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [selectedTipForModal, setSelectedTipForModal] = useState<MaintenanceTip | null>(null);
  const [progress, setProgress] = useState(0);

  const ROTATION_INTERVAL_MS = 5500;
  const progressStepRef = useRef<number | null>(null);

  const categories = [
    { id: 'todos', label: 'Todas as Dicas' },
    { id: 'pneus', label: 'Pneus & Calibragem' },
    { id: 'oleo', label: 'Óleo & Lubrificação' },
    { id: 'freios', label: 'Freios & Pastilhas' },
    { id: 'motor', label: 'Motor na Bancada' },
    { id: 'arrefecimento', label: 'Arrefecimento' },
    { id: 'eletrica', label: 'Elétrica & Bateria' },
  ];

  const filteredTips = activeCategory === 'todos'
    ? MAINTENANCE_TIPS
    : MAINTENANCE_TIPS.filter((t) => t.category === activeCategory);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
    setProgress(0);
  }, [activeCategory]);

  // Auto-play timer for rotating cards
  useEffect(() => {
    if (!isAutoPlaying || filteredTips.length <= 1 || viewMode === 'grid') {
      setProgress(0);
      return;
    }

    const intervalTime = 50; // update progress every 50ms
    const stepIncrement = (intervalTime / ROTATION_INTERVAL_MS) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((current) => (current + 1) % filteredTips.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isAutoPlaying, filteredTips.length, viewMode]);

  const handleNext = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % filteredTips.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + filteredTips.length) % filteredTips.length);
  };

  const renderIcon = (name: MaintenanceTip['iconName'], className: string = 'h-5 w-5') => {
    switch (name) {
      case 'disc':
        return <Disc className={className} />;
      case 'droplet':
        return <Droplet className={className} />;
      case 'wrench':
        return <Wrench className={className} />;
      case 'shield':
        return <ShieldCheck className={className} />;
      case 'flame':
        return <Flame className={className} />;
      case 'zap':
        return <Zap className={className} />;
      case 'gauge':
      default:
        return <Gauge className={className} />;
    }
  };

  const getVividTheme = (category: MaintenanceTip['category']) => {
    switch (category) {
      case 'pneus':
        return {
          border: 'border-blue-500 hover:border-blue-600',
          topBar: 'bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600',
          badge: 'bg-blue-600 text-white',
          iconBg: 'bg-blue-600 text-white shadow-blue-500/40',
          lightBg: 'bg-blue-50/80 border-blue-200 text-blue-900',
          textAccent: 'text-blue-700',
          glow: 'group-hover:shadow-blue-500/20',
        };
      case 'oleo':
        return {
          border: 'border-amber-500 hover:border-amber-600',
          topBar: 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500',
          badge: 'bg-amber-600 text-white',
          iconBg: 'bg-amber-600 text-white shadow-amber-500/40',
          lightBg: 'bg-amber-50/80 border-amber-200 text-amber-950',
          textAccent: 'text-amber-700',
          glow: 'group-hover:shadow-amber-500/20',
        };
      case 'freios':
        return {
          border: 'border-red-500 hover:border-red-600',
          topBar: 'bg-gradient-to-r from-red-600 via-rose-500 to-red-700',
          badge: 'bg-red-600 text-white',
          iconBg: 'bg-red-600 text-white shadow-red-500/40',
          lightBg: 'bg-red-50/80 border-red-200 text-red-950',
          textAccent: 'text-red-700',
          glow: 'group-hover:shadow-red-500/20',
        };
      case 'arrefecimento':
        return {
          border: 'border-purple-500 hover:border-purple-600',
          topBar: 'bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600',
          badge: 'bg-purple-600 text-white',
          iconBg: 'bg-purple-600 text-white shadow-purple-500/40',
          lightBg: 'bg-purple-50/80 border-purple-200 text-purple-950',
          textAccent: 'text-purple-700',
          glow: 'group-hover:shadow-purple-500/20',
        };
      case 'motor':
        return {
          border: 'border-orange-500 hover:border-orange-600',
          topBar: 'bg-gradient-to-r from-orange-600 via-amber-500 to-red-600',
          badge: 'bg-orange-600 text-white',
          iconBg: 'bg-orange-600 text-white shadow-orange-500/40',
          lightBg: 'bg-orange-50/80 border-orange-200 text-orange-950',
          textAccent: 'text-orange-700',
          glow: 'group-hover:shadow-orange-500/20',
        };
      case 'eletrica':
      default:
        return {
          border: 'border-emerald-500 hover:border-emerald-600',
          topBar: 'bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600',
          badge: 'bg-emerald-600 text-white',
          iconBg: 'bg-emerald-600 text-white shadow-emerald-500/40',
          lightBg: 'bg-emerald-50/80 border-emerald-200 text-emerald-950',
          textAccent: 'text-emerald-700',
          glow: 'group-hover:shadow-emerald-500/20',
        };
    }
  };

  // Visible tips for carousel (current + 1 or 2 ahead)
  const currentTip = filteredTips[currentIndex] || filteredTips[0];
  const nextTip = filteredTips[(currentIndex + 1) % filteredTips.length];
  const thirdTip = filteredTips[(currentIndex + 2) % filteredTips.length];

  return (
    <section id="maintenance-tips-section" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-amber-400 bg-amber-50 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-800 shadow-sm">
            <Lightbulb className="h-4 w-4 text-amber-600 animate-bounce" />
            <span>Educação Automotiva • Pátio Jomano Vicente de Carvalho, 730</span>
          </div>

          <h2 className="mt-2 font-heading text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
            Dicas de Manutenção Preventiva
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-slate-600 font-medium max-w-3xl">
            Aprenda os cuidados essenciais com a calibragem de pneus, óleo 15w40, fluido de freio e motor. 
            Prevenção técnica que evita guinchos e garante a máxima vida útil do seu carro no Rio de Janeiro.
          </p>
        </div>

        {/* View Switcher and Play/Pause */}
        <div className="flex items-center gap-2">
          {viewMode === 'carousel' && (
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="inline-flex items-center gap-1.5 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 hover:border-blue-500 hover:text-blue-700 shadow-xs transition-all"
              title={isAutoPlaying ? 'Pausar rotação automática' : 'Retomar rotação automática'}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5 text-amber-600" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 text-emerald-600 fill-emerald-600" />
                  <span>Girar</span>
                </>
              )}
            </button>
          )}

          <div className="flex items-center rounded-xl border-2 border-slate-200 bg-white p-1 shadow-xs">
            <button
              onClick={() => setViewMode('carousel')}
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-black transition-all ${
                viewMode === 'carousel'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Rotativo</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-black transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Grade Completa</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`tip-category-${cat.id}`}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-xl px-3.5 py-2 text-xs font-black shrink-0 transition-all ${
              activeCategory === cat.id
                ? 'bg-red-600 text-white shadow-md shadow-red-600/25 ring-2 ring-red-600/20'
                : 'border-2 border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Progress Bar for Rotation (when in carousel mode) */}
      {viewMode === 'carousel' && isAutoPlaying && filteredTips.length > 1 && (
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200">
          <div
            className="bg-gradient-to-r from-red-600 via-amber-500 to-blue-600 h-full transition-all duration-75 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* CAROUSEL VIEW: Cards Rotativos */}
      {viewMode === 'carousel' && (
        <div className="relative">
          {/* Main Showcase Grid: Primary Active Card + Previews */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Primary Featured Tip Card (Larger, High Detail) */}
            {currentTip && (() => {
              const theme = getVividTheme(currentTip.category);
              return (
                <div
                  key={currentTip.id}
                  className={`lg:col-span-8 group relative flex flex-col justify-between overflow-hidden rounded-3xl border-3 ${theme.border} bg-white shadow-xl hover:shadow-2xl transition-all duration-300`}
                >
                  {/* Vivid Top Rainbow Accent Line */}
                  <div className={`h-2.5 w-full ${theme.topBar}`} />

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    {/* Top Row: Category, Frequency and Direct Icon */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.iconBg} shadow-md`}>
                          {renderIcon(currentTip.iconName, 'h-6 w-6')}
                        </div>
                        <div>
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                            {currentTip.categoryLabel}
                          </span>
                          <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                            {currentTip.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700">
                        <Calendar className="h-3.5 w-3.5 text-blue-600" />
                        <span>Frequência: <strong className="text-slate-900">{currentTip.frequency}</strong></span>
                      </div>
                    </div>

                    {/* Short Practical Advice */}
                    <div className={`rounded-2xl border p-4 ${theme.lightBg}`}>
                      <span className="text-[10px] font-black uppercase tracking-wider block opacity-75 mb-1 flex items-center gap-1.5">
                        <Lightbulb className="h-3.5 w-3.5" />
                        Recomendação Prática Jomano
                      </span>
                      <p className="text-sm sm:text-base font-bold leading-relaxed">
                        "{currentTip.shortAdvice}"
                      </p>
                    </div>

                    {/* Technical Explanation & Risk */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <span className="text-[11px] font-black text-slate-900 flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          Como funciona na prática:
                        </span>
                        <p className="text-slate-600 leading-relaxed font-medium">
                          {currentTip.fullExplanation}
                        </p>
                      </div>

                      <div className="space-y-1.5 rounded-2xl border border-red-200 bg-red-50/60 p-4">
                        <span className="text-[11px] font-black text-red-700 flex items-center gap-1.5">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          Risco se for ignorado:
                        </span>
                        <p className="text-red-900 leading-relaxed font-semibold">
                          {currentTip.riskIfIgnored}
                        </p>
                      </div>
                    </div>

                    {/* Pro Tip Callout */}
                    <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/70 p-4 flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-amber-400 text-slate-950 shrink-0 mt-0.5">
                        <Lightbulb className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 block">
                          Dica de Ouro dos Mecânicos da Loja
                        </span>
                        <p className="text-xs text-slate-800 font-semibold leading-relaxed mt-0.5">
                          {currentTip.proTip}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action CTAs */}
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {currentTip.relatedServiceTitle && (
                          <button
                            id={`btn-schedule-from-tip-${currentTip.id}`}
                            onClick={() => onScheduleServiceWithTitle?.(currentTip.relatedServiceTitle)}
                            className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 px-4 py-2.5 text-xs font-black text-slate-950 shadow-md shadow-yellow-500/20 active:scale-95 transition-all hover:scale-105"
                          >
                            <Wrench className="h-4 w-4" />
                            <span>Agendar: {currentTip.relatedServiceTitle}</span>
                          </button>
                        )}

                        <a
                          href={`https://wa.me/${SHOP_CONTACT_INFO.whatsappRaw}?text=${encodeURIComponent(
                            `Olá Jomano! Li a dica sobre "${currentTip.title}" no aplicativo e gostaria de agendar uma checagem preventiva no meu veículo.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border-2 border-emerald-600 bg-white hover:bg-emerald-50 px-3.5 py-2 text-xs font-black text-emerald-700 shadow-xs transition-all"
                        >
                          <Send className="h-3.5 w-3.5" />
                          <span>Dúvida no WhatsApp</span>
                        </a>
                      </div>

                      <button
                        onClick={() => setSelectedTipForModal(currentTip)}
                        className="inline-flex items-center gap-1 text-xs font-black text-blue-700 hover:text-blue-900 hover:underline"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>Ver Laudo Completo</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Side Column: Next In Rotation Cards (Interactive mini cards) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-blue-600" />
                  Próximas Dicas no Giro ({currentIndex + 1} de {filteredTips.length})
                </span>

                {/* Arrow navigation buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-xl border-2 border-slate-200 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-700 shadow-xs active:scale-90 transition-all"
                    aria-label="Dica anterior"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-xl border-2 border-slate-200 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-700 shadow-xs active:scale-90 transition-all"
                    aria-label="Próxima dica"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Next Tip Card preview */}
              {nextTip && (() => {
                const theme = getVividTheme(nextTip.category);
                return (
                  <div
                    onClick={() => {
                      setCurrentIndex((currentIndex + 1) % filteredTips.length);
                      setProgress(0);
                    }}
                    className={`cursor-pointer rounded-2xl border-2 ${theme.border} bg-white p-4 shadow-md hover:shadow-xl transition-all group flex-1 flex flex-col justify-between`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl ${theme.iconBg}`}>
                          {renderIcon(nextTip.iconName, 'h-4 w-4')}
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                            {nextTip.categoryLabel}
                          </span>
                          <h4 className="font-heading text-sm font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                            {nextTip.title}
                          </h4>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-blue-600 shrink-0">Clique para ver</span>
                    </div>

                    <p className="mt-2 text-xs text-slate-600 font-medium line-clamp-2">
                      {nextTip.shortAdvice}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-bold">Frequência: {nextTip.frequency}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })()}

              {/* Third Tip Card preview */}
              {thirdTip && thirdTip.id !== nextTip?.id && (() => {
                const theme = getVividTheme(thirdTip.category);
                return (
                  <div
                    onClick={() => {
                      setCurrentIndex((currentIndex + 2) % filteredTips.length);
                      setProgress(0);
                    }}
                    className={`cursor-pointer rounded-2xl border-2 ${theme.border} bg-white p-4 shadow-md hover:shadow-xl transition-all group flex-1 flex flex-col justify-between`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl ${theme.iconBg}`}>
                          {renderIcon(thirdTip.iconName, 'h-4 w-4')}
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                            {thirdTip.categoryLabel}
                          </span>
                          <h4 className="font-heading text-sm font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                            {thirdTip.title}
                          </h4>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-blue-600 shrink-0">Clique para ver</span>
                    </div>

                    <p className="mt-2 text-xs text-slate-600 font-medium line-clamp-2">
                      {thirdTip.shortAdvice}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-bold">Frequência: {thirdTip.frequency}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })()}

              {/* Dot Indicators */}
              <div className="flex items-center justify-center gap-2 pt-2">
                {filteredTips.map((tip, idx) => (
                  <button
                    key={tip.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setProgress(0);
                    }}
                    aria-label={`Ir para dica ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      idx === currentIndex
                        ? 'w-8 bg-blue-600'
                        : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GRID VIEW: Todas as Dicas em Grade Visual */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => {
            const theme = getVividTheme(tip.category);
            return (
              <div
                key={tip.id}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 ${theme.border} bg-white p-6 shadow-md hover:shadow-2xl transition-all duration-300`}
              >
                {/* Top strip */}
                <div className={`h-2 -mx-6 -mt-6 mb-5 ${theme.topBar}`} />

                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-xl ${theme.iconBg}`}>
                          {renderIcon(tip.iconName, 'h-4 w-4')}
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                          {tip.categoryLabel}
                        </span>
                      </div>

                      <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                        {tip.frequency}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-black text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                      {tip.title}
                    </h3>

                    <p className="mt-2 text-xs font-semibold text-slate-700 leading-relaxed">
                      {tip.shortAdvice}
                    </p>
                  </div>

                  {/* Warning & Pro tip */}
                  <div className="space-y-2 pt-2">
                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-2.5 text-[11px] text-amber-900 font-medium">
                      <strong className="font-black text-amber-950 block">💡 Dica Jomano:</strong>
                      {tip.proTip}
                    </div>

                    <div className="rounded-xl bg-red-50 border border-red-200 p-2.5 text-[11px] text-red-900 font-medium">
                      <strong className="font-black text-red-950 block">⚠️ Risco:</strong>
                      {tip.riskIfIgnored}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {tip.relatedServiceTitle ? (
                      <button
                        onClick={() => onScheduleServiceWithTitle?.(tip.relatedServiceTitle)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 px-3 py-1.5 text-xs font-black text-slate-950 shadow-xs transition-all hover:scale-105"
                      >
                        <Wrench className="h-3.5 w-3.5" />
                        <span>Agendar</span>
                      </button>
                    ) : (
                      <span />
                    )}

                    <button
                      onClick={() => setSelectedTipForModal(tip)}
                      className="inline-flex items-center gap-1 text-xs font-black text-blue-700 hover:text-blue-900"
                    >
                      <span>Ver Mais</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Full Educational Tip Inspection */}
      {selectedTipForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-3 border-slate-200 bg-white p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedTipForModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full border border-slate-200 bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
              <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-md">
                {renderIcon(selectedTipForModal.iconName, 'h-6 w-6')}
              </div>
              <div>
                <span className="text-xs font-black text-blue-700 uppercase tracking-wider block">
                  {selectedTipForModal.categoryLabel} • {selectedTipForModal.frequency}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900">
                  {selectedTipForModal.title}
                </h3>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-xs sm:text-sm">
              <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/70 p-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-900 block mb-1">
                  Resumo da Orientação Técnica
                </span>
                <p className="text-slate-800 font-bold leading-relaxed">
                  "{selectedTipForModal.shortAdvice}"
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-heading text-sm font-black uppercase tracking-wider text-slate-900">
                  Entenda a Física e Mecânica do seu Veículo
                </h4>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {selectedTipForModal.fullExplanation}
                </p>
              </div>

              <div className="rounded-2xl border-2 border-red-200 bg-red-50/80 p-4 space-y-1">
                <span className="text-[11px] font-black text-red-800 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  Consequências de Não Fazer a Manutenção
                </span>
                <p className="text-red-950 font-semibold leading-relaxed">
                  {selectedTipForModal.riskIfIgnored}
                </p>
              </div>

              <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 space-y-1">
                <span className="text-[11px] font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="h-4 w-4 text-amber-600" />
                  Dica de Oficina Jomano (Av. Vicente de Carvalho, 730)
                </span>
                <p className="text-slate-900 font-semibold leading-relaxed">
                  {selectedTipForModal.proTip}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              {selectedTipForModal.relatedServiceTitle && (
                <button
                  onClick={() => {
                    const title = selectedTipForModal.relatedServiceTitle;
                    setSelectedTipForModal(null);
                    onScheduleServiceWithTitle?.(title);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 px-5 py-2.5 text-xs font-black text-slate-950 shadow-md shadow-yellow-500/20 active:scale-95 transition-all"
                >
                  <Wrench className="h-4 w-4" />
                  <span>Agendar Serviço na Jomano</span>
                </button>
              )}

              <a
                href={`https://wa.me/${SHOP_CONTACT_INFO.whatsappRaw}?text=${encodeURIComponent(
                  `Olá Jomano! Li a dica sobre "${selectedTipForModal.title}" e gostaria de tirar uma dúvida com a equipe técnica.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-black text-white shadow-md transition-all"
              >
                <Send className="h-4 w-4" />
                <span>Conversar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
