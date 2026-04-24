import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RedForge — AI Chatbot Platform untuk Website Anda",
  description:
    "Platform SaaS AI chatbot cerdas yang meningkatkan penjualan melalui rekomendasi produk otomatis, integrasi widget copy-paste, dan pelatihan AI dari data website Anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
