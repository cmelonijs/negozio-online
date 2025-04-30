import { Toaster } from "sonner";
import { getProductById } from "@/lib/actions/products.actions";
import ProductForm from "../../product-form";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  
  // Handle case where product is not found
  if (!product) {
    notFound();
  }
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Edit Product</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Update your product information
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <ProductForm 
          product={{
            ...product,
            images: product.images || [],
            price: Number(product.price),
            rating: Number(product.rating)
          }} 
        />
      </div>
      
      <Toaster />
    </div>
  );
}