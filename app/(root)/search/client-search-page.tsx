"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getLatestProducts } from "@/lib/actions/products.actions";
import ProductList from "@/components/shared/product/product-list";
import { Product } from "@/types";

export default function ClientSearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getLatestProducts();

      const filtered = allProducts.filter((product: Product) => {
        const matchesName = q
          ? product.name.toLowerCase().includes(q.toLowerCase())
          : true;
        const matchesCategory =
          category && category !== "all"
            ? product.category === category
            : true;
        return matchesName && matchesCategory;
      });

      setFilteredProducts(filtered);
    };

    fetchProducts();
  }, [q, category]);

  if (!filteredProducts) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (filteredProducts.length === 0) {
    return <div className="p-8 text-center">No products found.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">
        Results for &quot;{q}&quot; {category && `in ${category}`}
      </h1>
      <ProductList title="Search Results" data={filteredProducts} />
    </div>
  );
}
