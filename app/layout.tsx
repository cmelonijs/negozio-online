import type { Metadata } from "next";
import { Audiowide } from "next/font/google";
import "./globals.css";
<<<<<<< Updated upstream
=======
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/costants";
>>>>>>> Stashed changes

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    template: `%s | Store`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
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
