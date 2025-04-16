import { Toaster } from "sonner";
import ProductForm from "../product-form";

export default function NewProductPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Add New Product</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Create a new product to add to your store
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <ProductForm />
      </div>
      
      <Toaster />
    </div>
  );
}
