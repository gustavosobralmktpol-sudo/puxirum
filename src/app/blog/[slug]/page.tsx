import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArtigoPorSlug, getArtigos, getArtigosRelacionados } from "@/lib/blog-data";
import JsonLd from "@/components/JsonLd";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getArtigos().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const artigo = getArtigoPorSlug(params.slug);
  if (!artigo) return {};

  return {
    title: artigo.titulo,
    description: artigo.meta_description,
    openGraph: {
      title: artigo.titulo,
      description: artigo.meta_description,
      type: "article",
      publishedTime: artigo.data,
      authors: ["Watanabe Filho"],
      tags: artigo.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: artigo.titulo,
      description: artigo.meta_description,
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArtigoPage({ params }: Props) {
  const artigo = getArtigoPorSlug(params.slug);
  if (!artigo) notFound();

  const relacionados = getArtigosRelacionados(params.slug);
  const shareText = encodeURIComponent(`${artigo.titulo} — Puxirum`);
  const shareUrl = encodeURIComponent(`https://puxirum.vercel.app/blog/${artigo.slug}`);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: artigo.titulo,
          description: artigo.meta_description,
          datePublished: artigo.data,
          author: {
            "@type": "Person",
            name: "Watanabe Filho",
          },
          publisher: {
            "@type": "Organization",
            name: "Puxirum",
            url: "https://puxirum.vercel.app",
          },
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-primary-dark">
          <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/images/logo-puxirum.png"
                alt="Puxirum"
                width={140}
                height={36}
                className="h-8 w-auto brightness-0 invert"
                unoptimized
              />
            </Link>
            <Link
              href="/blog"
              className="text-white/60 hover:text-white text-sm font-medium transition-colors"
            >
              Voltar ao blog
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="relative bg-gradient-to-b from-primary-dark to-primary py-12 md:py-20 overflow-hidden">
          <div className="absolute inset-0 geo-pattern" />
          <div className="relative z-10 max-w-3xl mx-auto px-5">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-white/40 mb-6">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white/60 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-white/60 truncate max-w-[200px]">{artigo.titulo}</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <time dateTime={artigo.data} className="text-xs text-white/40 font-medium">
                {formatDate(artigo.data)}
              </time>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span
                className={`text-xs font-heading font-semibold uppercase tracking-wider ${
                  artigo.tipo === "pilar" ? "text-accent" : "text-primary-lighter"
                }`}
              >
                {artigo.tipo === "pilar" ? "Artigo principal" : "Nota"}
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-white text-2xl md:text-4xl lg:text-5xl mb-6 tracking-tight leading-tight">
              {artigo.titulo}
            </h1>

            <p className="text-white/50 text-base md:text-lg leading-relaxed">
              {artigo.resumo}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {artigo.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-white/40 bg-white/5 border border-white/10 rounded-full px-3 py-1 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-5 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">
            {/* Article content */}
            <article
              className="prose prose-lg max-w-none
                prose-headings:font-heading prose-headings:font-bold prose-headings:text-primary prose-headings:tracking-tight
                prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-p:text-primary/70 prose-p:leading-relaxed prose-p:mb-5
                prose-li:text-primary/70 prose-li:leading-relaxed
                prose-strong:text-primary prose-strong:font-semibold
                prose-ul:my-4 prose-ul:pl-5
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: artigo.conteudo }}
            />

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Share buttons */}
              <div className="bg-surface rounded-2xl p-5 border border-primary/[0.06]">
                <h3 className="font-heading font-bold text-primary text-sm uppercase tracking-wider mb-4">
                  Compartilhar
                </h3>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#25d366] text-white text-xs font-bold px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.87 9.87 0 01-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-primary-dark text-white text-xs font-bold px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    X
                  </a>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-primary-dark to-primary rounded-2xl p-6 text-center">
                <div className="absolute inset-0 geo-pattern rounded-2xl" />
                <p className="text-white font-heading font-bold text-base mb-2 relative">
                  Sua região tem demandas?
                </p>
                <p className="text-white/50 text-sm mb-4 relative">
                  Registre agora e faça sua voz ser ouvida.
                </p>
                <Link
                  href="/#formulario"
                  className="relative inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white text-sm font-heading font-bold px-5 py-2.5 rounded-full transition-all duration-300"
                >
                  Registrar demanda
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Link>
              </div>

              {/* Related articles */}
              <div>
                <h3 className="font-heading font-bold text-primary text-sm uppercase tracking-wider mb-4">
                  Leia também
                </h3>
                <div className="space-y-3">
                  {relacionados.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/blog/${rel.slug}`}
                      className="block group bg-white rounded-xl border border-primary/[0.06] p-4 hover:shadow-card transition-all duration-200"
                    >
                      <p className="text-xs text-primary/40 mb-1">{formatDate(rel.data)}</p>
                      <p className="font-heading font-bold text-primary text-sm group-hover:text-accent transition-colors leading-snug">
                        {rel.titulo}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-primary/[0.06] py-8">
          <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary/30">
            <p>&copy; {new Date().getFullYear()} Puxirum — Watanabe Filho</p>
            <div className="flex gap-4">
              <Link href="/blog" className="hover:text-primary/50 transition-colors">Blog</Link>
              <Link href="/" className="hover:text-primary/50 transition-colors">Início</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
