export interface Artigo {
  slug: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  tipo: "pilar" | "satelite";
  tags: string[];
  data: string;
  meta_description: string;
}

// TODO: substituir por query ao Supabase quando configurado
const ARTIGOS: Artigo[] = [
  {
    slug: "por-que-escutar-e-o-primeiro-passo",
    titulo: "Porque escutar é o primeiro passo",
    resumo:
      "Antes de propor qualquer solução, é preciso ouvir. O Puxirum nasce dessa convicção: a política começa na escuta.",
    tipo: "pilar",
    tags: ["escuta popular", "metodologia"],
    data: "2026-03-20",
    meta_description:
      "Entenda por que a escuta popular é a base do Puxirum e como ela transforma demandas em ações concretas no Pará.",
    conteudo: `
      <p>A política tradicional opera de cima para baixo: o candidato elabora propostas no gabinete e apresenta ao eleitor. O Puxirum inverte essa lógica. Antes de propor qualquer solução, vamos ouvir.</p>

      <h2>O que é escuta popular?</h2>
      <p>Escuta popular é o processo de ir até as comunidades, bairro a bairro, e perguntar diretamente: qual é a maior necessidade da sua região? Não é pesquisa de opinião, não é enquete, é conversa olho no olho.</p>
      <p>Quando alguém te conta que precisa andar 40 minutos para chegar ao posto de saúde mais próximo, isso muda a forma como você entende o problema. Nenhum relatório substitui essa experiência.</p>

      <h2>Como funciona o Puxirum?</h2>
      <p>O Puxirum funciona em três etapas:</p>
      <ul>
        <li><strong>Registro:</strong> O cidadão registra sua demanda pelo site, WhatsApp ou presencialmente durante as escutas de rua.</li>
        <li><strong>Encaminhamento:</strong> Cada demanda é classificada e encaminhada ao órgão ou representante responsável.</li>
        <li><strong>Devolutiva:</strong> A cada 15 dias, publicamos o que foi feito com cada demanda recebida.</li>
      </ul>

      <h2>Por que isso importa?</h2>
      <p>Quando o representante escuta antes de propor, as soluções são mais precisas. Quando dá devolutiva, gera confiança. Porque escuta sem devolutiva não é escuta.</p>
      <p>O Puxirum existe para provar que é possível fazer diferente. A região precisa de voz. E nós estamos aqui para ouvir.</p>
    `,
  },
  {
    slug: "saude-publica-o-que-ouvimos-em-marituba",
    titulo: "Saúde pública: o que ouvimos em Marituba",
    resumo:
      "Em três dias de escuta porta a porta, a saúde apareceu como demanda principal em 68% dos registros. Veja o que encontramos.",
    tipo: "satelite",
    tags: ["saúde", "Marituba", "devolutiva"],
    data: "2026-03-15",
    meta_description:
      "Relatório da escuta popular em Marituba: 68% das demandas são sobre saúde pública. Veja os dados e as ações encaminhadas.",
    conteudo: `
      <p>Entre os dias 10 e 12 de março, a equipe do Puxirum realizou escutas em cinco bairros de Marituba. Foram 43 registros em três dias e os dados mostram que a maior dor da região é a saúde pública.</p>

      <h2>Os números</h2>
      <p>De todas as demandas registradas em Marituba:</p>
      <ul>
        <li><strong>68%</strong> mencionaram saúde como a maior necessidade</li>
        <li><strong>15%</strong> apontaram infraestrutura (ruas, saneamento)</li>
        <li><strong>10%</strong> falaram sobre segurança</li>
        <li><strong>7%</strong> citaram educação e emprego</li>
      </ul>

      <h2>O que ouvimos sobre saúde</h2>
      <p>Os relatos mais frequentes incluem:</p>
      <ul>
        <li>Falta de médicos especialistas no município</li>
        <li>Tempo de espera para consultas no SUS superior a 3 meses</li>
        <li>Unidades de saúde sem medicamentos básicos</li>
        <li>Dificuldade de acesso ao hospital de referência em Belém</li>
      </ul>

      <h2>Próximos passos</h2>
      <p>As 29 demandas de saúde foram encaminhadas à Secretaria Municipal de Saúde de Marituba e ao Conselho Estadual de Saúde. Acompanharemos as respostas e publicaremos a devolutiva na próxima quinzena.</p>
    `,
  },
  {
    slug: "infraestrutura-e-mobilidade-no-interior",
    titulo: "Infraestrutura e mobilidade no interior do Pará",
    resumo:
      "Estradas, pontes e transporte público são urgências que aparecem em todas as cidades. Um panorama das demandas recebidas.",
    tipo: "satelite",
    tags: ["infraestrutura", "mobilidade", "interior"],
    data: "2026-03-10",
    meta_description:
      "Panorama das demandas de infraestrutura e mobilidade registradas no Puxirum: estradas, pontes e transporte público no Pará.",
    conteudo: `
      <p>Se há uma demanda que aparece em todas as cidades onde o Puxirum passou, é infraestrutura. Estradas esburacadas, pontes precárias, transporte público insuficiente — o interior do Pará convive com problemas que limitam o acesso a tudo: saúde, educação, trabalho.</p>

      <h2>O cenário em números</h2>
      <p>Dos 847 registros recebidos até agora na plataforma:</p>
      <ul>
        <li><strong>23%</strong> mencionam infraestrutura como demanda principal</li>
        <li><strong>Santa Izabel e Marituba</strong> concentram a maioria das queixas sobre estradas</li>
        <li><strong>Belém</strong> lidera reclamações sobre transporte público</li>
      </ul>

      <h2>Relatos que marcaram</h2>
      <p>Em Santa Izabel, uma moradora do bairro Americano relatou que a ponte de acesso ao seu bairro está interditada há dois anos. Os moradores precisam fazer um desvio de 12 km para chegar ao centro da cidade.</p>
      <p>Em Marituba, o transporte público para o distrito industrial foi cortado em 2025, afetando centenas de trabalhadores que agora dependem de transporte clandestino.</p>

      <h2>O que estamos fazendo</h2>
      <p>Todas as demandas de infraestrutura foram compiladas e encaminhadas ao SETRAN, à Prefeitura de cada município e à bancada estadual. A devolutiva completa será publicada na próxima quinzena.</p>
    `,
  },
  {
    slug: "como-funciona-o-puxirum",
    titulo: "Como funciona o Puxirum: da demanda à ação",
    resumo:
      "Conheça o fluxo completo: como sua demanda é registrada, classificada, encaminhada e devolvida de forma transparente.",
    tipo: "pilar",
    tags: ["metodologia", "transparência"],
    data: "2026-03-05",
    meta_description:
      "Entenda o funcionamento completo do Puxirum: registro, classificação, encaminhamento e devolutiva das demandas populares.",
    conteudo: `
      <p>O Puxirum não é só um formulário. É um sistema completo de escuta, encaminhamento e devolutiva. Neste artigo, explicamos como cada etapa funciona — do momento em que você registra sua demanda até o retorno sobre o que foi feito.</p>

      <h2>1. Registro</h2>
      <p>Você pode registrar sua demanda de três formas:</p>
      <ul>
        <li><strong>Pelo site:</strong> Preencha o formulário na página inicial com seu nome, cidade, bairro e a demanda da sua região.</li>
        <li><strong>Por WhatsApp:</strong> Envie uma mensagem para nosso número e a equipe registra para você.</li>
        <li><strong>Presencialmente:</strong> Durante as escutas de rua, nossa equipe coleta demandas pessoalmente.</li>
      </ul>

      <h2>2. Classificação</h2>
      <p>Cada demanda é classificada por categoria (saúde, segurança, educação, infraestrutura, emprego) e por localidade. Isso nos permite identificar padrões e prioridades por região.</p>

      <h2>3. Encaminhamento</h2>
      <p>As demandas são agrupadas e encaminhadas aos órgãos responsáveis: secretarias municipais, estaduais, conselhos de direitos e representantes eleitos. Cada encaminhamento é registrado com protocolo.</p>

      <h2>4. Devolutiva</h2>
      <p>A cada 15 dias, publicamos um consolidado: quantas demandas foram recebidas, quantas foram encaminhadas e quantas já tiveram retorno. Porque escuta sem devolutiva não é escuta.</p>

      <h2>Transparência total</h2>
      <p>Todos os dados são públicos. Na seção de devolutivas do site, você acompanha os números em tempo real. No mapa, vê de onde vêm as demandas. No blog, lê os relatórios completos.</p>
    `,
  },
];

export function getArtigos(): Artigo[] {
  return ARTIGOS;
}

export function getArtigoPorSlug(slug: string): Artigo | undefined {
  return ARTIGOS.find((a) => a.slug === slug);
}

export function getArtigosRelacionados(slugAtual: string, limite = 3): Artigo[] {
  return ARTIGOS.filter((a) => a.slug !== slugAtual).slice(0, limite);
}
