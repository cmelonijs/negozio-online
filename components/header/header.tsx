import LogoDiv from "./logoDiv";
import Search2 from "./search";
import Menu from "./menu";
import Link from "next/link";
import { getLatestProducts } from "@/lib/actions/products.actions";

const Header = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <div className="wrapper flex flex-row items-center justify-around w-full h-[120px] px-4">
      <div className="first-div flex items-center h-full flex-shrink-0 justify-start">
        <div className="flex h-full justify-start">
          <Link href="/"><LogoDiv /></Link>
        </div>
      </div>
      <div className="second-div hidden md:flex items-center justify-center flex-grow">
        <div className="filter">
          <Search2 data={latestProducts}/>
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default Header;
