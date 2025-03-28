import Shopping from "@/components/header/Shopping";
import LogoDiv from "./logoDiv";
import Search2 from "./search";
import ModeToggle from "./mode-toggle";
import MobileMenu from "./mobileMenu";
import Link from "next/link";
import { UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import { auth } from "@/auth";
import { signOutUser } from "@/lib/actions/user.actions";

const Header = async () => {
  const session = await auth();

  return (
    <div className="wrapper flex flex-row items-center justify-around w-full h-[120px] px-4">
      <div className="first-div flex items-center h-full flex-shrink-0 justify-start">
        <div className="flex h-full justify-start">
          <LogoDiv />
        </div>
      </div>
      <div className="second-div hidden md:flex items-center justify-center flex-grow">
        <div className="filter">
          <Search2 />
        </div>
      </div>
      <div className="third-div hidden md:flex  h-full items-center gap-1 justify-end">
        <div className="hidden md:flex items-center gap-1">
          <ModeToggle />
          <div className="cart">
            <Shopping />
          </div>
          {!session ? (
            <Button asChild>
              <Link href="/sign-in">
                <UserIcon /> Sign in
              </Link>
            </Button>
          ) : (
            <form action={signOutUser} className="w-full">
              <Button
                className="w-full py-4 px-2 h-4 justify-start"
                variant="ghost"
              >
                Sign out
              </Button>
            </form>
          )}
        </div>
      </div>
      <div className="md:hidden">
        <MobileMenu />
      </div>
    </div>
  );
};

export default Header;
