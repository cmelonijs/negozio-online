import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MoreVertical, UserIcon } from "lucide-react";
import ModeToggle from "./mode-toggle";
import Shopping from "@/components/header/Shopping";
import { auth } from "@/auth";
import { Button } from "../ui/button";
import Link from "next/link";
import { signOutUser } from "@/lib/actions/user.actions";

const MobileMenu = async () => {
  const session = await auth();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition-colors">
          <MoreVertical className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[250px] sm:w-[300px]">
        <SheetHeader className="text-left">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-start gap-6 mt-8">
          <ModeToggle />
          <Shopping />
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
