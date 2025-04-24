import type { Metadata } from "next";
import "../globals.css";
import UserHeader from "./header";
import { DynamicBreadcrumbs } from "@/components/shared/breadcrumb";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserRole } from "@/lib/actions/user.actions";

export const metadata: Metadata = {
    title: "Admin area",
    description: "E-commerce",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;
  if (!session?.user || !userId) {
    redirect('/sign-in');
  }
  
  const role = await getUserRole(userId);
  
  if (role !== 'admin') {
    redirect('/unauthorized');
  }
    return (
        <div className="flex h-screen flex-col">
            <UserHeader />
            <DynamicBreadcrumbs nonClickableSegments={["admin"]}/>
            <main className="flex-1 wrapper">{children}</main>
        </div>
    );
}
