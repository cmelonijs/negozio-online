import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@/auth";
import { Profile } from "@/types";
import ProfileForm from "./profile-form" // make sure the path is correct!

const ProfilePage = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  let userProfile: Profile | undefined = undefined;

  if (userId) {
    try {
      const user = await getUserById(userId);
      if (user.name && user.email) {
        userProfile = {
          name: user.name,
          email: user.email,
        };
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  return (
    <div className="p-6">
      <ProfileForm initialProfileForm={userProfile} />
    </div>
  );
};

export default ProfilePage;
