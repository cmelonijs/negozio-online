import { getUserById } from "@/lib/actions/user.actions";
import { Profile } from "@/types";
import ProfileForm from "./user-edit-form"; 

interface Props {
  params: {
    id: string;
  };
}

const UserEditPage = async ({ params }: Props) => {
  const userId = params.id;
  let userProfile: Profile | undefined = undefined;

  try {
    const user = await getUserById(userId);
    if (user?.name && user?.email) {
      userProfile = {
        name: user.name,
        email: user.email,
      };
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }

  return (
    <div className="p-6">
      <ProfileForm initialProfileForm={userProfile} />
    </div>
  );
};

export default UserEditPage;
