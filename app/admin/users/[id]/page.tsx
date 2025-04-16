
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@/auth";
import UpdateUserForm from "./user-edit-form"; 

const ProfilePage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  let userProfile;

  if (userId) {
    try {
      const user = await getUserById(userId);
      if (
        user.name &&
        user.email &&
        (user.role === "user" || user.role === "admin")
      ) {
        userProfile = {
          name: user.name,
          email: user.email,
          role: user.role as "user" | "admin",
        };
      }
      
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  return (
    <div className="p-6">
      <UpdateUserForm initialProfileForm={userProfile} />
    </div>
  );
};

export default ProfilePage;
