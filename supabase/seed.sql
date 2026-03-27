-- ============================================
-- PUXIRUM — Dados de exemplo para desenvolvimento
-- Execute APÓS o schema.sql
-- ============================================

-- Cadastros de exemplo
INSERT INTO cadastros (nome, cidade, bairro, whatsapp, demanda_categoria, demanda_detalhe, origem, status) VALUES
  ('Maria Silva', 'Belém', 'Umarizal', '91999990001', 'Saúde', 'Posto de saúde do bairro fecha às 16h, impossível ir depois do trabalho.', 'site', 'encaminhada'),
  ('José Santos', 'Marituba', 'Centro', '91999990002', 'Infraestrutura', 'Rua Marechal alagada há 3 meses.', 'porta_a_porta', 'com_retorno'),
  ('Ana Oliveira', 'Santa Izabel', 'Americano', '91999990003', 'Educação', 'Escola municipal sem professor de matemática desde fevereiro.', 'site', 'encaminhada'),
  ('Carlos Mendes', 'Belém', 'Pedreira', '91999990004', 'Segurança', 'Iluminação pública queimada na Av. Pedro Miranda há 2 meses.', 'site', 'recebida'),
  ('Francisca Lima', 'Marituba', 'Decouville', '91999990005', 'Saúde', NULL, 'evento', 'recebida'),
  ('Pedro Costa', 'Belém', 'Sacramenta', '91999990006', 'Emprego', 'Falta de capacitação profissional para jovens.', 'qr_code', 'recebida'),
  ('Luciana Ferreira', 'Santa Izabel', 'Centro', '91999990007', 'Infraestrutura', 'Ponte do rio caiu e isolou comunidade.', 'porta_a_porta', 'encaminhada'),
  ('Roberto Souza', 'Belém', 'Guamá', '91999990008', 'Saúde', 'Faltam remédios básicos no posto.', 'site', 'com_retorno'),
  ('Tereza Alves', 'Marituba', 'Nova Marituba', '91999990009', 'Segurança', NULL, 'site', 'recebida'),
  ('João Ribeiro', 'Belém', 'Jurunas', '91999990010', 'Educação', 'Creche com fila de espera de 8 meses.', 'site', 'recebida');

-- Visitas de exemplo (para o mapa)
INSERT INTO visitas (cidade, bairro, latitude, longitude, data_visita, familias_ouvidas, demanda_principal, depoimento_destaque) VALUES
  ('Belém', 'Umarizal', -1.4420, -48.4898, '2026-03-01', 45, 'Saúde', 'A gente precisa de um posto que funcione no horário da gente.'),
  ('Belém', 'Pedreira', -1.3790, -48.4790, '2026-03-05', 62, 'Segurança', 'Meu filho não pode brincar na rua, é escuro demais.'),
  ('Belém', 'Guamá', -1.4050, -48.4880, '2026-03-08', 38, 'Saúde', 'O posto fecha cedo e a farmácia vive sem remédio.'),
  ('Marituba', 'Centro', -1.3560, -48.3420, '2026-03-10', 55, 'Infraestrutura', 'Quando chove, a rua vira rio.'),
  ('Marituba', 'Decouville', -1.3600, -48.3500, '2026-03-12', 30, 'Saúde', NULL),
  ('Santa Izabel', 'Americano', -1.2960, -48.1600, '2026-03-15', 28, 'Educação', 'A escola tá abandonada, sem professor, sem merenda.'),
  ('Santa Izabel', 'Centro', -1.2940, -48.1640, '2026-03-18', 42, 'Infraestrutura', 'A ponte caiu e a comunidade ficou isolada.');

-- Devolutiva de exemplo
INSERT INTO devolutivas (periodo_inicio, periodo_fim, total_demandas, total_encaminhadas, total_com_retorno, resumo_html, publicado) VALUES
  ('2026-03-01', '2026-03-15', 847, 312, 98, '<h3>Consolidado 01-15/Mar</h3><p>Saúde lidera as demandas com 38%, seguida de Infraestrutura (25%) e Segurança (18%).</p><p>312 demandas foram encaminhadas para órgãos competentes e 98 já receberam retorno.</p>', true);

-- Artigos de exemplo
INSERT INTO artigos (slug, titulo, conteudo_html, tipo, tags, meta_description, publicado) VALUES
  ('por-que-escutar-e-o-primeiro-passo', 'Por que escutar é o primeiro passo', '<p>Antes de propor qualquer solução, é preciso ouvir. O Puxirum nasce dessa convicção: a política começa na escuta.</p><p>Quando saímos às ruas, porta a porta, o que encontramos não são apenas demandas — são histórias, frustrações e esperanças.</p>', 'pilar', ARRAY['escuta popular', 'metodologia'], 'Entenda por que a escuta popular é o primeiro passo para uma política que funciona.', true),
  ('saude-publica-o-que-ouvimos-em-marituba', 'Saúde pública: o que ouvimos em Marituba', '<p>Em três dias de escuta porta a porta, a saúde apareceu como demanda principal em 68% dos registros.</p><p>Os problemas mais citados: horário limitado dos postos, falta de remédios e demora no atendimento.</p>', 'satelite', ARRAY['saúde', 'Marituba', 'devolutiva'], 'Relatório de escuta sobre saúde pública em Marituba — 68% das demandas sobre saúde.', true),
  ('infraestrutura-e-mobilidade-no-interior', 'Infraestrutura e mobilidade no interior do Pará', '<p>Estradas, pontes e transporte público são urgências que aparecem em todas as cidades visitadas.</p><p>Em Santa Izabel, a queda de uma ponte isolou uma comunidade inteira por semanas.</p>', 'satelite', ARRAY['infraestrutura', 'mobilidade', 'interior'], 'Panorama das demandas de infraestrutura e mobilidade no interior do Pará.', true),
  ('como-funciona-o-puxirum', 'Como funciona o Puxirum: da demanda à ação', '<p>O Puxirum tem um fluxo transparente: toda demanda recebida é classificada, encaminhada ao órgão competente e acompanhada até ter retorno.</p><p>A cada 15 dias, publicamos um consolidado público com os resultados.</p>', 'pilar', ARRAY['metodologia', 'transparência'], 'Conheça o fluxo completo do Puxirum: como sua demanda vira ação concreta.', true);
