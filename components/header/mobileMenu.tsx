import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MoreVertical } from "lucide-react";
import ModeToggle from "./mode-toggle";
import Shopping from "@/components/header/Shopping";
import User from "@/components/header/User";

const MobileMenu = () => {
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
                    <User />
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;
