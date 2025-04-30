"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLatestProducts } from "@/lib/actions/products.actions";
import ProductList from "@/components/shared/product/product-list";
import { Product } from "@/types";

const priceRanges = [
  { label: "Any", value: "any" },
  { label: "1€ to 50€", value: "1-50" },
  { label: "51€ to 100€", value: "51-100" },
  { label: "101€ to 200€", value: "101-200" },
  { label: "201€ to 500€", value: "201-500" },
  { label: "501€ to 1000€", value: "501-1000" },
];

export default function ClientSearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const price = searchParams.get("price") || "any";

  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "any" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/search?${params.toString()}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getLatestProducts();

      const uniqueCategories = Array.from(
        new Set(allProducts.map((p) => p.category).filter((c) => c && c.trim()))
      );
      setCategories(uniqueCategories);

      const filtered = allProducts.filter((product: Product) => {
        const matchesName = q
          ? product.name.toLowerCase().includes(q.toLowerCase())
          : true;
        const matchesCategory =
          category && category !== "all" ? product.category === category : true;

        const priceNum = parseFloat(product.price as string);
        let matchesPrice = true;
        if (price && price !== "any") {
          const [min, max] = price.split("-").map(Number);
          matchesPrice = priceNum >= min && priceNum <= max;
        }

        return matchesName && matchesCategory && matchesPrice;
      });

      setFilteredProducts(filtered);
    };

    fetchProducts();
  }, [q, category, price]);

  if (!filteredProducts) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row flex-wrap p-8 gap-4">
      <aside className="w-48 min-w-[12rem] border-r pr-4">
        <h2 className="font-semibold text-lg mb-2">Department</h2>
        <ul className="mb-6 space-y-1">
          <li
            className={`cursor-pointer ${category === "" || category === "all" ? "font-bold" : ""}`}
            onClick={() => updateSearchParams("category", "any")}
          >
            Any
          </li>
          {categories.map((cat) => (
            <li
              key={cat}
              className={`cursor-pointer ${cat === category ? "font-bold" : ""}`}
              onClick={() => updateSearchParams("category", cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
  
        <h2 className="font-semibold text-lg mb-2">Prices</h2>
        <ul className="space-y-1">
          {priceRanges.map((range) => (
            <li
              key={range.value}
              className={`cursor-pointer ${range.value === price ? "font-bold" : ""}`}
              onClick={() => updateSearchParams("price", range.value)}
            >
              {range.label}
            </li>
          ))}
        </ul>
      </aside>
  
      <main className="flex-1">
        <h1 className="text-2xl font-semibold mb-4">
          Results for &quot;{q}&quot;
          {category && category !== "all" ? ` in ${category}` : ""}
          {price !== "any" ? ` priced ${priceRanges.find(p => p.value === price)?.label}` : ""}
        </h1>
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <ProductList title="Search Results" data={filteredProducts} />
        )}
      </main>
    </div>
  );
  
}
