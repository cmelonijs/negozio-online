import type { Metadata } from "next";
import "../globals.css";
import Header from "../../components/header/Header";

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
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper">{children}</main>
    </div>
  );
}
