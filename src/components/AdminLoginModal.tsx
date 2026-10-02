import React, { useState } from 'react';
import { Lock, Eye, EyeOff, X, ShieldAlert, Building2 } from 'lucide-react';
import { verifyAdminPassword, setAdminAuthenticated } from '../utils/auth';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Por favor, digite a senha do administrador.');
      return;
    }

    if (verifyAdminPassword(password)) {
      setAdminAuthenticated(true);
      setError(null);
      setPassword('');
      onSuccess();
    } else {
      setError('Senha incorreta. Acesso restrito apenas aos administradores da loja.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border-2 border-slate-200 animate-in zoom-in-95 space-y-5">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5 text-slate-900 font-heading font-black text-lg">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-slate-950 shadow-xs">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <span className="block leading-tight">Área do Administrador</span>
              <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">
                Modo Oficina • Acesso Restrito
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setError(null);
              setPassword('');
              onClose();
            }}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Security Notice */}
        <div className="rounded-2xl bg-amber-50/80 border border-amber-200/80 p-3.5 text-xs text-amber-950 leading-relaxed space-y-1">
          <p className="font-extrabold flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-amber-700" />
            Ambiente Seguro da Loja:
          </p>
          <p className="text-amber-900">
            Esta página e seus dados são de acesso exclusivo dos administradores da oficina. Insira sua senha para acessar o painel de controle e dados completos.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Senha de Administrador:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Insira sua senha de administrador"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                className="w-full rounded-xl border-2 border-slate-200 pl-4 pr-11 py-2.5 text-sm font-mono focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {error && (
              <div className="mt-2 flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs font-bold text-red-700">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setError(null);
                setPassword('');
                onClose();
              }}
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-2.5 text-xs font-black text-slate-950 shadow-md active:scale-95 transition-all"
            >
              Entrar no Painel do Administrador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
