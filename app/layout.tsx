import type { Metadata } from "next";
import { Inter } from "next/font/google";
import{Open_Sans} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const open_sans = Open_Sans ({subsets: ["latin"], weight: ['500']  });

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
      <body className={`${open_sans.className} antialiased`}>{children}</body>
    </html>
  );
}
