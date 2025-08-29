import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
      <body className={`${syne.variable} antialiased`}>
        {/* Apply Syne globally */}
        <div className="font-syne">
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
