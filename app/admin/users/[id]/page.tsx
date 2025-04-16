import { getUserById } from "@/lib/actions/user.actions";
import UpdateUserForm from "./user-edit-form";
import { notFound } from "next/navigation";

export default async function EditUserPage({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);

  if (!user) return notFound();

  const userProfile = {
    name: user.name || "",
    email: user.email || "",
    role: user.role === "admin" ? "admin" : "user", 
  } as {
    name: string;
    email: string;
    role: "user" | "admin";
  };
  

  return (
    <div className="p-6">
      <UpdateUserForm initialProfileForm={userProfile} userId={params.id} />
    </div>
  );
}
