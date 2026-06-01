import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import PwaRegistrar from "@/components/PwaRegistrar";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "OC Financial — Student Banking",
  description: "Modern digital banking built for college students, powered by OC AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} h-full`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d4a017" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="#0a1628"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
      </head>
      <body className="min-h-full antialiased bg-navy-950 text-foreground">
        <PwaRegistrar />
        {children}
      </body>
    </html>
  );
}
