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
  metadataBase: new URL("https://puxirum.vercel.app"),
  openGraph: {
    title: "Tá no Mapa — Plataforma de Escuta Popular",
    description:
      "Registre sua demanda. Sua voz vira ação. Watanabe Filho, pré-candidato a deputado estadual pelo Pará.",
    type: "website",
    locale: "pt_BR",
    siteName: "Tá no Mapa",
    url: "https://puxirum.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tá no Mapa — Plataforma de Escuta Popular",
    description: "Registre sua demanda. Sua voz vira ação.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%234299E1'/><text x='16' y='23' font-size='20' font-weight='bold' text-anchor='middle' fill='white' font-family='system-ui'>T</text></svg>",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><rect width='180' height='180' rx='40' fill='%234299E1'/><text x='90' y='125' font-size='110' font-weight='bold' text-anchor='middle' fill='white' font-family='system-ui'>T</text></svg>",
        type: "image/svg+xml",
      },
    ],
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
              url: "https://puxirum.vercel.app",
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
