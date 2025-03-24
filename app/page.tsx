// import { Button } from "@/components/ui/button";
import Image from "next/image";

const Homepage = () => {
  return (
    <>
      <Image
        src="/logo.png"
        width={100}
        height={20}
        className="hidden md:block"
        alt="Logo version 1"
      />

      <h1>Nombre empresa</h1>
      {/* <Button>Push the button</Button> */}
    </>
  );
};

export default Homepage;
