"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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

const STATS = [
  {
    label: "Demandas recebidas",
    description: "Vozes de toda a região registradas na plataforma de escuta popular.",
    accentColor: "bg-primary-lighter",
    accentBorder: "border-primary-lighter/40",
    image: "/images/card-demandas.jpg",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
      </svg>
    ),
  },
  {
    label: "Encaminhadas",
    description: "Demandas já encaminhadas aos órgãos e representantes responsáveis.",
    accentColor: "bg-accent",
    accentBorder: "border-accent/40",
    image: "/images/card-encaminhadas.jpg",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  },
  {
    label: "Com retorno",
    description: "Ações concretas que já geraram resultado para a comunidade.",
    accentColor: "bg-emerald-500",
    accentBorder: "border-emerald-500/40",
    image: "/images/card-retorno.jpg",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

function StatCard({
  stat,
  value,
  index,
  visible,
}: {
  stat: (typeof STATS)[number];
  value: number;
  index: number;
  visible: boolean;
}) {
  const count = useCountUp(value, 1600, visible);

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1.5 group min-h-[300px] md:min-h-[340px] flex flex-col justify-end"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease-out ${index * 80}ms, transform 0.6s ease-out ${index * 80}ms, box-shadow 0.3s, translate 0.3s`,
      }}
    >
      {/* Background image */}
      <Image
        src={stat.image}
        alt={stat.label}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
        unoptimized
      />

      {/* Gradient overlay — stronger at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/75 to-primary-dark/15" />

      {/* Accent top stripe */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] ${stat.accentColor}`} />

      {/* Bottom accent line on hover */}
      <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${stat.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Content */}
      <div className="relative z-10 p-6 md:p-7">
        {/* Icon badge */}
        <div className={`w-9 h-9 rounded-xl bg-white/10 border ${stat.accentBorder} backdrop-blur-sm flex items-center justify-center text-white mb-4`}>
          {stat.icon}
        </div>

        {/* Animated number */}
        <p className="text-5xl md:text-6xl font-heading font-extrabold text-white mb-1 tabular-nums tracking-tight leading-none">
          {count.toLocaleString("pt-BR")}
        </p>

        <p className="text-base font-heading font-bold text-white/90 mb-2">
          {stat.label}
        </p>
        <p className="text-sm text-white/50 leading-relaxed">
          {stat.description}
        </p>
      </div>
    </div>
  );
}

export default function Devolutivas() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [stats, setStats] = useState({ demandas: 847, encaminhadas: 312, retorno: 98 });

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("devolutivas")
      .select("total_demandas, total_encaminhadas, total_com_retorno")
      .eq("publicado", true)
      .order("periodo_fim", { ascending: false })
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) {
          setStats({
            demandas: data.total_demandas,
            encaminhadas: data.total_encaminhadas,
            retorno: data.total_com_retorno,
          });
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
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const statValues = [stats.demandas, stats.encaminhadas, stats.retorno];

  return (
    <section ref={ref} id="devolutivas" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-warm to-surface" />
      <div className="absolute inset-0 geo-pattern-dark" />
      <div className="absolute inset-0 diagonal-lines" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-lighter/[0.03] rounded-full blur-[100px]" />

      <div className="relative section-container">
        {/* Section header */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/[0.08] rounded-full px-3 py-1 mb-5">
            <svg className="w-3.5 h-3.5 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            <span className="text-primary/60 text-xs font-heading font-semibold tracking-wide uppercase">
              Transparência
            </span>
          </div>

          <h2 className="section-title">
            O que já ouvimos e o que estamos fazendo
          </h2>
          <p className="section-subtitle">
            A cada 15 dias publicamos um consolidado das demandas recebidas, o que
            foi encaminhado e o que teve retorno. Escuta sem devolutiva não é escuta.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-detail/40" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/10" />
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} value={statValues[i]} index={i} visible={visible} />
          ))}
        </div>

        <p
          className="text-center text-xs text-primary/30 mt-8 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: "400ms" }}
        >
          Dados atualizados quinzenalmente · Último consolidado: em breve
        </p>
      </div>
    </section>
  );
}
