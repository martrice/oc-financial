import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

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
      <body className="min-h-full antialiased bg-navy-950 text-foreground">
        {children}
      </body>
    </html>
  );
}
