import React from 'react';
import { AppNotification } from '../types';
import { Bell, CheckCircle2, AlertCircle, X } from 'lucide-react';

interface NotificationToastProps {
  toast: AppNotification | null;
  onDismiss: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  toast,
  onDismiss,
}) => {
  if (!toast) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="rounded-2xl border border-amber-500/50 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-md ring-1 ring-amber-500/20 text-xs">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-bold">
            {toast.type === 'ready' ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <Bell className="h-5 w-5" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs">{toast.title}</span>
              <button
                onClick={onDismiss}
                className="text-slate-400 hover:text-white p-0.5 rounded"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-1 text-slate-300 text-[11px] leading-relaxed">
              {toast.message}
            </p>
            <span className="mt-1.5 inline-block text-[10px] text-amber-400 font-semibold">
              ● Atualização automática da oficina
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
