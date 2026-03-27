import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  nome: z.string().min(3),
  cidade: z.string().min(1),
  bairro: z.string().min(2),
  whatsapp: z.string().min(10),
  demanda_categoria: z.string().min(1),
  demanda_detalhe: z.string().max(280).nullable().optional(),
  origem: z.enum(["site", "porta_a_porta", "evento", "qr_code"]),
});

// Rate limiting simples em memória
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hora

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Muitas tentativas. Tente novamente mais tarde." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Se Supabase está configurado, insere no banco
    if (supabase) {
      const { error } = await supabase.from("cadastros").insert({
        nome: data.nome,
        cidade: data.cidade,
        bairro: data.bairro,
        whatsapp: data.whatsapp,
        demanda_categoria: data.demanda_categoria,
        demanda_detalhe: data.demanda_detalhe || null,
        origem: data.origem,
        status: "recebida",
      });

      if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json(
          { error: "Erro ao salvar. Tente novamente." },
          { status: 500 }
        );
      }
    } else {
      // Supabase não configurado — loga no console para desenvolvimento
      console.log("📝 Novo cadastro (Supabase não configurado):", data);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
