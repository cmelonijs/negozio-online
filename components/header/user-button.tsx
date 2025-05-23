import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { signOutUser, getUserRole } from "@/lib/actions/user.actions";
import { UserIcon } from "lucide-react";
import Link from "next/link";

const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Button asChild>
        <Link href="/sign-in">
          <UserIcon /> Sign in
        </Link>
      </Button>
    );
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? "U";
  
  // Get the user's role
  const userRole = session.user?.id ? await getUserRole(session.user.id) : 'user';
  const isAdmin = userRole === 'admin';

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-orange-500 text-white"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium leading-none">
                {session.user?.name}
              </div>
              <div className="text-sm text-muted-foreground leading-none">
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem asChild className="border border-gray-300 rounded-sm pt-7 pb-7 pl-6 mb-1">
            <Link
              href="/user/profile"
              className="w-full py-4 px-2 h-4 justify-start"
            >
              Profile
            </Link>
          </DropdownMenuItem>

          {isAdmin && (
            <DropdownMenuItem asChild className="border border-gray-300 rounded-sm pt-7 pb-7 pl-6 mb-1">
              <Link
                href="/admin/overview"
                className="w-full py-4 px-2 h-4 justify-start"
              >
                Admin
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem asChild className="border border-gray-300 rounded-sm p-3 mb-1">
            <form action={signOutUser} className="w-full">
              <Button
                className="w-full py-4 px-2 h-4 justify-start"
                variant="ghost"
              >
                Sign out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
