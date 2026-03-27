export interface Cadastro {
  id?: string;
  nome: string;
  cidade: string;
  bairro: string;
  whatsapp: string;
  demanda_categoria: string;
  demanda_detalhe?: string;
  origem: "site" | "porta_a_porta" | "evento" | "qr_code";
  status: "recebida" | "encaminhada" | "com_retorno";
  notas_equipe?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Visita {
  id?: string;
  cidade: string;
  bairro: string;
  latitude: number;
  longitude: number;
  data_visita: string;
  familias_ouvidas: number;
  demanda_principal?: string;
  depoimento_destaque?: string;
  created_at?: string;
}

export interface Devolutiva {
  id?: string;
  periodo_inicio: string;
  periodo_fim: string;
  total_demandas: number;
  total_encaminhadas: number;
  total_com_retorno: number;
  resumo_html: string;
  publicado: boolean;
  created_at?: string;
}

export interface Artigo {
  id?: string;
  slug: string;
  titulo: string;
  conteudo_html: string;
  tipo: "pilar" | "satelite";
  tags: string[];
  meta_description?: string;
  publicado: boolean;
  created_at?: string;
}

export type CidadeOption = "Santa Izabel" | "Marituba" | "Belém" | "Outra";

export type DemandaCategoria =
  | "Saúde"
  | "Segurança"
  | "Emprego"
  | "Educação"
  | "Infraestrutura"
  | "Outro";
