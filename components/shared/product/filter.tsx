"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import ProductList from "./product-list";
import { Product } from "@/types";

type Props = {
  title?: string;
  data: Product[];
};

const ProductFilter = ({ title = "Filtered Products", data }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedname, setSelectedname] = useState<string>("");

  const [filtered, setFiltered] = useState<Product[]>(data);

  const categories = Array.from(
    new Set(
      data
        .map((p) => p.category)
        .filter((c) => typeof c === "string" && c.trim().length > 0)
    )
  );

  const handleFilter = () => {
    const filteredProducts = data
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) =>
        selectedname && selectedname !== "all"
          ? product.category === selectedname
          : true
      );

    setFiltered(filteredProducts);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <Input
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />

        <Select value={selectedname} onValueChange={setSelectedname}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <button
          onClick={handleFilter}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Apply Filters
        </button>
      </div>

      <ProductList title={title} data={filtered} />
    </div>
  );
};

export default ProductFilter;
