"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { CIDADES, DEMANDA_CATEGORIAS } from "@/lib/constants";

const schema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cidade: z.string().min(1, "Selecione uma cidade"),
  bairro: z.string().min(2, "Informe seu bairro"),
  whatsapp: z
    .string()
    .min(14, "WhatsApp inválido")
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Formato: (91) 99999-9999"),
  demanda_categoria: z.string().min(1, "Selecione uma demanda"),
  demanda_detalhe: z.string().max(280, "Máximo 280 caracteres").optional(),
  website: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7)
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function FormEscuta() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      cidade: "",
      bairro: "",
      whatsapp: "",
      demanda_categoria: "",
      demanda_detalhe: "",
      website: "",
    },
  });

  const detalheValue = watch("demanda_detalhe") || "";

  async function onSubmit(data: FormData) {
    if (data.website) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.nome,
          cidade: data.cidade,
          bairro: data.bairro,
          whatsapp: data.whatsapp.replace(/\D/g, ""),
          demanda_categoria: data.demanda_categoria,
          demanda_detalhe: data.demanda_detalhe || null,
          origem: "site",
        }),
      });

      if (res.ok) {
        const params = new URLSearchParams({
          nome: data.nome,
          cidade: data.cidade,
          tema: data.demanda_categoria,
          bairro: data.bairro,
        });
        router.push(`/obrigado?${params.toString()}`);
      } else {
        alert("Erro ao enviar. Tente novamente.");
      }
    } catch {
      alert("Erro de conexão. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputBase =
    "w-full px-4 py-3.5 rounded-xl border bg-white text-primary font-body text-sm placeholder:text-primary/30 outline-none transition-all duration-200";
  const inputNormal = `${inputBase} border-primary/10 focus:border-accent focus:ring-2 focus:ring-accent/10 focus:shadow-[0_0_0_3px_rgba(66,153,225,0.08)]`;
  const inputError = `${inputBase} border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/10`;
  const errorClass = "text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1";

  return (
    <section
      ref={sectionRef}
      id="formulario"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Rich dark background */}
      <div className="absolute inset-0 section-dark" />
      <div className="absolute inset-0 geo-pattern" />
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/[0.07] rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary-lighter/[0.05] rounded-full blur-[100px]" />

      {/* Left accent bar — red detail */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-gradient-to-b from-transparent via-detail/30 to-transparent hidden lg:block" />

      <div
        className="relative z-10 max-w-2xl mx-auto px-5 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)" }}
      >
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/20 rounded-full px-3 py-1 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
            <span className="text-accent text-xs font-heading font-semibold tracking-wider uppercase">
              Registre sua demanda
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-3 leading-tight tracking-tight">
            Sua voz vale
          </h2>
          <p className="text-base md:text-lg text-white/45 max-w-md mx-auto leading-relaxed font-body">
            Conte pra gente o que sua região mais precisa. Vamos encaminhar.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-deep border border-white/5 overflow-hidden">
          {/* Card header accent */}
          <div className="h-1 bg-gradient-to-r from-accent/60 via-accent to-accent/60" />

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-0">
            {/* Honeypot */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <input type="text" {...register("website")} tabIndex={-1} autoComplete="off" />
            </div>

            {/* Step 1: Quem você é */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <span className="text-accent font-heading font-bold text-[10px]">1</span>
                </div>
                <span className="text-primary/40 text-xs font-heading font-semibold uppercase tracking-wider">
                  Quem você é
                </span>
                <div className="flex-1 h-px bg-primary/5" />
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-semibold text-primary/70 mb-1.5 font-heading">
                    Nome completo
                  </label>
                  <input
                    id="nome"
                    type="text"
                    placeholder="Seu nome completo"
                    className={errors.nome ? inputError : inputNormal}
                    {...register("nome")}
                  />
                  {errors.nome && (
                    <p className={errorClass}>
                      <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.nome.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cidade" className="block text-sm font-semibold text-primary/70 mb-1.5 font-heading">
                      Cidade
                    </label>
                    <select
                      id="cidade"
                      className={errors.cidade ? inputError : inputNormal}
                      {...register("cidade")}
                    >
                      <option value="">Selecione...</option>
                      {CIDADES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {errors.cidade && (
                      <p className={errorClass}>
                        <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.cidade.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bairro" className="block text-sm font-semibold text-primary/70 mb-1.5 font-heading">
                      Bairro
                    </label>
                    <input
                      id="bairro"
                      type="text"
                      placeholder="Seu bairro"
                      className={errors.bairro ? inputError : inputNormal}
                      {...register("bairro")}
                    />
                    {errors.bairro && (
                      <p className={errorClass}>
                        <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.bairro.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-semibold text-primary/70 mb-1.5 font-heading">
                    WhatsApp
                  </label>
                  <input
                    id="whatsapp"
                    type="tel"
                    placeholder="(91) 99999-9999"
                    className={errors.whatsapp ? inputError : inputNormal}
                    {...register("whatsapp")}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value);
                      setValue("whatsapp", formatted, { shouldValidate: false });
                    }}
                  />
                  {errors.whatsapp && (
                    <p className={errorClass}>
                      <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.whatsapp.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Sua demanda */}
            <div className="mb-6 mt-10 pt-8 border-t border-primary/[0.06]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <span className="text-accent font-heading font-bold text-[10px]">2</span>
                </div>
                <span className="text-primary/40 text-xs font-heading font-semibold uppercase tracking-wider">
                  Sua demanda
                </span>
                <div className="flex-1 h-px bg-primary/5" />
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="demanda_categoria" className="block text-sm font-semibold text-primary/70 mb-1.5 font-heading">
                    Qual a maior demanda da sua região?
                  </label>
                  <select
                    id="demanda_categoria"
                    className={errors.demanda_categoria ? inputError : inputNormal}
                    {...register("demanda_categoria")}
                  >
                    <option value="">Selecione uma categoria...</option>
                    {DEMANDA_CATEGORIAS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  {errors.demanda_categoria && (
                    <p className={errorClass}>
                      <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.demanda_categoria.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="demanda_detalhe" className="block text-sm font-semibold text-primary/70 mb-1.5 font-heading">
                    Conte mais{" "}
                    <span className="font-normal text-primary/35">(opcional)</span>
                  </label>
                  <textarea
                    id="demanda_detalhe"
                    rows={3}
                    placeholder="Descreva com mais detalhes, se quiser..."
                    className={`${inputNormal} resize-none`}
                    maxLength={280}
                    {...register("demanda_detalhe")}
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-primary/30">
                      Quanto mais detalhes, melhor podemos ajudar.
                    </span>
                    <span className="text-xs text-primary/30 tabular-nums">
                      {detalheValue.length}
                      <span className="text-primary/20">/280</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-base py-4"
            >
              {submitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  Enviar minha demanda
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-white/20 mt-4 leading-relaxed">
          Seus dados são protegidos e usados exclusivamente para encaminhar sua demanda.
        </p>
      </div>
    </section>
  );
}
