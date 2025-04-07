import type { Metadata } from "next";
import "../globals.css";
import UserHeader from "./header";

export const metadata: Metadata = {
    title: "User area",
    description: "E-commerce",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen flex-col">
            <UserHeader />
            <main className="flex-1 wrapper">{children}</main>
        </div>
    );
}
