import React from 'react';

interface JomanoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const JomanoLogo: React.FC<JomanoLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const iconSizes = {
    sm: 'h-7 w-7 sm:h-8 sm:w-8',
    md: 'h-8 w-8 sm:h-10 sm:w-10 lg:h-11 lg:w-11',
    lg: 'h-11 w-11 sm:h-14 sm:w-14',
  };

  const titleSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg lg:text-xl xl:text-2xl',
    lg: 'text-xl sm:text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 shrink-0 ${className}`}>
      {/* Official Red Rounded Badge inspired by the Jomano storefront photo */}
      <div
        className={`relative flex ${iconSizes[size]} shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 via-red-700 to-rose-900 text-white shadow-lg shadow-red-600/30 ring-2 ring-red-500/40 p-1.5 transition-transform hover:scale-105`}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
          {/* Outer stylized rounded rectangle border */}
          <rect
            x="8"
            y="8"
            width="84"
            height="84"
            rx="20"
            stroke="white"
            strokeWidth="5"
            strokeOpacity="0.9"
          />
          {/* Double racing 'J' curve strokes as in the original Jomano emblem */}
          <path
            d="M36 24 V62 C36 72 28 74 24 73"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M56 24 V62 C56 76 44 80 38 78"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M74 24 V52 C74 64 64 68 60 67"
            stroke="#fde047"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="leading-tight shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className={`font-heading font-black tracking-tight text-slate-900 ${titleSizes[size]}`}>
            JOMANO
          </span>
          <span className="rounded-md bg-blue-600 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm whitespace-nowrap">
            Auto Serviço
          </span>
        </div>
        {showSubtitle && (
          <p className="text-[10px] sm:text-[11px] font-bold text-slate-600 tracking-wide uppercase whitespace-nowrap hidden sm:block">
            Centro Automotivo • RJ 21210-000
          </p>
        )}
      </div>
    </div>
  );
};
