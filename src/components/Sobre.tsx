export default function Sobre() {
  return (
    <section id="sobre" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 geo-pattern-dark" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />

      {/* Left accent bar — red detail */}
      <div className="absolute left-0 top-[20%] bottom-[20%] w-[2px] bg-gradient-to-b from-transparent via-detail/30 to-transparent hidden lg:block" />

      <div className="relative section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/15 rounded-full px-3 py-1 mb-5">
              <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              <span className="text-accent text-xs font-heading font-semibold tracking-wide uppercase">
                Sobre o projeto
              </span>
            </div>

            <h2 className="section-title">
              O que é o Tá no Mapa
            </h2>
            <p className="text-primary/55 text-base leading-relaxed mb-8 max-w-lg">
              O Tá no Mapa é o canal permanente de escuta entre Watanabe Filho e a
              população do Pará. Aqui, sua voz é ouvida, registrada e levada adiante.
            </p>

            {/* 3 pillars */}
            <div className="space-y-5">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    </svg>
                  ),
                  title: "Escuta",
                  text: "Ouvimos bairro a bairro, pessoa a pessoa. Cada registro importa.",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  ),
                  title: "Proximidade",
                  text: "Política que começa na rua, não no gabinete.",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: "Transparência",
                  text: "Tudo é público: dados, mapa, registros. Sem caixa-preta.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center shrink-0 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-primary text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-primary/45 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual highlight */}
          <div className="relative hidden lg:block">
            {/* Red corner accents */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-detail/40 rounded-tl-xl z-10" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-detail/40 rounded-br-xl z-10" />

            <div className="bg-white rounded-2xl shadow-card border border-primary/[0.06] p-8 relative overflow-hidden">
              {/* Decorative bg */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/[0.04] rounded-full blur-3xl pointer-events-none" />

              <div className="relative space-y-6">
                {/* Quote */}
                <div className="flex items-start gap-3">
                  <svg className="w-8 h-8 text-detail/30 shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <div>
                    <p className="text-primary/70 text-base leading-relaxed font-body italic">
                      A região precisa de voz. Antes de propor qualquer solução, precisamos ouvir quem vive o problema todo dia.
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-heading font-bold text-xs">WF</span>
                      </div>
                      <div>
                        <p className="text-primary font-heading font-semibold text-sm">Watanabe Filho</p>
                        <p className="text-primary/35 text-xs">Pré-candidato a Dep. Estadual</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="divider-glow" />

                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { value: "144+", label: "Cidades" },
                    { value: "24h", label: "Resposta" },
                    { value: "100%", label: "Público" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="font-heading font-extrabold text-primary text-lg">{stat.value}</p>
                      <p className="text-primary/35 text-xs font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
