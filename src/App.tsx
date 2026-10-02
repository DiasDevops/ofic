import React, { useState, useEffect } from 'react';
import { 
  VehicleOrder, 
  AppNotification, 
  RepairHistoryRecord, 
  MaintenanceStage 
} from './types';
import { 
  INITIAL_VEHICLES_IN_SHOP, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_REPAIR_HISTORY, 
  SHOP_CONTACT_INFO,
  MAINTENANCE_STEPS,
  DIVERSIFIED_SERVICES
} from './data/mockData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { StorefrontBanner } from './components/StorefrontBanner';
import { EngineWorkbenchSpotlight } from './components/EngineWorkbenchSpotlight';
import { LiveVehicleTracker } from './components/LiveVehicleTracker';
import { ServicesGrid } from './components/ServicesGrid';
import { RepairHistory } from './components/RepairHistory';
import { BookingModal } from './components/BookingModal';
import { QuickSupportModal, FloatingSupportButton } from './components/QuickSupportModal';
import { NotificationToast } from './components/NotificationToast';
import { MaintenanceTipsSection } from './components/MaintenanceTipsSection';
import { PeriodicTipTicker } from './components/PeriodicTipTicker';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { AdminLoginModal } from './components/AdminLoginModal';
import { isAdminAuthenticated, setAdminAuthenticated } from './utils/auth';

export default function App() {
  // Application persistent state
  const [vehicles, setVehicles] = useState<VehicleOrder[]>(() => {
    const saved = localStorage.getItem('jomano_vehicles_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading vehicles from storage', e);
      }
    }
    return INITIAL_VEHICLES_IN_SHOP;
  });

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(() => {
    return vehicles[0]?.id || INITIAL_VEHICLES_IN_SHOP[0].id;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('jomano_notifications_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading notifications', e);
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [repairHistory] = useState<RepairHistoryRecord[]>(INITIAL_REPAIR_HISTORY);
  const [activeToast, setActiveToast] = useState<AppNotification | null>(null);

  // Modals
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>(undefined);
  const [isQuickSupportOpen, setIsQuickSupportOpen] = useState(false);
  const [supportActiveVehicle, setSupportActiveVehicle] = useState<VehicleOrder | null>(null);

  // Active section for navigation
  const [activeSection, setActiveSection] = useState('promos');

  // Shop Mode vs Client Privacy Mode - Only unlocked when admin enters the password
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => isAdminAuthenticated());
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isShopMode, setIsShopMode] = useState<boolean>(() => isAdminAuthenticated());

  const handleToggleShopMode = (enabled: boolean) => {
    if (enabled) {
      if (!isAdminAuthenticated() && !isAdminLoggedIn) {
        setIsAdminLoginModalOpen(true);
        return;
      }
      setIsShopMode(true);
      setIsAdminLoggedIn(true);
    } else {
      setIsShopMode(false);
      setIsAdminLoggedIn(false);
      setAdminAuthenticated(false);
    }
  };

  // Save vehicles state to local storage
  useEffect(() => {
    localStorage.setItem('jomano_vehicles_v3', JSON.stringify(vehicles));
  }, [vehicles]);

  // Save notifications
  useEffect(() => {
    localStorage.setItem('jomano_notifications_v3', JSON.stringify(notifications));
  }, [notifications]);

  // Auto-dismiss toast
  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  const handleMarkNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Dispatch an automatic notification
  const dispatchAutomaticNotification = (
    title: string, 
    message: string, 
    type: 'status_change' | 'quote' | 'ready' | 'info' = 'status_change',
    osNumber?: string
  ) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      osNumber,
      title,
      message,
      timestamp: 'Agora mesmo',
      type,
      read: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    setActiveToast(newNotif);
  };

  // Simulate advancing the maintenance status of a vehicle
  const handleSimulateStatusAdvance = (orderId: string) => {
    const stages: MaintenanceStage[] = ['checkin', 'diagnostico', 'execucao', 'testes', 'pronto'];
    
    setVehicles((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        const currentIndex = stages.indexOf(order.currentStage);
        const nextIndex = (currentIndex + 1) % stages.length;
        const nextStage = stages[nextIndex];

        let newProgress = 15;
        let newNote = '';

        if (nextStage === 'checkin') {
          newProgress = 15;
          newNote = `${new Date().toLocaleTimeString().slice(0, 5)} - Vistoria e check-in no pátio Vicente de Carvalho, 730 reiniciados.`;
        } else if (nextStage === 'diagnostico') {
          newProgress = 40;
          newNote = `${new Date().toLocaleTimeString().slice(0, 5)} - Rampa de alinhamento e scanner OBD2 concluídos com sucesso.`;
        } else if (nextStage === 'execucao') {
          newProgress = 70;
          newNote = `${new Date().toLocaleTimeString().slice(0, 5)} - Manutenção mecânica e alinhamento/balanceamento em execução no elevador.`;
        } else if (nextStage === 'testes') {
          newProgress = 90;
          newNote = `${new Date().toLocaleTimeString().slice(0, 5)} - Teste de rodagem e controle de vibração 100% calibrado.`;
        } else if (nextStage === 'pronto') {
          newProgress = 100;
          newNote = `${new Date().toLocaleTimeString().slice(0, 5)} - Veículo 100% finalizado! Pronto para retirada na Av. Vicente de Carvalho, 730.`;
        }

        const stepObj = MAINTENANCE_STEPS.find((s) => s.id === nextStage);
        const stepLabel = stepObj ? stepObj.label : nextStage;

        // Fire automatic notification
        dispatchAutomaticNotification(
          nextStage === 'pronto' ? `🎉 Veículo Pronto! (${order.plate})` : `Status Atualizado (${order.plate})`,
          nextStage === 'pronto'
            ? `Seu veículo ${order.vehicleModel} está pronto para retirada na Jomano! Chaves na recepção da Av. Vicente de Carvalho, 730.`
            : `O veículo ${order.vehicleModel} avançou para: ${stepLabel}. ${newNote}`,
          nextStage === 'pronto' ? 'ready' : 'status_change',
          order.id
        );

        return {
          ...order,
          currentStage: nextStage,
          stageProgressPercent: newProgress,
          liveNotes: [newNote, ...order.liveNotes],
        };
      })
    );
  };

  // Booking confirmed handler
  const handleBookingConfirmed = (newOrder: VehicleOrder) => {
    setVehicles((prev) => [newOrder, ...prev]);
    setSelectedVehicleId(newOrder.id);
    setActiveSection('tracker');

    dispatchAutomaticNotification(
      `Novo Agendamento Confirmado (${newOrder.plate})`,
      `Sua Ordem de Serviço ${newOrder.id} foi gerada com sucesso para ${newOrder.vehicleModel}. Você já pode acompanhar em tempo real no pátio Vicente de Carvalho!`,
      'info',
      newOrder.id
    );

    // Scroll to tracker
    const el = document.getElementById('tracker-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll / Navigate helpers
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'admin') {
      if (isAdminLoggedIn || isAdminAuthenticated()) {
        setIsAdminLoggedIn(true);
        setIsShopMode(true);
        setActiveSection('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setIsAdminLoginModalOpen(true);
      }
      return;
    }

    setActiveSection(sectionId);
    let targetEl: HTMLElement | null = null;
    if (sectionId === 'promos') targetEl = document.getElementById('promos-section');
    if (sectionId === 'tips') targetEl = document.getElementById('maintenance-tips-section');
    if (sectionId === 'tracker') targetEl = document.getElementById('tracker-section');
    if (sectionId === 'engine-bench') targetEl = document.getElementById('engine-bench-section');
    if (sectionId === 'services') targetEl = document.getElementById('services-section');
    if (sectionId === 'history') targetEl = document.getElementById('history-section');

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenBookingWithPromo = (promoTitle?: string) => {
    if (promoTitle) {
      // Find matching service
      const matched = DIVERSIFIED_SERVICES.find((s) =>
        s.title.toLowerCase().includes(promoTitle.toLowerCase()) ||
        promoTitle.toLowerCase().includes(s.title.toLowerCase())
      );
      setPreSelectedServiceId(matched ? matched.id : DIVERSIFIED_SERVICES[0].id);
    } else {
      setPreSelectedServiceId(undefined);
    }
    setIsBookingOpen(true);
  };

  const currentVehicleObj = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Real-time Toast Notifications */}
      <NotificationToast
        toast={activeToast}
        onDismiss={() => setActiveToast(null)}
      />

      {/* Main Header with Official Store Identity */}
      <Header
        notifications={notifications}
        onMarkNotificationsAsRead={handleMarkNotificationsAsRead}
        onOpenQuickSupport={() => {
          setSupportActiveVehicle(currentVehicleObj);
          setIsQuickSupportOpen(true);
        }}
        onOpenBooking={() => handleOpenBookingWithPromo()}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isShopMode={isShopMode || isAdminLoggedIn}
      />

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-14 flex-1">
        {activeSection === 'admin' ? (
          <AdminPanel
            vehicles={vehicles}
            onSimulateStatusAdvance={handleSimulateStatusAdvance}
            onLogout={() => {
              setAdminAuthenticated(false);
              setIsShopMode(false);
              setIsAdminLoggedIn(false);
              handleNavigate('tracker');
            }}
            onReturnToPublicSite={() => handleNavigate('tracker')}
          />
        ) : (
          <>
            {/* 1. Hero Section with Vivid Daylight Styling */}
            <HeroSection
              onOpenBooking={() => handleOpenBookingWithPromo()}
              onScrollToTracker={() => handleNavigate('tracker')}
              onScrollToEngineBench={() => handleNavigate('engine-bench')}
              onScrollToPromos={() => handleNavigate('promos')}
            />

            {/* 2. Storefront Banner inspired by the uploaded physical store facade */}
            <div id="promos-section">
              <StorefrontBanner
                onScheduleService={(promoTitle) => handleOpenBookingWithPromo(promoTitle)}
              />
            </div>

            {/* 2.5 DICAS DE MANUTENÇÃO PREVENTIVA (Cards Rotativos Educativos) */}
            <MaintenanceTipsSection
              onScheduleServiceWithTitle={(title) => handleOpenBookingWithPromo(title)}
            />

            {/* 3. ACOMPANHAMENTO EM TEMPO REAL: Vehicle Live Tracker */}
            <LiveVehicleTracker
              vehicles={vehicles}
              selectedVehicleId={selectedVehicleId}
              onSelectVehicle={(id) => setSelectedVehicleId(id)}
              onSimulateStatusAdvance={handleSimulateStatusAdvance}
              onOpenQuickSupportForVehicle={(vehicle) => {
                setSupportActiveVehicle(vehicle);
                setIsQuickSupportOpen(true);
              }}
              isShopMode={isShopMode || isAdminLoggedIn}
              onToggleShopMode={handleToggleShopMode}
              onNavigateToAdmin={() => handleNavigate('admin')}
            />

            {/* 4. DIFERENCIAL EM DESTAQUE: Motor Desmontado na Bancada */}
            <EngineWorkbenchSpotlight
              onScheduleEngineService={() => {
                setPreSelectedServiceId('srv-motor');
                setIsBookingOpen(true);
              }}
            />

            {/* 5. SERVIÇOS DIVERSIFICADOS: Alinhamento de pneus, balanceamento roda ferro, óleos & catálogo */}
            <ServicesGrid
              onSelectServiceToBook={(serviceId) => {
                setPreSelectedServiceId(serviceId);
                setIsBookingOpen(true);
              }}
            />

            {/* 6. HISTÓRICO COMPLETO DE REPAROS: Digital Log, Receipts & Warranties */}
            <RepairHistory
              historyRecords={repairHistory}
              onOpenBookingForVehicle={() => {
                setPreSelectedServiceId(undefined);
                setIsBookingOpen(true);
              }}
              isShopMode={isShopMode || isAdminLoggedIn}
            />
          </>
        )}
      </main>

      {/* Periodic Floating Tip Ticker for continuous education */}
      <PeriodicTipTicker
        onScrollToTips={() => handleNavigate('tips')}
      />

      {/* Floating Action Button for Immediate Quick Support */}
      <FloatingSupportButton
        onClick={() => {
          setSupportActiveVehicle(currentVehicleObj);
          setIsQuickSupportOpen(true);
        }}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedServiceId={preSelectedServiceId}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* Quick Support Modal */}
      <QuickSupportModal
        isOpen={isQuickSupportOpen}
        onClose={() => setIsQuickSupportOpen(false)}
        activeVehicle={supportActiveVehicle}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onSuccess={() => {
          setIsAdminLoggedIn(true);
          setIsShopMode(true);
          setIsAdminLoginModalOpen(false);
          setActiveSection('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Footer */}
      <Footer
        onOpenQuickSupport={() => {
          setSupportActiveVehicle(currentVehicleObj);
          setIsQuickSupportOpen(true);
        }}
        onOpenBooking={() => handleOpenBookingWithPromo()}
      />
    </div>
  );
}
