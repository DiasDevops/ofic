import React, { useState, useEffect } from 'react';
import { MAINTENANCE_TIPS } from '../data/mockData';
import { Lightbulb, ChevronRight, X, Sparkles, Pause, Play } from 'lucide-react';

interface PeriodicTipTickerProps {
  onScrollToTips: () => void;
}

export const PeriodicTipTicker: React.FC<PeriodicTipTickerProps> = ({ onScrollToTips }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Periodically change the tip every 12 seconds
  useEffect(() => {
    if (isPaused || isMinimized) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MAINTENANCE_TIPS.length);
    }, 12000);

    return () => clearInterval(interval);
  }, [isPaused, isMinimized]);

  if (!isVisible) return null;

  const tip = MAINTENANCE_TIPS[currentIndex];

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 rounded-2xl border-2 border-amber-400 bg-white px-3.5 py-2.5 shadow-xl shadow-amber-500/20 hover:scale-105 transition-all text-xs font-black text-slate-900"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <span>Dica Jomano: {tip.categoryLabel}</span>
        </button>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="fixed bottom-6 left-6 z-40 max-w-sm sm:max-w-md w-[calc(100vw-3rem)] rounded-2xl border-3 border-amber-400 bg-white p-4 shadow-2xl shadow-slate-900/15 transition-all duration-300 animate-in slide-in-from-bottom-5"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-400 text-slate-950 shadow-xs">
            <Lightbulb className="h-3.5 w-3.5 animate-pulse" />
          </span>
          <span className="text-[11px] font-black uppercase tracking-wider text-amber-800">
            Dica Preventiva Periódica • {tip.categoryLabel}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 transition-colors"
            title={isPaused ? 'Continuar giro automático' : 'Pausar'}
          >
            {isPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 transition-colors"
            title="Minimizar dica"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Title & Short Advice */}
      <div className="space-y-1">
        <h4 className="font-heading text-sm font-black text-slate-900 leading-snug">
          {tip.title}
        </h4>
        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          {tip.shortAdvice}
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-[11px] font-bold text-slate-400">
          Giro {currentIndex + 1} de {MAINTENANCE_TIPS.length}
        </span>

        <button
          onClick={() => {
            onScrollToTips();
          }}
          className="inline-flex items-center gap-1 font-black text-blue-700 hover:text-blue-900 transition-colors"
        >
          <span>Aprender mais</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
