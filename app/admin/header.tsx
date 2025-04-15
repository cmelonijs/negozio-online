import Menu from "@/components/header/menu";
import Link from "next/link";

const AdminHeader = () => {
    return (
        <div className="wrapper flex flex-col items-center w-full px-4">
            <h1 className="text-xl font-bold my-3">Administration</h1>
            <div className="flex flex-row items-center justify-between w-full h-[80px]">
                <div className="left-links flex items-center gap-6">
                    <Link href="/admin/overview" className="hover:text-primary transition-colors">
                        Overview
                    </Link>
                    <Link href="/admin/products" className="hover:text-primary transition-colors">
                        Products
                    </Link>
                    <Link href="/admin/orders" className="hover:text-primary transition-colors">
                        Orders
                    </Link>
                    <Link href="/admin/users" className="hover:text-primary transition-colors">
                        Users
                    </Link>
                </div>
                <div className="right-container flex items-center gap-4">
                    <input 
                        type="text" 
                        data-slot="input" 
                        className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive md:w-[100px] lg:w-[300px] bg-white dark:bg-black"
                        placeholder="Search..."
                        name="q"
                    />
                    <div className="menu-container flex-shrink-0">
                        <Menu />
                    </div>
                </div>
            </div>
            <div className="w-full h-px bg-gray-200 dark:bg-gray-800 mt-2"></div>
        </div>
    );
}

export default AdminHeader;
