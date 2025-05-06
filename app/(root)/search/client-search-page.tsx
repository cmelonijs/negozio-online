"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLatestProducts } from "@/lib/actions/products.actions";
import ProductList from "@/components/shared/product/product-list";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const priceRanges = [
  { label: "All", value: "any" },
  { label: "1€ t 50€", value: "1-50" },
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
  const sort = searchParams.get("sort") || "";

  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(
    null
  );
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

  const handleClearFilters = () => {
    router.replace("/search");
    setFilteredProducts(null); //to reset everythinh
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

      const sorted = [...filtered].sort((a, b) => {
        switch (sort) {
          case "newest":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case "lowest":
            return (
              parseFloat(a.price as string) - parseFloat(b.price as string)
            );
          case "highest":
            return (
              parseFloat(b.price as string) - parseFloat(a.price as string)
            );
          default:
            return 0;
        }
      });

      setFilteredProducts(sorted);
    };

    fetchProducts();
  }, [q, category, price, sort]);

  if (!filteredProducts)
    return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row flex-wrap p-8 gap-6">
      {/* Sideba */}
      <aside className="w-full lg:w-60 border-r pr-6 mb-6 lg:mb-0">
        <h2 className="font-semibold text-lg mb-2">Department</h2>
        <ul className="mb-6 space-y-1">
          <li
            className={`cursor-pointer ${category === "" || category === "all" ? "font-bold" : ""}`}
            onClick={() => updateSearchParams("category", "any")}
          >
            All
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
        <ul className="space-y-1 mb-6">
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

      {/* main content */}
      <main className="flex-1">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4 lg:gap-3">
          <h1 className="text-2xl font-semibold">
            Results for {q ? q : "all"}
            {category && category !== "all" ? ` in ${category}` : ""}
            {price !== "any"
              ? ` priced ${priceRanges.find((p) => p.value === price)?.label}`
              : ""}
          </h1>

          {/* Sort by and cvlear */}
          <div className="flex items-center gap-3">
            <Select
              onValueChange={(value) => updateSearchParams("sort", value)}
              defaultValue={sort}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="lowest">Price: Lowto High</SelectItem>
                <SelectItem value="highest">Price: High to low</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Product list */}
        {filteredProducts.length === 0 ? (
          <p>Nmo products found.</p>
        ) : (
          <ProductList title="Search Results" data={filteredProducts} />
        )}
      </main>
    </div>
  );
}
