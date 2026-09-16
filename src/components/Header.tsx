import React, { useState } from 'react';
import { 
  Wrench, 
  Bell, 
  Phone, 
  Instagram, 
  MessageSquare, 
  Clock, 
  CheckCheck, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { AppNotification } from '../types';
import { SHOP_CONTACT_INFO } from '../data/mockData';

interface HeaderProps {
  notifications: AppNotification[];
  onMarkNotificationsAsRead: () => void;
  onOpenQuickSupport: () => void;
  onOpenBooking: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  notifications,
  onMarkNotificationsAsRead,
  onOpenQuickSupport,
  onOpenBooking,
  activeSection,
  onNavigate,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { id: 'tracker', label: 'Ao Vivo: Rastrear Veículo' },
    { id: 'engine-bench', label: 'Motor na Bancada' },
    { id: 'services', label: 'Serviços' },
    { id: 'history', label: 'Histórico de Reparos' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      {/* Top micro-bar with direct contact points */}
      <div className="hidden border-b border-slate-900 bg-slate-900/60 px-4 py-1.5 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
              </span>
              Oficina Operando em Tempo Real
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <Clock className="h-3 w-3 text-slate-500" />
              {SHOP_CONTACT_INFO.workingHours}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${SHOP_CONTACT_INFO.phoneRaw}`}
              id="header-phone-link"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="h-3 w-3 text-amber-500" />
              <span>{SHOP_CONTACT_INFO.phone}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={SHOP_CONTACT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="header-instagram-link"
              className="flex items-center gap-1.5 text-pink-400 hover:text-pink-300 transition-colors"
            >
              <Instagram className="h-3.5 w-3.5" />
              <span>{SHOP_CONTACT_INFO.instagram}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand identity */}
        <div 
          onClick={() => onNavigate('tracker')} 
          className="flex cursor-pointer items-center gap-3 group"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 font-black shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/40 transition-transform group-hover:scale-105">
            <Wrench className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-xl font-bold tracking-tight text-white sm:text-2xl">
                JOMANO
              </span>
              <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 ring-1 ring-amber-500/30">
                Oficina & Auto Center
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Retífica de Motores & Diagnóstico Computadorizado
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`nav-${link.id}`}
              onClick={() => onNavigate(link.id)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSection === link.id
                  ? 'bg-slate-800 text-amber-400 shadow-inner'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Controls (Notifications, Quick Support, Booking) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notification bell dropdown toggle */}
          <div className="relative">
            <button
              id="notifications-toggle-btn"
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (unreadCount > 0 && !showNotifications) {
                  // user is opening it
                }
              }}
              title="Notificações Automáticas de Manutenção"
              className="relative rounded-xl border border-slate-800 bg-slate-900/80 p-2.5 text-slate-300 hover:border-slate-700 hover:text-white transition-all"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-slate-950 ring-2 ring-slate-950 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification drop panel */}
            {showNotifications && (
              <div 
                id="notifications-panel"
                className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-2xl ring-1 ring-white/10 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-amber-400" />
                    <h3 className="font-semibold text-white text-sm">Notificações em Tempo Real</h3>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={onMarkNotificationsAsRead}
                      className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
                    >
                      <CheckCheck className="h-3.5 w-3.5" />
                      Marcar lidas
                    </button>
                  )}
                </div>

                <div className="mt-3 max-h-72 overflow-y-auto space-y-2.5 pr-1 text-xs">
                  {notifications.length === 0 ? (
                    <p className="text-center py-6 text-slate-500">Nenhuma notificação recente.</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-2.5 rounded-xl border transition-colors ${
                          notif.read
                            ? 'bg-slate-950/40 border-slate-800/60 text-slate-400'
                            : 'bg-amber-950/20 border-amber-500/30 text-slate-200 shadow-sm'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {notif.type === 'ready' ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : notif.type === 'status_change' ? (
                            <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                          ) : (
                            <HelpCircle className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-white text-[13px]">{notif.title}</span>
                              <span className="text-[10px] text-slate-500">{notif.timestamp}</span>
                            </div>
                            <p className="mt-1 text-slate-300 text-[11px] leading-relaxed">
                              {notif.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-3 border-t border-slate-800 pt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                    Alertas automáticos via sistema
                  </span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Support Button - prominently required by user */}
          <button
            id="quick-support-header-btn"
            onClick={onOpenQuickSupport}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-3.5 py-2 text-xs sm:text-sm font-bold text-white shadow-lg shadow-rose-950/50 hover:from-red-500 hover:to-rose-500 active:scale-95 transition-all ring-1 ring-rose-400/30"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Suporte Rápido</span>
            <span className="sm:hidden">Ajuda</span>
          </button>

          {/* Agendar Horário CTA */}
          <button
            id="header-booking-btn"
            onClick={onOpenBooking}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 active:scale-95 transition-all"
          >
            <span>Agendar Horário</span>
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-300 hover:text-white lg:hidden"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                activeSection === link.id
                  ? 'bg-slate-800 text-amber-400'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
            <a
              href={`tel:${SHOP_CONTACT_INFO.phoneRaw}`}
              className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 text-slate-200"
            >
              <Phone className="h-4 w-4 text-amber-500" />
              <span>Ligar: {SHOP_CONTACT_INFO.phone}</span>
            </a>
            <a
              href={SHOP_CONTACT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 text-pink-300"
            >
              <Instagram className="h-4 w-4" />
              <span>Instagram: {SHOP_CONTACT_INFO.instagram}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
