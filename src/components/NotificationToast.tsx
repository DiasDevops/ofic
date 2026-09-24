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
      <div className="rounded-2xl border-2 border-blue-500 bg-white p-4 shadow-2xl ring-4 ring-blue-500/10 text-xs">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-md">
            {toast.type === 'ready' ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <Bell className="h-5 w-5" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-black text-slate-900 text-xs">{toast.title}</span>
              <button
                onClick={onDismiss}
                className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-slate-600 text-[11px] leading-relaxed font-medium">
              {toast.message}
            </p>
            <span className="mt-1.5 inline-block text-[10px] text-blue-700 font-extrabold">
              ● Atualização automática do pátio Jomano
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
