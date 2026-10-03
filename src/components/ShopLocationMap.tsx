import React, { useState } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  InfoWindow 
} from '@vis.gl/react-google-maps';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  ExternalLink, 
  Clock, 
  Wrench, 
  Compass, 
  ShieldCheck,
  Send
} from 'lucide-react';
import { SHOP_CONTACT_INFO } from '../data/mockData';

// Jomano Centro Automotivo - Av. Vicente de Carvalho, 730
const JOMANO_COORDINATES = { lat: -22.8532, lng: -43.3134 };

const GOOGLE_MAPS_API_KEY =
  ((import.meta as unknown) as { env?: { VITE_GOOGLE_MAPS_API_KEY?: string } }).env?.VITE_GOOGLE_MAPS_API_KEY ||
  'AIzaSyCHu2LobzBb0AH1b3chdODs4GRZvaco88Q';

export const ShopLocationMap: React.FC = () => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);

  const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    'Av. Vicente de Carvalho, 730 - Vicente de Carvalho, Rio de Janeiro - RJ, 21210-000'
  )}`;

  const wazeDirectionsUrl = `https://waze.com/ul?q=${encodeURIComponent(
    'Av. Vicente de Carvalho, 730, Rio de Janeiro'
  )}&navigate=yes`;

  return (
    <div id="localizacao-section" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 border border-blue-200 px-3 py-1 text-xs font-black text-blue-900 uppercase tracking-wider mb-2">
            <Compass className="h-4 w-4 text-blue-700" />
            Localização Oficial da Oficina
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Como Chegar na Jomano
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mt-1">
            Venha nos visitar na <strong>Av. Vicente de Carvalho, 730</strong> (próximo à Praça Aquidauana e Metrô Vicente de Carvalho).
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={googleDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-black text-white shadow-md shadow-blue-700/20 transition-all active:scale-95"
          >
            <Navigation className="h-4 w-4" />
            <span>Traçar Rota no Google Maps</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>

          <a
            href={wazeDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 px-4 py-2.5 text-xs font-black text-white shadow-md shadow-cyan-700/20 transition-all active:scale-95"
          >
            <Navigation className="h-4 w-4" />
            <span>Abrir no Waze</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>
        </div>
      </div>

      {/* Main Map Box & Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Google Map Container */}
        <div className="lg:col-span-2 rounded-3xl border-2 border-slate-200 bg-white p-3 shadow-md overflow-hidden flex flex-col">
          <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-slate-200">
            <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
              <Map
                mapId="DEMO_MAP_ID"
                defaultCenter={JOMANO_COORDINATES}
                defaultZoom={16}
                gestureHandling="cooperative"
                disableDefaultUI={false}
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                className="w-full h-full"
              >
                {/* Advanced Marker for Jomano Shop */}
                <AdvancedMarker
                  position={JOMANO_COORDINATES}
                  title="Jomano Centro Automotivo & Auto Serviço"
                  onClick={() => setInfoWindowOpen(!infoWindowOpen)}
                >
                  <Pin
                    background="#d97706"
                    glyphColor="#ffffff"
                    borderColor="#92400e"
                    scale={1.25}
                  />
                </AdvancedMarker>

                {/* Interactive InfoWindow */}
                {infoWindowOpen && (
                  <InfoWindow
                    position={JOMANO_COORDINATES}
                    onCloseClick={() => setInfoWindowOpen(false)}
                    pixelOffset={[0, -38]}
                  >
                    <div className="p-1 max-w-[260px] text-slate-900 font-sans">
                      <div className="flex items-center gap-1.5 text-amber-700 font-black text-xs uppercase mb-1">
                        <Wrench className="h-3.5 w-3.5" />
                        <span>Jomano Auto Serviço</span>
                      </div>
                      <h4 className="font-heading font-black text-sm text-slate-900 leading-tight">
                        Centro Automotivo & Oficina
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Av. Vicente de Carvalho, 730
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono">
                        RJ 21210-000
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                        <span className="font-bold text-emerald-700">Loja Aberta</span>
                        <a
                          href={googleDirectionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-black text-blue-600 hover:underline flex items-center gap-0.5"
                        >
                          Como chegar <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </APIProvider>
          </div>

          <div className="px-3 pt-3 flex flex-wrap items-center justify-between text-xs text-slate-500 font-medium gap-2">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-amber-600" />
              Ponto de referência: Próximo à Praça Aquidauana
            </span>
            <span className="text-[11px] text-slate-400">
              Clique no marcador para mais detalhes da oficina
            </span>
          </div>
        </div>

        {/* Right Column: Physical Details Card */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-md flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-black uppercase text-amber-700 tracking-wide block">
                Endereço Físico Oficial
              </span>
              <h3 className="font-heading text-lg font-black text-slate-900 mt-0.5">
                Av. Vicente de Carvalho, 730
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Vicente de Carvalho / Vaz Lobo, Rio de Janeiro - RJ
              </p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                CEP: 21210-000
              </p>
            </div>

            {/* Operating Hours */}
            <div className="space-y-2 text-xs">
              <span className="font-black uppercase text-slate-800 flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-blue-600" />
                Horário de Funcionamento:
              </span>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-600">Segunda a Sexta:</span>
                  <strong className="text-slate-900">08:00 às 18:00</strong>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-slate-600">Sábado:</span>
                  <strong className="text-slate-900">08:00 às 13:00</strong>
                </div>
                <div className="flex justify-between font-medium text-slate-400 pt-1 border-t border-slate-200">
                  <span>Domingo e Feriados:</span>
                  <span>Fechado</span>
                </div>
              </div>
            </div>

            {/* Official Phones */}
            <div className="space-y-2 text-xs">
              <span className="font-black uppercase text-slate-800 flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-emerald-600" />
                Telefones Oficiais:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href={`tel:${SHOP_CONTACT_INFO.landlineRaw}`}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/50 transition-colors block"
                >
                  <span className="text-[10px] text-slate-500 font-bold block">Fixo Loja</span>
                  <strong className="font-mono text-sm text-slate-900 font-black">
                    {SHOP_CONTACT_INFO.phoneLandline}
                  </strong>
                </a>

                <a
                  href={`https://wa.me/${SHOP_CONTACT_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-400 bg-slate-50 hover:bg-emerald-50/50 transition-colors block"
                >
                  <span className="text-[10px] text-emerald-700 font-bold block">WhatsApp</span>
                  <strong className="font-mono text-sm text-slate-900 font-black">
                    {SHOP_CONTACT_INFO.whatsapp}
                  </strong>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-3.5 text-xs text-amber-950 space-y-1">
            <span className="font-black block uppercase text-[10px]">
              Demais Preços e Serviços:
            </span>
            <p className="font-medium text-[11px] leading-relaxed">
              Consulte pelo WhatsApp <strong>21-964122372</strong> ou telefone <strong>33811320</strong> para cotações personalizadas e peças específicas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
