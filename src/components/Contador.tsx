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
  const [target, setTarget] = useState(847); // fallback

  // Buscar contagem real do Supabase
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
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 bg-white rounded-2xl shadow-card border border-primary/[0.06] p-6 md:p-8 -mt-16 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-heading font-extrabold text-primary leading-none">
              {total.toLocaleString("pt-BR")}
            </p>
            <p className="text-primary/50 text-sm font-medium mt-0.5">
              demandas registradas
            </p>
          </div>
        </div>

        <div className="hidden sm:block w-px h-12 bg-primary/10" />

        <p className="text-primary/40 text-sm text-center sm:text-left max-w-xs">
          Pessoas de toda a região já registraram suas demandas pela plataforma.
        </p>
      </div>
    </div>
  );
}
