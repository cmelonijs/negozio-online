import Menu from "@/components/header/menu";
import Link from "next/link";

const UserHeader = () => {
    return (
        <div className="wrapper flex flex-row items-center justify-between w-full h-[120px] px-4">
            <div className="left-links flex items-center gap-6">
                <Link href="/user/profile" className="hover:text-primary transition-colors">
                    My Profile
                </Link>
                <Link href="/user/orders" className="hover:text-primary transition-colors">
                    My Orders
                </Link>
            </div>
            <div className="menu-container flex-shrink-0">
                <Menu />
            </div>
        </div>
    );
}

export default UserHeader;