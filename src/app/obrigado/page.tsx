"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

const STEPS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859" />
      </svg>
    ),
    title: "Recebemos",
    desc: "Sua demanda foi registrada na plataforma",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
    title: "Encaminhamos",
    desc: "Classificamos e enviamos ao órgão responsável",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Devolvemos",
    desc: "Publicamos o retorno a cada 15 dias",
  },
];

function ObrigadoContent() {
  const params = useSearchParams();
  const nome = params.get("nome") || "participante";
  const cidade = params.get("cidade") || "";
  const tema = params.get("tema") || "";
  const bairro = params.get("bairro") || "";

  const shareText = `Acabei de registrar minha demanda no Puxirum — a plataforma de escuta popular de Watanabe Filho. Registre a sua também!`;
  const shareUrl = "https://puxirum.vercel.app";
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary to-primary-light" />
      <div className="absolute inset-0 geo-pattern" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(66,153,225,0.1),transparent)]" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-5 py-16">
        <div className="max-w-lg w-full">
          {/* Main card */}
          <div className="bg-white rounded-2xl shadow-deep p-8 md:p-10 text-center animate-fade-up">
            {/* Animated check */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping" style={{ animationDuration: "2s" }} />
              <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(16,185,129,0.4)]">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} style={{ strokeDasharray: 30, strokeDashoffset: 30, animation: "checkDraw 0.6s ease-out 0.3s forwards" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">
              Obrigado, {nome.split(" ")[0]}!
            </h1>

            <p className="text-primary/55 mb-6 leading-relaxed font-body">
              Sua demanda
              {tema && (
                <> sobre <strong className="text-primary font-semibold">{tema}</strong></>
              )}
              {bairro && cidade && (
                <> em <strong className="text-primary font-semibold">{bairro}, {cidade}</strong></>
              )}
              {" "}foi registrada com sucesso.
            </p>

            {/* Divider */}
            <div className="divider-glow mb-6" />

            {/* Steps: O que acontece agora? */}
            <div className="mb-8">
              <p className="text-xs font-heading font-semibold text-primary/40 uppercase tracking-wider mb-4">
                O que acontece agora?
              </p>
              <div className="space-y-3">
                {STEPS.map((step, i) => (
                  <div
                    key={step.title}
                    className="flex items-center gap-3 text-left animate-fade-up"
                    style={{ animationDelay: `${0.4 + i * 0.15}s` }}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      i === 0 ? "bg-primary-lighter/10 text-primary-lighter" :
                      i === 1 ? "bg-accent/10 text-accent" :
                      "bg-emerald-500/10 text-emerald-500"
                    }`}>
                      {step.icon}
                    </div>
                    <div>
                      <p className="text-sm font-heading font-bold text-primary">{step.title}</p>
                      <p className="text-xs text-primary/40">{step.desc}</p>
                    </div>
                    {i < STEPS.length - 1 && (
                      <svg className="w-4 h-4 text-primary/15 ml-auto shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Convide um vizinho pelo WhatsApp
              </a>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-8 rounded-full border-2 border-primary/10 text-primary font-heading font-semibold text-base hover:border-primary/20 hover:bg-primary/[0.03] transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar ao Puxirum
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for check animation */}
      <style jsx>{`
        @keyframes checkDraw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

export default function ObrigadoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-primary-dark">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      }
    >
      <ObrigadoContent />
    </Suspense>
  );
}
