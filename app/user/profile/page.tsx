import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { redirect } from "next/navigation";
import ProfileForm from "./profileForm";

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }
  
  // Get user data from database
  const userData = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
    select: {
      name: true,
      email: true,
    },
  });
  
  if (!userData) {
    throw new Error("User not found");
  }

  return (
    <div className="container mx-auto py-8">
      <ProfileForm user={{ ...userData, email: userData.email ?? "" }} />
    </div>
  );
}