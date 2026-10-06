import React, { useState } from 'react';
import { 
  Bell, 
  Phone, 
  Send, 
  MapPin, 
  Clock, 
  CheckCheck, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  Menu,
  X,
  MessageSquare,
  Sparkles,
  Calendar,
  Building2
} from 'lucide-react';
import { AppNotification } from '../types';
import { SHOP_CONTACT_INFO } from '../data/mockData';
import { JomanoLogo } from './JomanoLogo';

interface HeaderProps {
  notifications: AppNotification[];
  onMarkNotificationsAsRead: () => void;
  onOpenQuickSupport: () => void;
  onOpenBooking: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  isShopMode?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  notifications,
  onMarkNotificationsAsRead,
  onOpenQuickSupport,
  onOpenBooking,
  activeSection,
  onNavigate,
  isShopMode = false,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { id: 'promos', label: 'Promoções' },
    { id: 'tracker', label: 'Rastrear Veículo' },
    { id: 'engine-bench', label: 'Motor na Bancada' },
    { id: 'services', label: 'Serviços' },
    { id: 'map', label: 'Como Chegar' },
    { id: 'tips', label: 'Dicas' },
    { id: 'history', label: 'Histórico' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      {/* Top micro-bar with location RJ 21210-000, WhatsApp and Landline */}
      <div className="border-b border-blue-100 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 px-3 sm:px-4 py-1.5 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs font-semibold gap-2 overflow-hidden">
          <div className="flex items-center gap-2 sm:gap-6 min-w-0">
            <span className="flex items-center gap-1.5 text-yellow-300 font-extrabold truncate">
              <MapPin className="h-3.5 w-3.5 text-yellow-300 shrink-0" />
              <span className="truncate">
                <span className="hidden sm:inline">{SHOP_CONTACT_INFO.address}</span>
                <span className="sm:hidden">Vicente de Carvalho, 730</span>
                {' — '}
                <span className="bg-yellow-400 text-slate-950 px-1.5 py-0.5 rounded font-black text-[10px] sm:text-[11px] whitespace-nowrap">
                  {SHOP_CONTACT_INFO.locationShort}
                </span>
              </span>
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-blue-100 text-[11px] whitespace-nowrap">
              <Clock className="h-3 w-3" />
              {SHOP_CONTACT_INFO.workingHours}
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0 text-xs">
            <a
              href={`https://wa.me/${SHOP_CONTACT_INFO.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              id="header-whatsapp-link"
              className="flex items-center gap-1.5 font-bold text-emerald-300 hover:text-white transition-colors whitespace-nowrap text-[11px] sm:text-xs"
            >
              <Send className="h-3.5 w-3.5 shrink-0" />
              <span>
                <span className="hidden sm:inline">WhatsApp: </span>
                {SHOP_CONTACT_INFO.whatsapp}
              </span>
            </a>
            <span className="hidden md:inline text-blue-300">|</span>
            <a
              href={`tel:${SHOP_CONTACT_INFO.landlineRaw}`}
              id="header-phone-link"
              className="hidden md:flex items-center gap-1.5 text-blue-100 hover:text-white transition-colors whitespace-nowrap text-[11px] sm:text-xs"
            >
              <Phone className="h-3 w-3 text-yellow-300 shrink-0" />
              <span>Loja: {SHOP_CONTACT_INFO.phoneLandline}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 py-2 sm:py-2.5 gap-2 sm:gap-4">
        {/* Brand identity with official red badge */}
        <div 
          onClick={() => onNavigate('promos')} 
          className="cursor-pointer shrink-0"
        >
          <JomanoLogo size="md" />
        </div>

        {/* Desktop Nav Items - Clean, proportional and anti-overlap */}
        <nav className="hidden xl:flex items-center gap-1 2xl:gap-1.5 shrink min-w-0">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`nav-${link.id}`}
              onClick={() => onNavigate(link.id)}
              className={`px-2.5 2xl:px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeSection === link.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-blue-700'
              }`}
            >
              <span>{link.label}</span>
            </button>
          ))}
        </nav>

        {/* Action Controls (Notifications, Quick Support, Booking) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Notification bell dropdown toggle */}
          <div className="relative">
            <button
              id="notifications-toggle-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notificações Automáticas de Manutenção"
              className="relative rounded-xl border border-slate-200 bg-slate-50 p-1.5 sm:p-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-all shrink-0"
            >
              <Bell className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-black text-white ring-2 ring-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification drop panel */}
            {showNotifications && (
              <div 
                id="notifications-panel"
                className="absolute right-0 mt-3 w-80 sm:w-96 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl ring-1 ring-black/5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-blue-600" />
                    <h3 className="font-extrabold text-slate-900 text-sm">Notificações em Tempo Real</h3>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={onMarkNotificationsAsRead}
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-bold"
                    >
                      <CheckCheck className="h-3.5 w-3.5" />
                      Marcar lidas
                    </button>
                  )}
                </div>

                <div className="mt-3 max-h-72 overflow-y-auto space-y-2 pr-1 text-xs">
                  {notifications.length === 0 ? (
                    <p className="text-center py-6 text-slate-400">Nenhuma notificação recente.</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-2.5 rounded-xl border transition-colors ${
                          notif.read
                            ? 'bg-slate-50 border-slate-200 text-slate-500'
                            : 'bg-blue-50/70 border-blue-200 text-slate-800 shadow-xs'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {notif.type === 'ready' ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : notif.type === 'status_change' ? (
                            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                          ) : (
                            <HelpCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900 text-[13px]">{notif.title}</span>
                              <span className="text-[10px] text-slate-400 font-semibold">{notif.timestamp}</span>
                            </div>
                            <p className="mt-1 text-slate-600 text-[11px] leading-relaxed">
                              {notif.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-3 border-t border-slate-100 pt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                    Alertas automáticos pelo sistema
                  </span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-500 hover:text-slate-800 font-semibold"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Support Button (Red Theme) */}
          <button
            id="quick-support-header-btn"
            onClick={onOpenQuickSupport}
            className="hidden sm:flex items-center gap-1.5 rounded-xl bg-red-600 px-2.5 sm:px-3 py-1.5 text-xs font-extrabold text-white shadow-md shadow-red-600/20 hover:bg-red-700 active:scale-95 transition-all shrink-0 whitespace-nowrap"
          >
            <MessageSquare className="h-3.5 w-3.5 shrink-0" />
            <span>Suporte</span>
          </button>

          {/* Agendar Horário CTA (Vivid Amber/Gold) */}
          <button
            id="header-booking-btn"
            onClick={onOpenBooking}
            className="flex items-center gap-1.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-black text-slate-950 shadow-md shadow-yellow-500/20 active:scale-95 transition-all shrink-0 whitespace-nowrap"
          >
            <Calendar className="h-3.5 w-3.5 shrink-0 hidden sm:inline" />
            <span>Agendar<span className="hidden sm:inline"> Horário</span></span>
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-slate-200 bg-slate-50 p-1.5 sm:p-2 text-slate-700 hover:bg-slate-100 xl:hidden shrink-0"
            id="mobile-menu-toggle-btn"
            aria-label="Menu principal"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2.5 shadow-lg max-w-full overflow-hidden">
          {/* Quick Action Shortcuts inside Mobile Menu */}
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 ${
                activeSection === 'admin'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-amber-50 text-amber-900 border border-amber-200'
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Modo Oficina</span>
            </button>

            <button
              onClick={() => {
                onOpenQuickSupport();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 bg-red-50 text-red-700 border border-red-200"
            >
              <MessageSquare className="h-4 w-4 text-red-600" />
              <span>Suporte Rápido</span>
            </button>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                activeSection === link.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-200 space-y-2 text-xs">
            <a
              href={`https://wa.me/${SHOP_CONTACT_INFO.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold border border-emerald-200"
            >
              <Send className="h-4 w-4 text-emerald-600" />
              <span>WhatsApp: {SHOP_CONTACT_INFO.whatsapp}</span>
            </a>
            <a
              href={`tel:${SHOP_CONTACT_INFO.landlineRaw}`}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50 text-blue-800 font-bold border border-blue-200"
            >
              <Phone className="h-4 w-4 text-blue-600" />
              <span>Ligar: {SHOP_CONTACT_INFO.phoneLandline}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
