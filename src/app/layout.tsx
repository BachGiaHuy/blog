import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/Providers";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  variable: "--font-montserrat",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "WPLearn - Nền tảng hướng dẫn học WordPress",
  description: "Từ cơ bản đến nâng cao. Học code, theme, plugin cho WordPress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${montserrat.variable} font-sans`}
    >
      <body className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900 ${montserrat.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
