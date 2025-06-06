import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Backend Engineer Portfolio | Victor",
  description: "portfolio showcasing my work and experience as a backend engineer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-gray-200 antialiased min-h-screen`}>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
