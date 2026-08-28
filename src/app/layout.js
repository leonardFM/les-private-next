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
  metadataBase: new URL('https://elscorner.com'),
  title: {
    default: "EL's Corner | Kursus Bahasa Inggris Online & Offline",
    template: "%s | EL's Corner",
  },
  description: "Kursus bahasa Inggris untuk anak, remaja, dan dewasa melalui program pembelajaran yang terstruktur, interaktif, dan personal.",
  openGraph: {
    title: "EL's Corner | Kursus Bahasa Inggris Online & Offline",
    description: "Kursus bahasa Inggris untuk anak, remaja, dan dewasa melalui program pembelajaran yang terstruktur, interaktif, dan personal.",
    url: 'https://elscorner.com',
    siteName: "EL's Corner",
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: "EL's Corner - Kursus Bahasa Inggris",
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "EL's Corner | Kursus Bahasa Inggris Online & Offline",
    description: "Kursus bahasa Inggris untuk anak, remaja, dan dewasa melalui program pembelajaran yang terstruktur, interaktif, dan personal.",
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
