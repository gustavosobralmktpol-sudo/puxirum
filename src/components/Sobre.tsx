import Image from "next/image";

export default function Sobre() {
  return (
    <section id="sobre" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-warm to-surface" />
      <div className="absolute inset-0 geo-pattern-dark" />
      <div className="absolute inset-0 diagonal-lines" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-lighter/[0.03] rounded-full blur-[100px]" />

      <div className="relative section-container">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/[0.08] rounded-full px-3 py-1 mb-5">
            <svg className="w-3.5 h-3.5 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
            <span className="text-primary/60 text-xs font-heading font-semibold tracking-wide uppercase">
              Sobre o projeto
            </span>
          </div>

          <h2 className="section-title">
            O que é o Tá no Mapa
          </h2>
          <p className="section-subtitle">
            O canal permanente de escuta entre Watanabe Filho e a população do Pará.
            Aqui, sua voz é ouvida, registrada e levada adiante.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-detail/40" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/10" />
          </div>
        </div>

        {/* Hero card — full-width photo with overlay */}
        <div className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 group max-w-5xl mx-auto">
          {/* Background image */}
          <Image
            src="/images/card-encaminhadas.jpg"
            alt="Watanabe Filho com a comunidade"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 1024px"
            unoptimized
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/70 to-primary-dark/40 md:to-transparent" />

          {/* Accent top stripe — red detail */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-detail" />

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 lg:p-16 min-h-[320px] md:min-h-[400px] flex flex-col justify-center max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1 mb-5 w-fit">
              <span className="w-2 h-2 rounded-full bg-detail animate-pulse" />
              <span className="text-white/80 text-xs font-heading font-semibold tracking-wide uppercase">
                Escuta popular
              </span>
            </div>

            <h3 className="font-heading font-extrabold text-white text-2xl md:text-3xl lg:text-4xl mb-4 leading-tight">
              Política que começa na rua, não no gabinete
            </h3>

            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              Antes de propor qualquer solução, ouvimos quem vive o problema
              todo dia. Bairro a bairro, pessoa a pessoa.
            </p>

            {/* 3 mini pillars */}
            <div className="flex flex-wrap gap-4">
              {[
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    </svg>
                  ),
                  label: "Escuta",
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  ),
                  label: "Proximidade",
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: "Transparência",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5"
                >
                  <span className="text-white/70">{item.icon}</span>
                  <span className="text-white/80 text-xs font-heading font-semibold">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
