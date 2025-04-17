import Link from "next/link";
import { getAllProducts } from "@/lib/actions/products.actions";
import { Button } from "@/components/ui/button";
import ProductsTable from "./products-table";

const ProductsPage = async ({ 
  searchParams 
}: { 
  searchParams: Promise<{ 
    page?: string;
    query?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
  }>
}) => {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const query = resolvedSearchParams.query || '';
  
  const { data: products, totalPages } = await getAllProducts({
    query,
    page: currentPage,
    category: resolvedSearchParams.category,
    price: resolvedSearchParams.price,
    rating: resolvedSearchParams.rating,
    sort: resolvedSearchParams.sort,
  });

  const serializedProducts = products.map(product => {
    const serialized = JSON.parse(JSON.stringify(product, (key, value) => {
      
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value;
    }));
    
    return {
      ...serialized,
      price: Number(product.price),
      rating: Number(product.rating),
      stock: Number(product.stock),
      numReviews: Number(product.numReviews)
    };
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Products Management</h1>
        <Link href="/admin/products/new">
          <Button>Add New Product</Button>
        </Link>
      </div>

      <ProductsTable 
        products={serializedProducts}
        totalPages={totalPages} 
        currentPage={currentPage} 
      />
    </div>
  );
};

export default ProductsPage;
