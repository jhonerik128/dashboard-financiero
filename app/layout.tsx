import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
export const metadata: Metadata = {
  title: { default: "Finanzas | Florecer", template: "%s | Florecer" },
  description: "Panel financiero personal con resumen, filtros y exportación de movimientos a CSV.",
  openGraph: {
    title: "Finanzas | Florecer",
    description: "Un resumen claro para tomar mejores decisiones.",
    type: "website",
    locale: "es_CO",
  },
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} ${manrope.variable}`}>{children}</body>
    </html>
  );
}
