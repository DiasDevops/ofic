import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { DIVERSIFIED_SERVICES } from '../data/mockData';
import { 
  Wrench, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  ChevronRight,
  Filter
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
    { id: 'motor', label: 'Motor & Bancada' },
    { id: 'transmissao', label: 'Câmbio Automático' },
    { id: 'suspensao', label: 'Suspensão & Freios' },
    { id: 'eletrica', label: 'Injeção & Eletrônica' },
    { id: 'revisao', label: 'Revisão Preventiva' },
  ];

  const filteredServices = activeCategory === 'todos'
    ? DIVERSIFIED_SERVICES
    : DIVERSIFIED_SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services-section" className="space-y-6">
      {/* Section Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Wrench className="h-3.5 w-3.5" />
            Engenharia Mecânica Especializada
          </div>
          <h2 className="mt-1.5 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Serviços Diversificados & Alta Tecnologia
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Desde manutenção preventiva rotineira até a reconstrução completa de motores na bancada técnica climatizada.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`service-cat-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-xl px-3 py-2 text-xs font-bold shrink-0 transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-white'
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
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 shadow-xl ${
              service.isSpotlight
                ? 'border-amber-500/60 bg-gradient-to-b from-amber-950/20 to-slate-900 ring-1 ring-amber-500/30 hover:border-amber-400'
                : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-900'
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
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              {/* Tag / Badge over Photo */}
              <div className="absolute top-2.5 left-2.5">
                <span
                  className={`rounded-lg px-2.5 py-1 text-[10px] font-bold tracking-wider backdrop-blur-md border ${
                    service.isSpotlight
                      ? 'bg-amber-500/90 text-slate-950 border-amber-400 font-extrabold shadow-lg'
                      : 'bg-slate-950/80 text-amber-400 border-slate-700'
                  }`}
                >
                  {service.vehicleBadge}
                </span>
              </div>

              {/* Warranty tag */}
              <div className="absolute bottom-2.5 right-2.5">
                <span className="rounded-md bg-emerald-950/90 backdrop-blur px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  {service.warranty}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-heading text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {service.shortDesc}
                </p>
              </div>

              {/* Estimated turnaround */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 border-t border-slate-800/80 pt-2.5">
                <Clock className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>Tempo médio: <strong className="text-slate-200">{service.estimatedDuration}</strong></span>
              </div>

              {/* Price and Schedule CTA */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 block">A partir de</span>
                  <span className="font-heading text-sm font-bold text-amber-400">
                    R$ {service.startingPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <button
                  id={`btn-schedule-service-${service.id}`}
                  onClick={() => onSelectServiceToBook(service.id)}
                  className="inline-flex items-center gap-1 rounded-xl bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 text-amber-400 px-3 py-1.5 text-xs font-bold border border-amber-500/30 transition-all group-hover:bg-amber-500 group-hover:text-slate-950"
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
