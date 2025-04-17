import { countAllProducts } from "@/lib/actions/products.actions";
import { Card } from "@/components/ui/card";
import { Barcode } from "lucide-react";

const ProductBox = async () => {
  const { success, total } = await countAllProducts();

  return (
    <Card className="p-4 flex flex-col justify-between h-36 rounded-lg border transition-all duration-300 hover:border-gray-500 dark:hover:border-white">
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold ml-1">Products</h2>
        <Barcode className="w-7 h-7 stroke-[2.5] text-black dark:text-white mr-1" />
      </div>
      <p className="text-4xl font-bold text-center mt-4">
        {success ? total : "—"}
      </p>
    </Card>
  );
};

export default ProductBox;
