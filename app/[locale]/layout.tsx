import { Space_Grotesk, Inter } from "@next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routings";
import { Providers } from "../providers";
import "../globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Analytics } from "@vercel/analytics/next"
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Load translations on the server
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-5 py-6 md:px-8">
            {children}
            </main>
            <Footer/>
          </Providers>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}