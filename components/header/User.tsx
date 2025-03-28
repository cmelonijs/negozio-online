import { UserRound } from "lucide-react";
import Link from "next/link";

const UserRoundIcon = () => {
  return (
    <Link href="/sign-in">
      {/* It needs to check if user is already authorised still*/}
      <div className="div-user flex items-centerinline hover:outline-stone-500 hover:bg-stone-200 gap-1 p-3 rounded-md bg-stone-100  hover:cursor-pointer hover:shadow-5 ">
        <UserRound color="black" size={18} />
        <p className="text-xs">Sign In</p>
      </div>
    </Link>
  );
};

export default UserRoundIcon;
