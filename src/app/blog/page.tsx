import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Puxirum | Watanabe Filho",
  description:
    "Artigos, notas e reflexões sobre as demandas da população do Pará. Acompanhe o trabalho de escuta popular.",
};

// TODO: buscar artigos do Supabase quando configurado
const ARTIGOS_PLACEHOLDER = [
  {
    slug: "por-que-escutar-e-o-primeiro-passo",
    titulo: "Por que escutar é o primeiro passo",
    resumo:
      "Antes de propor qualquer solução, é preciso ouvir. O Puxirum nasce dessa convicção: a política começa na escuta.",
    tipo: "pilar" as const,
    tags: ["escuta popular", "metodologia"],
    data: "2026-03-20",
  },
  {
    slug: "saude-publica-o-que-ouvimos-em-marituba",
    titulo: "Saúde pública: o que ouvimos em Marituba",
    resumo:
      "Em três dias de escuta porta a porta, a saúde apareceu como demanda principal em 68% dos registros. Veja o que encontramos.",
    tipo: "satelite" as const,
    tags: ["saúde", "Marituba", "devolutiva"],
    data: "2026-03-15",
  },
  {
    slug: "infraestrutura-e-mobilidade-no-interior",
    titulo: "Infraestrutura e mobilidade no interior do Pará",
    resumo:
      "Estradas, pontes e transporte público são urgências que aparecem em todas as cidades. Um panorama das demandas recebidas.",
    tipo: "satelite" as const,
    tags: ["infraestrutura", "mobilidade", "interior"],
    data: "2026-03-10",
  },
  {
    slug: "como-funciona-o-puxirum",
    titulo: "Como funciona o Puxirum: da demanda à ação",
    resumo:
      "Conheça o fluxo completo: como sua demanda é registrada, classificada, encaminhada e devolvida de forma transparente.",
    tipo: "pilar" as const,
    tags: ["metodologia", "transparência"],
    data: "2026-03-05",
  },
];

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-primary-dark">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white font-heading font-extrabold text-sm">P</span>
            </div>
            <span className="text-white font-heading font-bold text-lg tracking-wide">
              PUXIRUM
            </span>
          </Link>
          <Link
            href="/"
            className="text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-primary-dark to-primary py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 geo-pattern" />
        <div className="relative z-10 max-w-6xl mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <span className="text-white/70 text-xs font-heading font-semibold tracking-wide uppercase">
              Blog
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-white text-3xl md:text-5xl mb-4 tracking-tight">
            Notas da escuta
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto">
            Artigos, reflexões e devolutivas sobre o que ouvimos nas ruas do Pará.
          </p>
        </div>
      </section>

      {/* Articles grid */}
      <section className="max-w-4xl mx-auto px-5 py-12 md:py-16">
        <div className="space-y-6">
          {ARTIGOS_PLACEHOLDER.map((artigo) => (
            <article
              key={artigo.slug}
              className="group bg-white rounded-2xl border border-primary/[0.06] shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <time
                    dateTime={artigo.data}
                    className="text-xs text-primary/40 font-medium"
                  >
                    {formatDate(artigo.data)}
                  </time>
                  <span className="w-1 h-1 rounded-full bg-primary/20" />
                  <span
                    className={`text-xs font-heading font-semibold uppercase tracking-wider ${
                      artigo.tipo === "pilar"
                        ? "text-accent"
                        : "text-primary-lighter"
                    }`}
                  >
                    {artigo.tipo === "pilar" ? "Artigo principal" : "Nota"}
                  </span>
                </div>

                <h2 className="font-heading font-bold text-primary text-lg md:text-xl mb-3 group-hover:text-primary-lighter transition-colors">
                  {artigo.titulo}
                </h2>

                <p className="text-primary/50 text-sm leading-relaxed mb-4">
                  {artigo.resumo}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {artigo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-primary/[0.04] text-primary/50 px-2.5 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-primary-lighter text-sm font-heading font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    Ler
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-primary/30 text-sm">
            Mais artigos em breve. Acompanhe nas redes sociais.
          </p>
        </div>
      </section>

      {/* Simple footer */}
      <footer className="border-t border-primary/[0.06] py-8">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary/30">
          <p>&copy; {new Date().getFullYear()} Puxirum — Watanabe Filho</p>
          <Link href="/" className="hover:text-primary/50 transition-colors">
            Voltar ao início
          </Link>
        </div>
      </footer>
    </div>
  );
}
