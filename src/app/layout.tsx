import type { Metadata, Viewport } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import WhatsAppConditional from "@/components/WhatsAppConditional";

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1B4F8A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Tá no Mapa — Plataforma de Escuta Popular | Watanabe Filho",
    template: "%s | Tá no Mapa",
  },
  description:
    "Registre sua demanda. O Tá no Mapa é o canal permanente de escuta entre Watanabe Filho e a população do Pará. Sua voz vira ação.",
  keywords: [
    "Tá no Mapa",
    "Watanabe Filho",
    "deputado estadual Pará",
    "escuta popular",
    "demandas",
    "Belém",
    "Marituba",
    "Santa Izabel",
  ],
  authors: [{ name: "Watanabe Filho" }],
  creator: "Watanabe Filho",
  metadataBase: new URL("https://www.tanomapa.com"),
  openGraph: {
    title: "Tá no Mapa — Watanabe Filho",
    description:
      "Registre sua demanda. Sua voz vira ação. Watanabe Filho, pré-candidato a deputado estadual pelo Pará.",
    type: "website",
    locale: "pt_BR",
    siteName: "Tá no Mapa",
    url: "https://www.tanomapa.com",
    images: [
      {
        url: "/images/og-share.png",
        width: 1200,
        height: 630,
        alt: "Tá no Mapa — Plataforma de escuta popular de Watanabe Filho",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tá no Mapa — Watanabe Filho",
    description: "Registre sua demanda. Sua voz vira ação.",
    images: ["/images/og-share.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${heading.variable} ${body.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Tá no Mapa",
              url: "https://www.tanomapa.com",
              description: "Plataforma de escuta popular — Watanabe Filho, pré-candidato a deputado estadual pelo Pará.",
              founder: { "@type": "Person", name: "Watanabe Filho" },
              areaServed: { "@type": "State", name: "Pará" },
            }),
          }}
        />
      </head>
      <body className="antialiased font-body">
        {children}
        <WhatsAppConditional />
      </body>
    </html>
  );
}
