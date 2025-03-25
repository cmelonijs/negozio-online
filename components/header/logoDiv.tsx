import Image from "next/image";
const LogoDiv = () => {
    return ( 
        <div>
            <a href="{/}" className="flex-start">
            <Image
              src="/logo.png"
              width={100}
              height={20}
              className="md:block"
              alt="Logo version 1"
            />

            <span className="block font-bold text-1xl ml-3">
              Empresa | E-commerce
            </span>
            </a>
        </div>
     );
}
 
export default LogoDiv;