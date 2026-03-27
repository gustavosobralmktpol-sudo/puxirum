import type { Metadata, Viewport } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
  themeColor: "#0f2b4a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Puxirum — Plataforma de Escuta Popular | Watanabe Filho",
    template: "%s | Puxirum",
  },
  description:
    "Registre sua demanda. O Puxirum é o canal permanente de escuta entre Watanabe Filho e a população do Pará. Sua voz vira ação.",
  keywords: [
    "Puxirum",
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
  metadataBase: new URL("https://puxirum.com.br"),
  openGraph: {
    title: "Puxirum — Plataforma de Escuta Popular",
    description:
      "Registre sua demanda. Sua voz vira ação. Watanabe Filho, pré-candidato a deputado estadual pelo Pará.",
    type: "website",
    locale: "pt_BR",
    siteName: "Puxirum",
    url: "https://puxirum.com.br",
  },
  twitter: {
    card: "summary_large_image",
    title: "Puxirum — Plataforma de Escuta Popular",
    description: "Registre sua demanda. Sua voz vira ação.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%23c9942e'/><text x='16' y='23' font-size='20' font-weight='bold' text-anchor='middle' fill='white' font-family='system-ui'>P</text></svg>",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><rect width='180' height='180' rx='40' fill='%23c9942e'/><text x='90' y='125' font-size='110' font-weight='bold' text-anchor='middle' fill='white' font-family='system-ui'>P</text></svg>",
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
      <body className="antialiased font-body">{children}</body>
    </html>
  );
}
