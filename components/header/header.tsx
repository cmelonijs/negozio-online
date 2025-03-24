import Image from "next/image";

const Header = () => {
    return(
        <div className="flex items-center ">
            <div className="logoTotal pt-6 gap-3 pl-6 pb-6 flex items-center">
                <Image
                  src="/logo.png"
                  width={100}
                  height={20}
                  className="md:block"
                  alt="Logo version 1"
                />

<h1 className="text-xl font-bold font-rubik-rounded">Empresa | E-commerce</h1>

                {/* <Button>Push the button</Button> */}

                </div>
              </div>
    );
};

export default Header;