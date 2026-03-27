-- ============================================
-- PUXIRUM — Schema do Banco de Dados
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- Tabela: cadastros (formulário de escuta)
CREATE TABLE IF NOT EXISTS cadastros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  cidade TEXT NOT NULL CHECK (cidade IN ('Santa Izabel', 'Marituba', 'Belém', 'Outra')),
  bairro TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  demanda_categoria TEXT NOT NULL CHECK (demanda_categoria IN ('Saúde', 'Segurança', 'Emprego', 'Educação', 'Infraestrutura', 'Outro')),
  demanda_detalhe TEXT CHECK (char_length(demanda_detalhe) <= 280),
  origem TEXT NOT NULL DEFAULT 'site' CHECK (origem IN ('site', 'porta_a_porta', 'evento', 'qr_code')),
  status TEXT NOT NULL DEFAULT 'recebida' CHECK (status IN ('recebida', 'encaminhada', 'com_retorno')),
  notas_equipe TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela: visitas (mapa interativo)
CREATE TABLE IF NOT EXISTS visitas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cidade TEXT NOT NULL,
  bairro TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  data_visita DATE NOT NULL,
  familias_ouvidas INTEGER DEFAULT 0,
  demanda_principal TEXT,
  depoimento_destaque TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela: devolutivas (consolidados quinzenais)
CREATE TABLE IF NOT EXISTS devolutivas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periodo_inicio DATE NOT NULL,
  periodo_fim DATE NOT NULL,
  total_demandas INTEGER DEFAULT 0,
  total_encaminhadas INTEGER DEFAULT 0,
  total_com_retorno INTEGER DEFAULT 0,
  resumo_html TEXT,
  publicado BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela: artigos (blog / SEO)
CREATE TABLE IF NOT EXISTS artigos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  titulo TEXT NOT NULL,
  conteudo_html TEXT NOT NULL,
  tipo TEXT CHECK (tipo IN ('pilar', 'satelite')),
  tags TEXT[] DEFAULT '{}',
  meta_description TEXT,
  publicado BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger para atualizar updated_at em cadastros
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cadastros_updated_at
  BEFORE UPDATE ON cadastros
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Índices para consultas frequentes
CREATE INDEX IF NOT EXISTS idx_cadastros_cidade ON cadastros (cidade);
CREATE INDEX IF NOT EXISTS idx_cadastros_status ON cadastros (status);
CREATE INDEX IF NOT EXISTS idx_cadastros_created ON cadastros (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitas_cidade ON visitas (cidade);
CREATE INDEX IF NOT EXISTS idx_artigos_slug ON artigos (slug);
CREATE INDEX IF NOT EXISTS idx_artigos_publicado ON artigos (publicado) WHERE publicado = true;

-- Row Level Security (RLS)
ALTER TABLE cadastros ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE devolutivas ENABLE ROW LEVEL SECURITY;
ALTER TABLE artigos ENABLE ROW LEVEL SECURITY;

-- Cadastros: qualquer um pode inserir (formulário público), só autenticados leem
CREATE POLICY "Permitir insert público em cadastros"
  ON cadastros FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir leitura autenticada em cadastros"
  ON cadastros FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir update autenticado em cadastros"
  ON cadastros FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Visitas: leitura pública (mapa), escrita autenticada
CREATE POLICY "Permitir leitura pública de visitas"
  ON visitas FOR SELECT
  USING (true);

CREATE POLICY "Permitir escrita autenticada em visitas"
  ON visitas FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Permitir update autenticado em visitas"
  ON visitas FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Devolutivas: leitura pública (só publicadas), escrita autenticada
CREATE POLICY "Permitir leitura pública de devolutivas publicadas"
  ON devolutivas FOR SELECT
  USING (publicado = true OR auth.role() = 'authenticated');

CREATE POLICY "Permitir escrita autenticada em devolutivas"
  ON devolutivas FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Permitir update autenticado em devolutivas"
  ON devolutivas FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Artigos: leitura pública (só publicados), escrita autenticada
CREATE POLICY "Permitir leitura pública de artigos publicados"
  ON artigos FOR SELECT
  USING (publicado = true OR auth.role() = 'authenticated');

CREATE POLICY "Permitir escrita autenticada em artigos"
  ON artigos FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Permitir update autenticado em artigos"
  ON artigos FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Contador público: função para contar cadastros sem expor dados
CREATE OR REPLACE FUNCTION contar_cadastros()
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM cadastros;
$$ LANGUAGE sql SECURITY DEFINER;
