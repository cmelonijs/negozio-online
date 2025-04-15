import Link from "next/link";
import { getAllProducts } from "@/lib/actions/products.actions";
import { Button } from "@/components/ui/button";

const ProductsPage = async () => {
  const products = await getAllProducts();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Products Management</h1>
        <Link href="/dashboard/products/new">
          <Button>Add New Product</Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-4 border-b dark:border-gray-600 text-left dark:text-gray-200">ID</th>
              <th className="py-3 px-4 border-b dark:border-gray-600 text-left dark:text-gray-200">NAME</th>
              <th className="py-3 px-4 border-b dark:border-gray-600 text-left dark:text-gray-200">PRICE</th>
              <th className="py-3 px-4 border-b dark:border-gray-600 text-left dark:text-gray-200">CATEGORY</th>
              <th className="py-3 px-4 border-b dark:border-gray-600 text-left dark:text-gray-200">STOCK</th>
              <th className="py-3 px-4 border-b dark:border-gray-600 text-left dark:text-gray-200">RATING</th>
              <th className="py-3 px-4 border-b dark:border-gray-600 text-left dark:text-gray-200">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-3 px-4 border-b dark:border-gray-600 dark:text-gray-200">
                  ...{product.id.slice(-6)}
                </td>
                <td className="py-3 px-4 border-b dark:border-gray-600 dark:text-gray-200">{product.name}</td>
                <td className="py-3 px-4 border-b dark:border-gray-600 dark:text-gray-200">${product.price}</td>
                <td className="py-3 px-4 border-b dark:border-gray-600 dark:text-gray-200">{product.category}</td>
                <td className="py-3 px-4 border-b dark:border-gray-600 dark:text-gray-200">{product.stock}</td>
                <td className="py-3 px-4 border-b dark:border-gray-600 dark:text-gray-200">{product.rating}</td>
                <td className="py-3 px-4 border-b dark:border-gray-600">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="text-base font-medium">
                     Edit
                    </Button>
                    <Button size="sm" variant="destructive" className="text-base font-medium">
                       Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;
