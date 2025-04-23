import type { Metadata } from "next";
import "../globals.css";
import UserHeader from "./header";
import { DynamicBreadcrumbs } from "@/components/shared/breadcrumb";

export const metadata: Metadata = {
    title: "Admin area",
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
            <DynamicBreadcrumbs/>
            <main className="flex-1 wrapper">{children}</main>
        </div>
    );
}
