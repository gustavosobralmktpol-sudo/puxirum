"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const STATS = [
  {
    value: "847",
    label: "Demandas recebidas",
    description: "Vozes de toda a região registradas na plataforma de escuta popular.",
    color: "text-white",
    accentColor: "bg-primary-lighter",
    // TROQUE: substitua pela foto real de escuta comunitária
    image: "/images/card-demandas.jpg",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
      </svg>
    ),
  },
  {
    value: "312",
    label: "Encaminhadas",
    description: "Demandas já encaminhadas aos órgãos e representantes responsáveis.",
    color: "text-white",
    accentColor: "bg-accent",
    // TROQUE: substitua pela foto real de ação política
    image: "/images/card-encaminhadas.jpg",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  },
  {
    value: "98",
    label: "Com retorno",
    description: "Ações concretas que já geraram resultado para a comunidade.",
    color: "text-white",
    accentColor: "bg-emerald-500",
    // TROQUE: substitua pela foto real de comunidade beneficiada
    image: "/images/card-retorno.jpg",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function Devolutivas() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [stats, setStats] = useState({ demandas: "847", encaminhadas: "312", retorno: "98" });

  // Buscar devolutivas reais do Supabase
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
            demandas: String(data.total_demandas),
            encaminhadas: String(data.total_encaminhadas),
            retorno: String(data.total_com_retorno),
          });
        }
      });
  }, []);

  // Update STATS values dynamically
  const dynamicStats = STATS.map((s, i) => ({
    ...s,
    value: i === 0 ? stats.demandas : i === 1 ? stats.encaminhadas : stats.retorno,
  }));

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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="devolutivas" className="relative overflow-hidden">
      {/* Textured background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-warm to-surface" />
      <div className="absolute inset-0 geo-pattern-dark" />
      <div className="absolute inset-0 diagonal-lines" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-lighter/[0.03] rounded-full blur-[100px]" />

      <div className="relative section-container">
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="inline-flex items-center gap-2 bg-primary/5 rounded-full px-3 py-1 mb-4">
            <svg className="w-4 h-4 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
        </div>

        {/* Cards with background images */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto stagger-children ${visible ? "visible" : ""}`}>
          {dynamicStats.map((stat) => (
            <div
              key={stat.label}
              className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 group min-h-[280px] md:min-h-[320px] flex flex-col justify-end"
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

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/70 to-primary-dark/20" />

              {/* Accent stripe top */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${stat.accentColor}`} />

              {/* Content */}
              <div className="relative z-10 p-6">
                <div className={`w-10 h-10 rounded-xl ${stat.accentColor}/20 flex items-center justify-center text-white mb-3 backdrop-blur-sm border border-white/10`}>
                  {stat.icon}
                </div>
                <p className={`text-4xl md:text-5xl font-heading font-extrabold ${stat.color} mb-1 tabular-nums`}>
                  {stat.value}
                </p>
                <p className="text-base font-heading font-bold text-white/90 mb-2">
                  {stat.label}
                </p>
                <p className="text-sm text-white/50 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className={`text-center text-xs text-primary/30 mt-8 transition-all duration-700 delay-500 ${visible ? "opacity-100" : "opacity-0"}`}>
          Dados atualizados quinzenalmente. Último consolidado: em breve.
        </p>
      </div>
    </section>
  );
}
