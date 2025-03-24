import type { Metadata } from "next";
import { Audiowide  } from "next/font/google";
import "./globals.css";
import Header from "../components/header/Header";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400", 
});

export const metadata: Metadata = {
  title: "Store",
  description: "E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Header/>
      <body className={`${audiowide.className} antialiased`}>{children}</body>
    </html>
  );
}
