import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} ${site.city} · Menú`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: ["pizza", "pizzería", site.city, "domicilios", "menú", site.name],
  openGraph: {
    title: `${site.name} ${site.city} · Menú`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "es_CO",
    type: "website",
    images: [{ url: "/images/posters/especial.jpg", width: 1086, height: 1448, alt: "Pizza Especial de Pizzatelo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} ${site.city} · Menú`,
    description: site.description,
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#060506",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${anton.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
