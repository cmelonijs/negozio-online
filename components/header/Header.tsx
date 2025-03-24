import Image from "next/image";

const Header = () => {
    return(
        <div className="flex ">
                <Image
                  src="/logo.png"
                  width={100}
                  height={20}
                  className="hidden md:block"
                  alt="Logo version 1"
                />
        
                <h1>Empresa | Store</h1>
                {/* <Button>Push the button</Button> */}
              </div>
    );
};

export default Header;