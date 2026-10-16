import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LALAINMOBILIARIA | Casas y Terrenos en Cañar & Azogues",
  description:
    "Inmobiliaria líder en la provincia de Cañar. Casas residenciales, quintas y terrenos con debida diligencia legal previa y asesoramiento notarial. Atención para familias locales y migrantes en EE.UU.",
  keywords: [
    "inmobiliaria cañar",
    "bienes raices azogues",
    "casas en venta azogues",
    "terrenos en venta cañar",
    "comprar casa ecuador desde usa",
    "lala inmobiliaria",
    "jose elias lala",
  ],
  openGraph: {
    title: "LALAINMOBILIARIA | Bienes Raíces en Cañar & Azogues",
    description:
      "Propiedades con revisión legal previa y asesoría notarial. Compras seguras desde Ecuador o EE.UU.",
    url: "https://lalainmobiliaria.com",
    siteName: "LALAINMOBILIARIA",
    locale: "es_EC",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.jpg" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-brand-dark text-emerald-100 antialiased selection:bg-brand-gold selection:text-brand-dark`}>
        {children}
      </body>
    </html>
  );
}
