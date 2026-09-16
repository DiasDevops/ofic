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
  MAINTENANCE_STEPS 
} from './data/mockData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { EngineWorkbenchSpotlight } from './components/EngineWorkbenchSpotlight';
import { LiveVehicleTracker } from './components/LiveVehicleTracker';
import { ServicesGrid } from './components/ServicesGrid';
import { RepairHistory } from './components/RepairHistory';
import { BookingModal } from './components/BookingModal';
import { QuickSupportModal, FloatingSupportButton } from './components/QuickSupportModal';
import { NotificationToast } from './components/NotificationToast';
import { Footer } from './components/Footer';

export default function App() {
  // Application persistent state
  const [vehicles, setVehicles] = useState<VehicleOrder[]>(() => {
    const saved = localStorage.getItem('jomano_vehicles');
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
    const saved = localStorage.getItem('jomano_notifications');
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
  const [activeSection, setActiveSection] = useState('tracker');

  // Save vehicles state to local storage
  useEffect(() => {
    localStorage.setItem('jomano_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  // Save notifications
  useEffect(() => {
    localStorage.setItem('jomano_notifications', JSON.stringify(notifications));
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
          newNote = `${new Date().toLocaleTimeString().slice(0, 5)} - Novo ciclo de vistoria iniciado.`;
        } else if (nextStage === 'diagnostico') {
          newProgress = 40;
          newNote = `${new Date().toLocaleTimeString().slice(0, 5)} - Scanner OBD2 e ensaio técnico concluídos. Orçamento em aprovação.`;
        } else if (nextStage === 'execucao') {
          newProgress = 72;
          newNote = `${new Date().toLocaleTimeString().slice(0, 5)} - Serviços mecânicos e montagem de precisão na bancada em andamento.`;
        } else if (nextStage === 'testes') {
          newProgress = 90;
          newNote = `${new Date().toLocaleTimeString().slice(0, 5)} - Teste de rodagem e calibração computadorizada iniciados.`;
        } else if (nextStage === 'pronto') {
          newProgress = 100;
          newNote = `${new Date().toLocaleTimeString().slice(0, 5)} - Veículo 100% finalizado! Lavagem de cortesia feita e pronto para retirada.`;
        }

        const stepObj = MAINTENANCE_STEPS.find((s) => s.id === nextStage);
        const stepLabel = stepObj ? stepObj.label : nextStage;

        // Fire automatic notification
        dispatchAutomaticNotification(
          nextStage === 'pronto' ? `🎉 Veículo Pronto! (${order.plate})` : `Status Atualizado (${order.plate})`,
          nextStage === 'pronto'
            ? `Seu veículo ${order.vehicleModel} está pronto para retirada na Jomano! Chaves na recepção.`
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
      `Sua Ordem de Serviço ${newOrder.id} foi gerada com sucesso para ${newOrder.vehicleModel}. Você já pode acompanhar em tempo real!`,
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
    setActiveSection(sectionId);
    let targetEl: HTMLElement | null = null;
    if (sectionId === 'tracker') targetEl = document.getElementById('tracker-section');
    if (sectionId === 'engine-bench') targetEl = document.getElementById('engine-bench-section');
    if (sectionId === 'services') targetEl = document.getElementById('services-section');
    if (sectionId === 'history') targetEl = document.getElementById('history-section');

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentVehicleObj = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Real-time Toast Notifications */}
      <NotificationToast
        toast={activeToast}
        onDismiss={() => setActiveToast(null)}
      />

      {/* Main Header */}
      <Header
        notifications={notifications}
        onMarkNotificationsAsRead={handleMarkNotificationsAsRead}
        onOpenQuickSupport={() => {
          setSupportActiveVehicle(currentVehicleObj);
          setIsQuickSupportOpen(true);
        }}
        onOpenBooking={() => {
          setPreSelectedServiceId(undefined);
          setIsBookingOpen(true);
        }}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-14 flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenBooking={() => {
            setPreSelectedServiceId(undefined);
            setIsBookingOpen(true);
          }}
          onScrollToTracker={() => handleNavigate('tracker')}
          onScrollToEngineBench={() => handleNavigate('engine-bench')}
        />

        {/* 2. DIFERENCIAL EM DESTAQUE: Motor Desmontado na Bancada */}
        <EngineWorkbenchSpotlight
          onScheduleEngineService={() => {
            setPreSelectedServiceId('srv-motor');
            setIsBookingOpen(true);
          }}
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
        />

        {/* 4. SERVIÇOS DIVERSIFICADOS: Catalog with vehicle photos on cards */}
        <ServicesGrid
          onSelectServiceToBook={(serviceId) => {
            setPreSelectedServiceId(serviceId);
            setIsBookingOpen(true);
          }}
        />

        {/* 5. HISTÓRICO COMPLETO DE REPAROS: Intuitive vehicle log, receipts & warranties */}
        <RepairHistory
          historyRecords={repairHistory}
          onOpenBookingForVehicle={(plate, model) => {
            setPreSelectedServiceId(undefined);
            setIsBookingOpen(true);
          }}
        />
      </main>

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

      {/* Global Footer */}
      <Footer
        onOpenQuickSupport={() => {
          setSupportActiveVehicle(currentVehicleObj);
          setIsQuickSupportOpen(true);
        }}
        onOpenBooking={() => {
          setPreSelectedServiceId(undefined);
          setIsBookingOpen(true);
        }}
      />
    </div>
  );
}
