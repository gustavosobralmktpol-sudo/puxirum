"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/watanabefilho/",
    color: "from-[#f09433] via-[#e6683c] to-[#bc1888]",
    hoverBg: "hover:bg-pink-50",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61583663803021",
    color: "from-[#1877f2] to-[#1877f2]",
    hoverBg: "hover:bg-blue-50",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@watanabe.filho",
    color: "from-[#000000] to-[#000000]",
    hoverBg: "hover:bg-gray-100",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "#",
    color: "from-[#25d366] to-[#128c7e]",
    hoverBg: "hover:bg-green-50",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

export default function RedesSociais() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
    <section ref={ref} className="relative overflow-hidden">
      {/* Layered cool blue background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EDF2F7] via-[#F0F5FA] to-[#EBF0F7]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_10%_50%,rgba(66,153,225,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_90%_80%,rgba(27,79,138,0.04),transparent)]" />
      <div className="absolute inset-0 geo-pattern opacity-20" />

      {/* Left accent bar — red detail */}
      <div className="absolute left-0 top-[15%] bottom-[15%] w-[3px] bg-gradient-to-b from-transparent via-detail/40 to-transparent" />

      <div className="relative section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: text + profile card */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
            }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/12 border border-accent/20 rounded-full px-3 py-1 mb-5">
              <svg className="w-3.5 h-3.5 text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              <span className="text-accent-dark text-xs font-heading font-semibold tracking-wide uppercase">
                Redes Sociais
              </span>
            </div>

            <h2 className="section-title !text-primary-dark">
              Vamos continuar essa conversa nas redes
            </h2>
            <p className="text-primary/50 text-base leading-relaxed mb-8 max-w-md">
              Acompanhe o dia a dia do trabalho, participe das discussões e fique por dentro de tudo que acontece no Puxirum.
            </p>

            {/* Profile card */}
            <div className="bg-white rounded-2xl shadow-card border border-primary/[0.05] p-5 max-w-sm relative overflow-hidden">
              {/* Top accent line — red detail */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-detail/40 via-detail to-detail/40" />

              {/* Subtle bg decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/[0.04] rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-4 mb-5 relative">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary-lighter/30 shrink-0 shadow-sm">
                  <Image
                    src="/images/watanabe foto.jpg"
                    alt="Watanabe Filho"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="font-heading font-bold text-primary text-base leading-tight">
                    Watanabe Filho
                  </p>
                  <p className="text-primary/40 text-sm mt-0.5">
                    @watanabefilho
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[11px] text-emerald-600 font-medium">Ativo nas redes</span>
                  </div>
                </div>
              </div>

              {/* Social links grid */}
              <div className="grid grid-cols-4 gap-2">
                {SOCIAL_LINKS.slice(0, 4).map((social, i) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href !== "#" ? "_blank" : undefined}
                    rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-surface ${social.hoverBg} transition-all duration-200 group hover:scale-105`}
                    aria-label={social.name}
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(8px)",
                      transition: `opacity 0.5s ease-out ${200 + i * 60}ms, transform 0.5s ease-out ${200 + i * 60}ms`,
                    }}
                  >
                    <span className="text-primary/50 group-hover:text-primary transition-colors">
                      {social.icon}
                    </span>
                    <span className="text-[10px] font-semibold text-primary/35 group-hover:text-primary/60 transition-colors">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: featured image with CTA */}
          <div
            className="relative"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease-out 150ms, transform 0.7s ease-out 150ms",
            }}
          >
            {/* Outer glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-accent/8 to-primary-lighter/5 rounded-3xl blur-2xl -z-10" />

            {/* Red corner accents — Pará detail */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-detail/40 rounded-tl-xl z-10" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-detail/40 rounded-br-xl z-10" />

            <div className="relative rounded-2xl overflow-hidden shadow-deep aspect-[4/3] bg-gradient-to-br from-primary-dark to-primary border border-white/10">
              <Image
                src="/images/card-encaminhadas.jpg"
                alt="Watanabe Filho com a comunidade"
                fill
                className="object-cover opacity-60 transition-transform duration-700 hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/92 via-primary-dark/45 to-transparent" />

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 rounded-full px-2.5 py-0.5 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
                  <p className="text-accent font-heading font-bold text-xs uppercase tracking-wider">
                    Acompanhe
                  </p>
                </div>
                <p className="text-white font-heading font-bold text-xl md:text-2xl mb-5 leading-tight">
                  O trabalho que fazemos pela nossa região
                </p>
                <a
                  href="https://www.instagram.com/watanabefilho/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white text-sm font-heading font-bold px-5 py-2.5 rounded-full transition-all duration-300 shadow-glow hover:shadow-[0_0_50px_-10px_rgba(66,153,225,0.5)] group"
                >
                  Siga no Instagram
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
