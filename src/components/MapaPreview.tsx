"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PONTOS_MAPA, type PontoMapa } from "@/lib/mapa-data";
import { supabase } from "@/lib/supabase";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const MAP_CENTER: [number, number] = [-48.42, -1.38];
const MAP_ZOOM = 10.5;

function PlaceholderMapa() {
  return (
    <div className="aspect-[16/9] md:aspect-[2/1] bg-gradient-to-br from-primary-dark via-primary to-primary-light relative rounded-2xl overflow-hidden">
      <div className="absolute inset-0 geo-pattern opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 -m-8">
            <div className="w-full h-full rounded-full border border-white/10 animate-ping" style={{ animationDuration: "3s" }} />
          </div>
          <div className="relative animate-float">
            <svg className="w-12 h-12 text-accent drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
          <span className="text-white/80 text-sm font-medium">
            Configure NEXT_PUBLIC_MAPBOX_TOKEN para ativar o mapa
          </span>
        </div>
      </div>
    </div>
  );
}

function MapboxMapa() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [pontos, setPontos] = useState<PontoMapa[]>(PONTOS_MAPA);

  // Buscar pontos reais do Supabase (fallback para mockados)
  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("visitas")
      .select("bairro, cidade, latitude, longitude, familias_ouvidas, demanda_principal")
      .then(({ data }) => {
        if (data && data.length > 0) {
          setPontos(
            data.map((v, i) => ({
              id: i + 1,
              bairro: v.bairro,
              cidade: v.cidade,
              coords: [v.longitude, v.latitude] as [number, number],
              demandas: v.familias_ouvidas || 0,
              topDemanda: v.demanda_principal || "Geral",
            }))
          );
        }
      });
  }, []);

  const initMap = useCallback(async () => {
    if (!mapContainer.current || mapRef.current) return;

    const mapboxgl = (await import("mapbox-gl")).default;
    mapboxgl.accessToken = MAPBOX_TOKEN!;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      attributionControl: false,
      logoPosition: "bottom-right",
    });

    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "top-right"
    );

    map.on("load", () => {
      setLoaded(true);

      // Add pins
      pontos.forEach((ponto) => {
        // Create custom marker — wrapper div keeps Mapbox transform intact
        const el = document.createElement("div");
        el.style.cssText = "cursor: pointer; width: 36px; height: 36px;";

        const pin = document.createElement("div");
        pin.style.cssText = `
          width: 36px;
          height: 36px;
          background: #c9942e;
          border: 3px solid rgba(255,255,255,0.9);
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 0 0 4px rgba(201,148,46,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        `;
        pin.innerHTML = `<span style="color: white; font-size: 12px; font-weight: 700; pointer-events: none;">${ponto.demandas}</span>`;
        el.appendChild(pin);

        el.addEventListener("mouseenter", () => {
          pin.style.boxShadow = "0 2px 12px rgba(0,0,0,0.4), 0 0 0 6px rgba(201,148,46,0.35)";
          pin.style.borderColor = "white";
        });
        el.addEventListener("mouseleave", () => {
          pin.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3), 0 0 0 4px rgba(201,148,46,0.2)";
          pin.style.borderColor = "rgba(255,255,255,0.9)";
        });

        // Popup
        const popup = new mapboxgl.Popup({
          offset: 20,
          closeButton: false,
          maxWidth: "240px",
          className: "puxirum-popup",
        }).setHTML(`
          <div style="font-family: var(--font-heading), sans-serif; padding: 4px 0;">
            <p style="font-size: 15px; font-weight: 700; color: #0f2b4a; margin: 0 0 2px;">${ponto.bairro}</p>
            <p style="font-size: 12px; color: #0f2b4a99; margin: 0 0 10px;">${ponto.cidade}</p>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span style="background: #c9942e; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 99px;">${ponto.demandas} demandas</span>
            </div>
            <p style="font-size: 12px; color: #0f2b4a80; margin: 0;">Principal: <strong style="color: #0f2b4a;">${ponto.topDemanda}</strong></p>
          </div>
        `);

        new mapboxgl.Marker({ element: el })
          .setLngLat(ponto.coords)
          .setPopup(popup)
          .addTo(map);
      });
    });

    mapRef.current = map;
  }, [pontos]);

  useEffect(() => {
    initMap();
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [initMap]);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-card border border-primary/[0.06]">
      <div
        ref={mapContainer}
        className="aspect-[16/9] md:aspect-[2/1] w-full"
      />
      {!loaded && (
        <div className="absolute inset-0 bg-primary-dark flex items-center justify-center">
          <div className="flex items-center gap-3 text-white/50">
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-sm font-medium">Carregando mapa...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MapaPreview() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setShouldRender(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="mapa" className="relative overflow-hidden">
      {/* Textured background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-surface to-white" />
      <div className="absolute inset-0 geo-pattern-dark" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px]" />

      <div className="section-container relative">
      <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/5 rounded-full px-3 py-1 mb-4">
            <svg className="w-4 h-4 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="text-primary/60 text-xs font-heading font-semibold tracking-wide uppercase">
              Mapa da Escuta
            </span>
          </div>
          <h2 className="section-title">De onde vêm as demandas</h2>
          <p className="section-subtitle">
            Veja por onde já passamos e o que coletamos. Cada pin representa um
            bairro visitado e suas demandas.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {shouldRender && MAPBOX_TOKEN ? <MapboxMapa /> : <PlaceholderMapa />}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-primary/40">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-accent border-2 border-white shadow-sm" />
            <span>Bairro com demandas</span>
          </div>
          <span className="hidden sm:inline text-primary/20">|</span>
          <span>Clique nos pins para ver detalhes</span>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-primary/40 mb-3">
            Seu bairro ainda não tá no mapa?
          </p>
          <a href="#formulario" className="btn-outline">
            Cadastre sua demanda
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </div>
      </div>
      </div>
    </section>
  );
}
