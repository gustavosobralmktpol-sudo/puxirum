"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration, start]);

  return count;
}

export default function Contador() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState(847);

  useEffect(() => {
    if (!supabase) return;
    supabase.rpc("contar_cadastros").then(({ data, error }) => {
      if (!error && typeof data === "number" && data > 0) {
        setTarget(data);
      }
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const total = useCountUp(target, 2000, visible);

  return (
    <div ref={ref} className="relative">
      <div className="bg-white rounded-2xl shadow-card border border-primary/[0.06] p-6 md:p-8 -mt-16 relative z-10 overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-accent/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-lighter/[0.03] rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {/* Main stat */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/10 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-heading font-extrabold text-primary leading-none tabular-nums">
                {total.toLocaleString("pt-BR")}
              </p>
              <p className="text-primary/45 text-sm font-medium mt-1">
                demandas registradas
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-14 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />

          {/* Message + CTA */}
          <div className="text-center sm:text-left">
            <p className="text-primary/50 text-sm leading-relaxed max-w-xs mb-3">
              Pessoas de toda a região já registraram suas demandas. Faça parte.
            </p>
            <a
              href="#formulario"
              className="inline-flex items-center gap-1.5 text-accent font-heading font-semibold text-sm hover:gap-2.5 transition-all duration-200 group"
            >
              Registrar minha demanda
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
