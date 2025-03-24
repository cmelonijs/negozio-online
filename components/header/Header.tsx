import Image from "next/image";

const Header = () => {
    return(
        <div className="flex items-center  bg-blue-500">
            <div className="logoTotal pt-6 pl-6 pb-6 flex items-center">
                <Image
                  src="/logo.png"
                  width={100}
                  height={20}
                  className="md:block"
                  alt="Logo version 1"
                />
        
                <h1>Empresa | Store</h1>
                {/* <Button>Push the button</Button> */}
              
                </div>
              </div>
    );
};

export default Header;