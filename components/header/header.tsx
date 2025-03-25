//import Image from "next/image";
import LightDark from "@/components/header/LightDark"
import Shopping from "@/components/header/Shopping"
import User from "@/components/header/User"

const Header = () => {
  return (
    <div className="wrapper flex-between main-div">
       <div className="first-div flex-initial flex-wrap  items-center">
        <div className="hamburger-menu self-center"></div>
        <div className="main-logo self-center"></div>

        {/*<div className="flex items-center ">
          <div className="logoTotal pt-6 gap-3 pl-6 pb-6 flex items-center">
            <Image
              src="/logo.png"
              width={100}
              height={20}
              className="md:block"
              alt="Logo version 1"
            />

            <h1 className="text-xl font-bold font-rubik-rounded">
              Empresa | E-commerce
            </h1>
          </div>
        </div> */}
        </div>
        <div className="second-div flex  items-center">
            <div className="filter"></div>
        </div>
        <div className="third-div flex wrap wrapper h-full items-center gap-1">
            <div className="light-dark"><LightDark/></div>
            <div className="cart"><Shopping/></div>
            <div className="user"><User/></div>
        </div>
      </div>
    
  );
};

export default Header;
