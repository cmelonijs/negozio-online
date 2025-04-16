import { Metadata } from "next";
import { getUserById } from "@/lib/actions/user.actions";
import UpdateUserForm from "./user-edit-form";
import { CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Edit User",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

const EditUserPage = async ({ params }: Awaited<PageProps>) => {
  const { id } = await params;

  const user = await getUserById(id);
  if (!user) {
    return <div>User not found</div>;
  }

  const initialProfileForm = {
    name: user.name || "",
    email: user.email || "",
    role: user.role === "admin" ? "admin" : "user",
  } as {
    name: string;
    email: string;
    role: "user" | "admin";
  };
  
  return (
    <div>
      <CardContent>
        <UpdateUserForm userId={id} initialProfileForm={initialProfileForm} />
      </CardContent>
    </div>
  );
};

export default EditUserPage;
