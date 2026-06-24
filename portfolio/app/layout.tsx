import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/lib/theme";
import MainLayout from "@/components/layout/MainLayout";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Henry Yu — Portfolio",
  description:
    "CS student building ML, systems, and visualization projects with an emphasis on readable engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${sora.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DFJQESCYS3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-DFJQESCYS3');`}
        </Script>
      </body>
    </html>
  );
}
