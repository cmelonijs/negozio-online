import Image from "next/image";
const LogoDiv = () => {
    return ( 
        <div className="items-center p-3rounded-md flex items-centerinline gap-1 pt-3 pr-3 pb-3 rounded-md hover:cursor-pointer hover:shadow-5">
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