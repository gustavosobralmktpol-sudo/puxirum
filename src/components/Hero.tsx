export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light" />

      {/* Enhanced radial glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_68%_50%,rgba(201,148,46,0.13),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_35%_at_15%_25%,rgba(41,128,185,0.09),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_25%_30%_at_85%_75%,rgba(15,43,74,0.4),transparent)]" />

      {/* Left accent border */}
      <div className="absolute left-0 top-[20%] bottom-[20%] w-[2px] bg-gradient-to-b from-transparent via-accent/50 to-transparent hidden lg:block" />

      {/* Giant watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <span className="font-heading font-extrabold text-white text-[28vw] md:text-[20vw] leading-none tracking-tight opacity-[0.04]">
          PUXIRUM
        </span>
      </div>

      {/* Geometric dot pattern */}
      <div className="absolute inset-0 geo-pattern" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 pt-28 pb-36 md:pt-24 md:pb-28">
        {/* Desktop: two columns */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — staggered entrance */}
          <div>
            <div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6 opacity-0 animate-fade-up"
              style={{ animationDelay: "0ms" }}
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
              <span className="text-white/70 text-xs font-medium tracking-wide uppercase">
                Plataforma de escuta popular
              </span>
            </div>

            <p
              className="text-accent font-heading font-bold text-base tracking-widest uppercase mb-3 opacity-0 animate-fade-up"
              style={{ animationDelay: "100ms" }}
            >
              Watanabe Filho
            </p>

            <h1
              className="font-heading font-extrabold text-white mb-6 leading-[1.05] tracking-tight text-[3.5rem] opacity-0 animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              A região precisa de voz.{" "}
              <span className="text-gradient">Registre a sua.</span>
            </h1>

            <p
              className="text-lg text-white/55 mb-8 max-w-lg leading-relaxed font-body opacity-0 animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              O Puxirum é o canal permanente de escuta entre Watanabe Filho e a
              população do Pará. Sua demanda vira ação.
            </p>

            <div
              className="flex flex-wrap gap-2 mb-8 opacity-0 animate-fade-up"
              style={{ animationDelay: "380ms" }}
            >
              {["Escuta Popular", "Pré-candidato a Deputado Estadual", "Pará"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-white/50 bg-white/5 border border-white/10 rounded-full px-3 py-1 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              className="flex flex-row items-start gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: "460ms" }}
            >
              <a href="#formulario" className="btn-primary">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Quero participar
              </a>
              <a href="#devolutivas" className="btn-secondary">
                Conheça o projeto
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — video with enhanced frame + floating badge */}
          <div
            className="relative opacity-0 animate-fade-up"
            style={{ animationDelay: "250ms" }}
          >
            {/* Outer glow decoration */}
            <div className="absolute -inset-4 bg-gradient-to-br from-accent/12 to-primary-lighter/8 rounded-3xl blur-2xl -z-10" />

            {/* Gold corner accents */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-accent/40 rounded-tl-xl" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-accent/40 rounded-br-xl" />

            {/* Video */}
            <div className="relative rounded-2xl overflow-hidden shadow-deep border border-white/15 aspect-video">
              <iframe
                src="https://www.youtube.com/embed/ym1zJGAW3WE?rel=0&modestbranding=1"
                title="Watanabe Filho — Puxirum"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden">
          <div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-5 opacity-0 animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
            <span className="text-white/70 text-xs font-medium tracking-wide uppercase">
              Plataforma de escuta popular
            </span>
          </div>

          <p
            className="text-accent font-heading font-bold text-sm tracking-widest uppercase mb-5 opacity-0 animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            Watanabe Filho
          </p>

          <div
            className="relative mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: "150ms" }}
          >
            {/* Corner accents mobile */}
            <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-accent/40 rounded-tl-lg z-10" />
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-accent/40 rounded-br-lg z-10" />
            <div className="relative rounded-xl overflow-hidden shadow-deep border border-white/10 aspect-video">
              <iframe
                src="https://www.youtube.com/embed/ym1zJGAW3WE?rel=0&modestbranding=1&playsinline=1"
                title="Watanabe Filho — Puxirum"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            <div className="absolute -inset-3 bg-accent/10 rounded-2xl blur-xl -z-10" />
          </div>

          <h1
            className="font-heading font-extrabold text-white mb-5 leading-[1.05] tracking-tight text-[2rem] opacity-0 animate-fade-up"
            style={{ animationDelay: "250ms" }}
          >
            A região precisa de voz.{" "}
            <span className="text-gradient">Registre a sua.</span>
          </h1>

          <p
            className="text-base text-white/55 mb-6 leading-relaxed font-body opacity-0 animate-fade-up"
            style={{ animationDelay: "330ms" }}
          >
            O Puxirum é o canal permanente de escuta entre Watanabe Filho e a
            população do Pará. Sua demanda vira ação.
          </p>

          <div
            className="flex flex-wrap gap-2 mb-6 opacity-0 animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            {["Escuta Popular", "Pré-candidato a Deputado Estadual", "Pará"].map((tag) => (
              <span key={tag} className="text-xs text-white/50 bg-white/5 border border-white/10 rounded-full px-3 py-1 font-medium">
                {tag}
              </span>
            ))}
          </div>

          <div
            className="flex flex-col sm:flex-row items-start gap-3 opacity-0 animate-fade-up"
            style={{ animationDelay: "480ms" }}
          >
            <a href="#formulario" className="btn-primary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Quero participar
            </a>
            <a href="#devolutivas" className="btn-secondary">
              Conheça o projeto
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Floating decorative rings */}
      <div className="absolute top-[18%] left-[6%] w-24 h-24 border border-white/[0.06] rounded-full animate-float hidden md:block" />
      <div className="absolute top-[30%] right-[8%] w-16 h-16 border border-accent/10 rounded-full animate-float hidden lg:block" style={{ animationDelay: "-3s" }} />
      <div className="absolute bottom-[25%] left-[12%] w-10 h-10 border border-white/[0.05] rounded-full animate-float hidden md:block" style={{ animationDelay: "-1.5s" }} />
      <div className="absolute top-[55%] right-[14%] w-8 h-8 border border-accent/[0.07] rounded-full animate-float hidden lg:block" style={{ animationDelay: "-4s" }} />

      {/* Animated dots */}
      <div className="absolute top-[22%] right-[15%] w-2.5 h-2.5 bg-accent/20 rounded-full animate-pulse-slow hidden md:block" />
      <div className="absolute top-[65%] left-[8%] w-2 h-2 bg-white/10 rounded-full animate-pulse-slow hidden md:block" style={{ animationDelay: "-1s" }} />
      <div className="absolute bottom-[35%] right-[5%] w-3 h-3 bg-accent/15 rounded-full animate-pulse-slow hidden lg:block" style={{ animationDelay: "-2s" }} />
      <div className="absolute top-[45%] left-[3%] w-1.5 h-1.5 bg-white/15 rounded-full animate-pulse-slow hidden md:block" style={{ animationDelay: "-0.5s" }} />
      <div className="absolute bottom-[20%] left-[45%] w-2 h-2 bg-accent/10 rounded-full animate-pulse-slow hidden lg:block" style={{ animationDelay: "-3.5s" }} />
      <div className="absolute top-[12%] left-[40%] w-1.5 h-1.5 bg-white/10 rounded-full animate-pulse-slow hidden md:block" style={{ animationDelay: "-2.5s" }} />

      {/* Scroll indicator */}
      <div className="absolute bottom-28 md:bottom-20 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
        <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1.5">
          <div className="w-0.5 h-2 bg-white/40 rounded-full animate-float" style={{ animationDuration: "1.5s" }} />
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 100h1440V60c-240 30-480 45-720 40S240 70 0 40v60z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
