import type { Metadata } from "next";
import { DM_Serif_Display, Archivo, Sora, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

const dmSerif = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sehatlings - Healthcare Innovation",
  description: "Pioneering a new era of health through innovation, compassion, and data-driven solutions. Transforming healthcare delivery with cutting-edge technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-L1XWN7MDEJ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-L1XWN7MDEJ');
        `}
      </Script>
      <body className={`${dmSerif.variable} ${archivo.variable} ${sora.variable} ${plusJakarta.variable} antialiased`}>
        {/* Apply Archivo as base font, DM Serif for headings, Sora for accents */}
        <div className="font-sans">
          <Navbar />
          <ClientLayout>
            {children}
          </ClientLayout>
          <Footer />
        </div>
      </body>
    </html>
  );
}
