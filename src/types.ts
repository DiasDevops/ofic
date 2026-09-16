export type MaintenanceStage =
  | 'checkin'
  | 'diagnostico'
  | 'execucao'
  | 'testes'
  | 'pronto';

export interface MaintenanceStep {
  id: MaintenanceStage;
  label: string;
  description: string;
  iconName: string;
  estimatedHours: string;
}

export interface ReplacedPart {
  name: string;
  code: string;
  brand: string;
  quantity: number;
  unitPrice: number;
  warrantyMonths: number;
}

export interface VehicleOrder {
  id: string; // OS number, e.g. OS-2026-8942
  plate: string;
  vehicleModel: string;
  vehicleBrand: string;
  year: number;
  color: string;
  imageUrl: string;
  ownerName: string;
  ownerPhone: string;
  entryDate: string;
  estimatedCompletion: string;
  serviceRequested: string;
  currentStage: MaintenanceStage;
  stageProgressPercent: number;
  mechanicInCharge: {
    name: string;
    avatar: string;
    specialty: string;
  };
  liveNotes: string[];
  partsList: ReplacedPart[];
  totalEstimate: number;
  isEngineTeardownJob?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: 'motor' | 'suspensao' | 'eletrica' | 'revisao' | 'freios' | 'transmissao';
  vehiclePhoto: string;
  vehicleBadge: string;
  estimatedDuration: string;
  startingPrice: number;
  warranty: string;
  isSpotlight?: boolean;
}

export interface RepairHistoryRecord {
  id: string;
  osNumber: string;
  plate: string;
  vehicleModel: string;
  vehiclePhoto: string;
  date: string;
  mileage: number;
  mainService: string;
  allServices: string[];
  replacedParts: ReplacedPart[];
  mechanicName: string;
  totalCost: number;
  status: 'Concluído' | 'Garantia Ativa';
  warrantyUntil: string;
  observations: string;
}

export interface AppNotification {
  id: string;
  osNumber?: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'status_change' | 'quote' | 'ready' | 'info';
  read: boolean;
}

export interface BookingFormState {
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehiclePlate: string;
  vehicleYear: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export interface EnginePartHighlight {
  id: string;
  name: string;
  shortDescription: string;
  precisionDetail: string;
  tolerance: string;
  inspectionType: string;
}
