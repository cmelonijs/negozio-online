import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Suspense } from "react";
import Loading from "../loading";

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
      <main className="flex-1 wrapper">
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
