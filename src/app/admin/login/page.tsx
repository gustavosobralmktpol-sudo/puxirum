"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        setError("Senha incorreta");
      }
    } catch {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark" />
      <div className="absolute inset-0 geo-pattern" />

      <div className="relative z-10 w-full max-w-sm px-5">
        <div className="text-center mb-8">
          <Image
            src="/images/logo-puxirum.png"
            alt="Puxirum"
            width={160}
            height={40}
            className="h-10 w-auto brightness-0 invert mx-auto mb-4"
            unoptimized
          />
          <p className="text-white/40 text-sm">Painel administrativo</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-deep p-6 md:p-8 space-y-5">
          <div>
            <label htmlFor="password" className="block text-sm font-heading font-semibold text-primary/80 mb-2">
              Senha de acesso
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3.5 rounded-xl border border-primary/10 focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all text-sm bg-white"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
