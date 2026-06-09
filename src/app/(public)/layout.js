import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LanguageProvider } from "@/i18n";
import { ThemeProvider } from "@/context";

export default function PublicLayout({ children }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </LanguageProvider>
    </ThemeProvider>
  );
}
