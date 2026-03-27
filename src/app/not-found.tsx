import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark" />
      <div className="absolute inset-0 geo-pattern" />

      <div className="relative z-10 text-center px-5 max-w-md">
        <div className="mb-6">
          <Image
            src="/images/logo-puxirum.png"
            alt="Puxirum"
            width={140}
            height={36}
            className="h-8 w-auto brightness-0 invert mx-auto"
            unoptimized
          />
        </div>

        <p className="text-accent font-heading font-bold text-7xl mb-4">404</p>
        <h1 className="text-white font-heading font-bold text-2xl mb-3">
          Página não encontrada
        </h1>
        <p className="text-white/40 text-sm leading-relaxed mb-8">
          Esta página não existe ou foi movida. Volte para o início e registre sua demanda.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-heading font-bold px-6 py-3 rounded-full transition-all duration-300"
        >
          ← Voltar ao início
        </Link>
      </div>
    </div>
  );
}
