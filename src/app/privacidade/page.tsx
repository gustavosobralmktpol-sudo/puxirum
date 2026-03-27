import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidade | Puxirum",
  description:
    "Saiba como o Puxirum coleta, usa e protege seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018).",
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "1. Quem somos",
    content: (
      <>
        <p>
          O <strong>Puxirum</strong> é uma plataforma de escuta popular gerida por{" "}
          <strong>Watanabe Filho</strong>, pré-candidato a deputado estadual pelo Pará. Para fins da
          Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018), Watanabe Filho é o{" "}
          <strong>controlador</strong> dos dados pessoais coletados nesta plataforma.
        </p>
        <p>
          Contato:{" "}
          <a href="mailto:contato@puxirum.com.br" className="text-accent hover:underline">
            contato@puxirum.com.br
          </a>
        </p>
      </>
    ),
  },
  {
    title: "2. Quais dados coletamos",
    content: (
      <>
        <p>Ao registrar uma demanda, coletamos os seguintes dados:</p>
        <ul>
          <li>Nome completo</li>
          <li>Número de WhatsApp</li>
          <li>Cidade e bairro de residência</li>
          <li>Categoria e descrição da demanda</li>
          <li>Origem do acesso (como você chegou ao site)</li>
        </ul>
        <p>
          Também coletamos automaticamente: endereço IP (para proteção contra abuso) e dados de
          navegação agregados (através de ferramentas de analytics, sem identificação individual).
        </p>
      </>
    ),
  },
  {
    title: "3. Para que usamos seus dados",
    content: (
      <>
        <p>Seus dados são utilizados exclusivamente para:</p>
        <ul>
          <li>Registrar e encaminhar sua demanda aos órgãos e representantes responsáveis</li>
          <li>Entrar em contato pelo WhatsApp para informar o andamento da sua solicitação</li>
          <li>Produzir relatórios agregados e anônimos sobre as necessidades da população</li>
          <li>Publicar devolutivas periódicas (quinzenais) com os dados consolidados</li>
        </ul>
        <p>
          Seus dados <strong>nunca serão vendidos, alugados ou utilizados para fins comerciais</strong>.
        </p>
      </>
    ),
  },
  {
    title: "4. Base legal do tratamento",
    content: (
      <>
        <p>O tratamento dos seus dados pessoais é fundamentado nas seguintes bases legais:</p>
        <ul>
          <li>
            <strong>Consentimento</strong> (art. 7º, I da LGPD): ao submeter o formulário, você
            consente expressamente com o uso dos seus dados para os fins descritos.
          </li>
          <li>
            <strong>Legítimo interesse</strong> (art. 7º, IX da LGPD): para melhorar a plataforma e
            produzir análises agrupadas que beneficiam o interesse público.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Com quem compartilhamos",
    content: (
      <>
        <p>
          Para operação da plataforma, utilizamos os seguintes <strong>processadores</strong> de
          dados, que atuam sob nossas instruções:
        </p>
        <ul>
          <li>
            <strong>Supabase Inc.</strong> — banco de dados em nuvem onde as demandas são armazenadas
          </li>
          <li>
            <strong>Vercel Inc.</strong> — hospedagem do site
          </li>
        </ul>
        <p>
          Seus dados podem ainda ser compartilhados com <strong>órgãos públicos</strong> (secretarias
          municipais, estaduais e representantes) estritamente para encaminhar sua demanda — que é o
          propósito central da plataforma.
        </p>
        <p>
          Não compartilhamos seus dados com partidos políticos, empresas de marketing ou terceiros
          sem relação direta com o encaminhamento das demandas.
        </p>
      </>
    ),
  },
  {
    title: "6. Por quanto tempo guardamos",
    content: (
      <>
        <p>
          Seus dados são armazenados pelo tempo necessário para o cumprimento das finalidades
          descritas nesta política, observando os seguintes critérios:
        </p>
        <ul>
          <li>
            Demandas registradas: mantidas enquanto forem relevantes para acompanhamento e devolutiva
          </li>
          <li>
            Após o mandato ou encerramento da plataforma: dados anonimizados ou excluídos em até 90
            dias
          </li>
          <li>Logs de acesso: mantidos por até 6 meses, conforme o Marco Civil da Internet</li>
        </ul>
      </>
    ),
  },
  {
    title: "7. Seus direitos (LGPD)",
    content: (
      <>
        <p>
          Como titular dos dados, você tem os seguintes direitos garantidos pelo art. 18 da LGPD:
        </p>
        <ul>
          <li>
            <strong>Acesso:</strong> saber quais dados temos sobre você
          </li>
          <li>
            <strong>Correção:</strong> corrigir dados incompletos ou incorretos
          </li>
          <li>
            <strong>Anonimização, bloqueio ou eliminação:</strong> dos dados desnecessários ou
            tratados em desconformidade
          </li>
          <li>
            <strong>Portabilidade:</strong> receber seus dados em formato legível
          </li>
          <li>
            <strong>Revogação do consentimento:</strong> a qualquer momento, sem prejuízo
          </li>
          <li>
            <strong>Oposição:</strong> ao tratamento baseado em legítimo interesse
          </li>
        </ul>
        <p>
          Para exercer qualquer desses direitos, entre em contato por{" "}
          <a href="mailto:contato@puxirum.com.br" className="text-accent hover:underline">
            contato@puxirum.com.br
          </a>
          . Responderemos em até 15 dias úteis.
        </p>
      </>
    ),
  },
  {
    title: "8. Cookies e rastreamento",
    content: (
      <>
        <p>Este site utiliza cookies essenciais para seu funcionamento, incluindo:</p>
        <ul>
          <li>
            <strong>Sessão administrativa:</strong> cookie de autenticação para o painel admin
            (apenas para administradores do site)
          </li>
          <li>
            <strong>Analytics:</strong> dados agregados e anônimos de acesso (sem identificação
            pessoal)
          </li>
        </ul>
        <p>
          Não utilizamos cookies de rastreamento para fins publicitários ou de remarketing.
        </p>
      </>
    ),
  },
  {
    title: "9. Segurança dos dados",
    content: (
      <>
        <p>Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo:</p>
        <ul>
          <li>Transmissão criptografada via HTTPS/TLS</li>
          <li>Acesso ao banco de dados restrito por chaves de serviço</li>
          <li>Painel administrativo protegido por senha</li>
          <li>Rate limiting para prevenir abuso do formulário</li>
        </ul>
        <p>
          Em caso de incidente de segurança relevante, você será notificado conforme exigido pela
          LGPD.
        </p>
      </>
    ),
  },
  {
    title: "10. Alterações nesta política",
    content: (
      <>
        <p>
          Esta política pode ser atualizada periodicamente. A data da última revisão está indicada no
          topo desta página. Alterações significativas serão comunicadas no site. O uso continuado
          da plataforma após as alterações constitui aceitação da nova versão.
        </p>
        <p>
          Dúvidas ou solicitações:{" "}
          <a href="mailto:contato@puxirum.com.br" className="text-accent hover:underline">
            contato@puxirum.com.br
          </a>
        </p>
      </>
    ),
  },
];

export default function Privacidade() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <div className="relative bg-primary-dark overflow-hidden pt-20">
          <div className="absolute inset-0 geo-pattern opacity-40" />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="relative max-w-3xl mx-auto px-5 py-16 md:py-20">
            <div className="inline-flex items-center gap-2 bg-white/8 border border-white/10 rounded-full px-3 py-1 mb-5">
              <svg className="w-3.5 h-3.5 text-accent/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="text-white/50 text-xs font-heading font-semibold tracking-wide uppercase">LGPD</span>
            </div>
            <h1 className="font-heading font-extrabold text-white text-3xl md:text-4xl mb-3 leading-tight">
              Política de Privacidade
            </h1>
            <p className="text-white/40 text-sm font-body">
              Última atualização: março de 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-surface">
          <div className="max-w-3xl mx-auto px-5 py-12 md:py-20">
            <p className="text-primary/60 font-body leading-relaxed mb-10 text-base border-l-2 border-accent/40 pl-4">
              Esta Política de Privacidade explica como coletamos, usamos e protegemos seus dados
              pessoais quando você utiliza a plataforma Puxirum, em conformidade com a Lei Geral de
              Proteção de Dados (LGPD — Lei nº 13.709/2018).
            </p>

            <div className="space-y-10">
              {sections.map((section, i) => (
                <div key={i}>
                  <h2 className="font-heading font-bold text-primary text-xl md:text-2xl mb-4">
                    {section.title}
                  </h2>
                  <div className="font-body text-primary/65 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-1.5 [&_ul]:text-primary/60 [&_ul]:ml-1 [&_strong]:text-primary/80 [&_strong]:font-semibold">
                    {section.content}
                  </div>
                  {i < sections.length - 1 && (
                    <div className="divider-glow mt-10" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-14 pt-8 border-t border-primary/[0.06] flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-accent font-heading font-semibold text-sm hover:gap-3 transition-all duration-200 group"
              >
                <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Voltar para o início
              </a>
              <span className="hidden sm:block text-primary/20">·</span>
              <a
                href="/termos"
                className="text-sm text-primary/40 hover:text-primary/70 font-body transition-colors"
              >
                Ver Termos de Uso →
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
