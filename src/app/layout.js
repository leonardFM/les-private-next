import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "El's Corner | Les Bahasa Inggris Online & Offline",
  description: "Les bahasa Inggris private online & offline untuk anak, remaja, dewasa, TOEFL, IELTS. Konsultasi gratis via WhatsApp. 15.000+ alumni sukses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
