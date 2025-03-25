import { Sun } from "lucide-react";

const LightDarkIcon = () => {
  return (
    <div className="div-lightdark items-center p-3 rounded-md flex items-centerinline hover:outline-stone-500 hover:bg-stone-200 gap-1 p-3 hover:cursor-pointer hover:shadow-5 rounded-3xl">
      <Sun color="black" size={18} />
    </div>
  );
};

export default LightDarkIcon;
