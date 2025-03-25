import Shopping from "@/components/header/Shopping";
import User from "@/components/header/User";
import LogoDiv from "./logoDiv";
import Search2 from "./search";
import ModeToggle from "./mode-toggle";
import MobileMenu from "./mobileMenu";

const Header = () => {
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
          <div className="user">
            <User />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <MobileMenu />
      </div>
    </div>
  );
};

export default Header;
