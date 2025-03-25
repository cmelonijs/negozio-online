//import Image from "next/image";

const Header = () => {
  return (
    <div className="wrapper flex-between main-div">
       <div className="first-div flex-initial flex-wrap">
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
        <div className="second-div flex ">
            <div className="filter"></div>
        </div>
        <div className="third-div flex wrap wrapper gap-3">
            <div className="light-dark"></div>
            <div className="cart"></div>
            <div className="user"></div>
        </div>
      </div>
    
  );
};

export default Header;
