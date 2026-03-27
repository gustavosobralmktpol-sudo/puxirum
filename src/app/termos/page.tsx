import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Termos de Uso | Puxirum",
  description:
    "Leia os Termos de Uso da plataforma Puxirum — regras, responsabilidades e condições para utilização do canal de escuta popular de Watanabe Filho.",
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "1. Aceitação dos termos",
    content: (
      <>
        <p>
          Ao acessar ou utilizar a plataforma <strong>Puxirum</strong> (disponível em
          puxirum.com.br), você declara ter lido, compreendido e concordado com estes Termos de Uso.
          Caso não concorde com qualquer disposição, não utilize a plataforma.
        </p>
        <p>
          Estes termos podem ser atualizados periodicamente. O uso continuado após alterações
          constitui aceitação da versão revisada.
        </p>
      </>
    ),
  },
  {
    title: "2. O que é o Puxirum",
    content: (
      <>
        <p>
          O <strong>Puxirum</strong> é uma plataforma digital de escuta popular criada por Watanabe
          Filho para coletar, organizar e encaminhar demandas da população do Pará a órgãos públicos
          e representantes responsáveis.
        </p>
        <p>
          <strong>Importante:</strong> O Puxirum é um canal político complementar e{" "}
          <strong>não substitui</strong> canais oficiais de atendimento ao cidadão, como ouvidorias
          municipais e estaduais, 156, Procon ou quaisquer outros serviços públicos. Situações de
          emergência devem ser reportadas diretamente aos serviços competentes (SAMU 192, Bombeiros
          193, Polícia Militar 190).
        </p>
      </>
    ),
  },
  {
    title: "3. Uso adequado da plataforma",
    content: (
      <>
        <p>Ao registrar uma demanda, você se compromete a:</p>
        <ul>
          <li>Fornecer informações verídicas e precisas</li>
          <li>Utilizar a plataforma exclusivamente para registrar demandas legítimas</li>
          <li>Não enviar conteúdo falso, ofensivo, discriminatório ou ilegal</li>
          <li>Não realizar tentativas de abuso, spam ou sobrecarga do sistema</li>
          <li>Não utilizar a plataforma para fins comerciais não autorizados</li>
        </ul>
        <p>
          O uso indevido pode resultar no bloqueio do seu acesso e, em casos graves, em medidas
          legais cabíveis.
        </p>
      </>
    ),
  },
  {
    title: "4. Responsabilidades",
    content: (
      <>
        <p>
          <strong>Watanabe Filho e a equipe do Puxirum se comprometem a:</strong>
        </p>
        <ul>
          <li>Registrar todas as demandas recebidas</li>
          <li>Encaminhar as demandas aos órgãos e representantes competentes</li>
          <li>Publicar devolutivas periódicas (a cada 15 dias) com o consolidado das ações</li>
          <li>Manter a plataforma funcional e segura</li>
          <li>Proteger seus dados pessoais conforme a Política de Privacidade</li>
        </ul>
        <p>
          <strong>Não garantimos:</strong> que toda demanda será resolvida, pois o atendimento
          depende de terceiros (órgãos públicos, outros representantes). O Puxirum atua como
          intermediário e facilitador, não como prestador direto do serviço público.
        </p>
      </>
    ),
  },
  {
    title: "5. Propriedade intelectual",
    content: (
      <>
        <p>
          Todo o conteúdo da plataforma — incluindo design, logotipo, textos, código-fonte,
          fotografias e materiais de campanha — é de propriedade de Watanabe Filho ou licenciado
          para uso exclusivo nesta plataforma.
        </p>
        <p>
          É proibida a reprodução, distribuição ou uso comercial de qualquer elemento sem
          autorização prévia e expressa.
        </p>
        <p>
          As demandas enviadas pelos usuários permanecem de autoria dos próprios usuários. Ao
          enviá-las, você concede ao Puxirum licença gratuita para utilizá-las de forma agregada e
          anonimizada em relatórios públicos.
        </p>
      </>
    ),
  },
  {
    title: "6. Limitação de responsabilidade",
    content: (
      <>
        <p>O Puxirum não se responsabiliza por:</p>
        <ul>
          <li>Falhas técnicas temporárias, interrupções de serviço ou perda de dados por caso fortuito</li>
          <li>Ações ou omissões de órgãos públicos a quem as demandas foram encaminhadas</li>
          <li>Conteúdo enviado por usuários que viole estes termos</li>
          <li>Danos indiretos decorrentes do uso ou impossibilidade de uso da plataforma</li>
        </ul>
        <p>
          A responsabilidade total do Puxirum, em qualquer hipótese, limita-se ao valor pago pelo
          usuário pelo uso da plataforma — que, sendo gratuita, significa que não há indenizações
          monetárias a título de responsabilidade civil.
        </p>
      </>
    ),
  },
  {
    title: "7. Privacidade e dados pessoais",
    content: (
      <>
        <p>
          O tratamento dos seus dados pessoais é regido pela nossa{" "}
          <a href="/privacidade" className="text-accent hover:underline">
            Política de Privacidade
          </a>
          , em conformidade com a LGPD (Lei nº 13.709/2018), que é parte integrante destes Termos
          de Uso.
        </p>
      </>
    ),
  },
  {
    title: "8. Links externos",
    content: (
      <>
        <p>
          A plataforma pode conter links para sites externos (redes sociais, órgãos públicos, etc.).
          O Puxirum não tem controle sobre esses sites e não se responsabiliza por seu conteúdo,
          privacidade ou funcionamento.
        </p>
      </>
    ),
  },
  {
    title: "9. Foro e legislação aplicável",
    content: (
      <>
        <p>
          Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Fica eleito
          o foro da Comarca de <strong>Belém, Estado do Pará</strong>, como competente para dirimir
          quaisquer controvérsias decorrentes deste instrumento, com renúncia expressa a qualquer
          outro, por mais privilegiado que seja.
        </p>
      </>
    ),
  },
  {
    title: "10. Contato",
    content: (
      <>
        <p>
          Dúvidas, sugestões ou solicitações relacionadas a estes Termos de Uso podem ser enviadas
          para:{" "}
          <a href="mailto:contato@puxirum.com.br" className="text-accent hover:underline">
            contato@puxirum.com.br
          </a>
        </p>
      </>
    ),
  },
];

export default function Termos() {
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span className="text-white/50 text-xs font-heading font-semibold tracking-wide uppercase">Legal</span>
            </div>
            <h1 className="font-heading font-extrabold text-white text-3xl md:text-4xl mb-3 leading-tight">
              Termos de Uso
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
              Estes Termos de Uso regulam o acesso e a utilização da plataforma Puxirum. Ao usar o
              site, você concorda com as condições abaixo.
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
                href="/privacidade"
                className="text-sm text-primary/40 hover:text-primary/70 font-body transition-colors"
              >
                Ver Política de Privacidade →
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
