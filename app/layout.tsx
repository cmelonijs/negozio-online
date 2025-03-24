import type { Metadata } from "next";
import { Audiowide  } from "next/font/google";
import "./globals.css";

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
      <body className={`${audiowide.className} antialiased`}>{children}</body>
    </html>
  );
}
