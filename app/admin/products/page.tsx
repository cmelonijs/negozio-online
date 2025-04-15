import Link from "next/link";
import { getAllProducts } from "@/lib/actions/products.actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        <Table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
          <TableHeader className="bg-gray-100 dark:bg-gray-700">
            <TableRow>
              <TableHead className="py-3 px-4 dark:text-gray-200">ID</TableHead>
              <TableHead className="py-3 px-4 dark:text-gray-200">NAME</TableHead>
              <TableHead className="py-3 px-4 dark:text-gray-200">PRICE</TableHead>
              <TableHead className="py-3 px-4 dark:text-gray-200">CATEGORY</TableHead>
              <TableHead className="py-3 px-4 dark:text-gray-200">STOCK</TableHead>
              <TableHead className="py-3 px-4 dark:text-gray-200">RATING</TableHead>
              <TableHead className="py-3 px-4 dark:text-gray-200">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <TableCell className="py-3 px-4 dark:text-gray-200">
                  ...{product.id.slice(-6)}
                </TableCell>
                <TableCell className="py-3 px-4 dark:text-gray-200">{product.name}</TableCell>
                <TableCell className="py-3 px-4 dark:text-gray-200">${product.price}</TableCell>
                <TableCell className="py-3 px-4 dark:text-gray-200">{product.category}</TableCell>
                <TableCell className="py-3 px-4 dark:text-gray-200">{product.stock}</TableCell>
                <TableCell className="py-3 px-4 dark:text-gray-200">{product.rating}</TableCell>
                <TableCell className="py-3 px-4">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="text-base font-medium">
                     Edit
                    </Button>
                    <Button size="sm" variant="destructive" className="text-base font-medium">
                       Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsPage;
