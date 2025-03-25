import Image from "next/image";
const LogoDiv = () => {
  return (
    <div className="flex flex-col items-center justify-center my-0 mx-auto">
      <Image
        src="/logo.png"
        width={80}
        height={80}
        className=""
        alt="Logo version 1"
      />

      <span className="block font-bold text-1xl ml-3">
        Empresa | E-commerce
      </span>
    </div>
  );
};

export default LogoDiv;
