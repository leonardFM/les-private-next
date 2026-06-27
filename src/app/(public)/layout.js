import { cookies } from 'next/headers';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LanguageProvider } from "@/i18n";
import { ThemeProvider } from "@/context";

export default async function PublicLayout({ children }) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'id';
  const theme = cookieStore.get('theme')?.value || 'light';

  return (
    <ThemeProvider initialTheme={theme}>
      <LanguageProvider initialLocale={locale}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </LanguageProvider>
    </ThemeProvider>
  );
}
