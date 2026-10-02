import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { DIVERSIFIED_SERVICES } from '../data/mockData';
import { 
  Wrench, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight,
  Disc,
  Droplet
} from 'lucide-react';

interface ServicesGridProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  onSelectServiceToBook,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos os Serviços' },
    { id: 'suspensao', label: 'Alinhamento & Balanceamento' },
    { id: 'revisao', label: 'Troca de Óleo & Revisão' },
    { id: 'freios', label: 'Freios & Pastilhas' },
    { id: 'motor', label: 'Motor na Bancada' },
    { id: 'eletrica', label: 'Scanner & Injeção' },
  ];

  const filteredServices = activeCategory === 'todos'
    ? DIVERSIFIED_SERVICES
    : DIVERSIFIED_SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services-section" className="space-y-6">
      {/* Section Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-blue-700">
            <Wrench className="h-3.5 w-3.5" />
            Serviços Especializados • Pátio Vicente de Carvalho
          </div>
          <h2 className="mt-1.5 font-heading text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Alinhamento de Pneus, Balanceamentos & Mecânica
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl">
            Valores acessíveis e peças de primeira linha com garantia. Rampa de alinhamento, balanceamentos em rodas de ferro, pneus ecológicos e retífica.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`service-cat-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-xl px-3.5 py-2 text-xs font-black shrink-0 transition-all ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid with Vehicle Photos on each card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            id={`service-card-${service.id}`}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border-3 transition-all duration-300 shadow-lg hover:shadow-2xl bg-white ${
              service.isSpotlight
                ? 'border-red-500 ring-4 ring-red-500/15 shadow-red-500/20'
                : service.category === 'suspensao'
                ? 'border-blue-300 hover:border-blue-600 hover:shadow-blue-500/15'
                : service.category === 'revisao'
                ? 'border-amber-300 hover:border-amber-600 hover:shadow-amber-500/15'
                : 'border-slate-200 hover:border-blue-600 hover:shadow-blue-500/15'
            }`}
          >
            {/* Vehicle Photo Container */}
            <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-950">
              <img
                src={service.vehiclePhoto}
                alt={service.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              {/* Tag / Badge over Photo */}
              <div className="absolute top-2.5 left-2.5">
                <span
                  className={`rounded-lg px-2.5 py-1 text-[10px] font-black tracking-wider shadow-sm border ${
                    service.isSpotlight
                      ? 'bg-red-600 text-white border-red-700'
                      : 'bg-white/95 text-blue-900 border-slate-200 backdrop-blur-md'
                  }`}
                >
                  {service.vehicleBadge}
                </span>
              </div>

              {/* Warranty tag */}
              <div className="absolute bottom-2.5 right-2.5">
                <span className="rounded-md bg-emerald-700 px-2 py-0.5 text-[10px] font-black text-white shadow-xs flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  {service.warranty}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-heading text-base font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed line-clamp-3 font-medium">
                  {service.shortDesc}
                </p>
              </div>

              {/* Estimated turnaround */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 border-t border-slate-100 pt-2.5 font-semibold">
                <Clock className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span>Tempo médio: <strong className="text-slate-800">{service.estimatedDuration}</strong></span>
              </div>

              {/* Price and Schedule CTA */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 gap-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    {service.displayPrice.startsWith('R$') ? 'Valor Especial' : 'Preço'}
                  </span>
                  <span
                    className={`font-heading font-black leading-snug block ${
                      service.displayPrice.startsWith('R$')
                        ? 'text-lg text-red-600'
                        : 'text-[11px] text-blue-900 max-w-[160px]'
                    }`}
                  >
                    {service.displayPrice}
                  </span>
                </div>

                <button
                  id={`btn-schedule-service-${service.id}`}
                  onClick={() => onSelectServiceToBook(service.id)}
                  className="inline-flex items-center gap-1 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 px-3 py-1.5 text-xs font-black shadow-xs transition-all group-hover:scale-105 shrink-0"
                >
                  <span>Agendar</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
