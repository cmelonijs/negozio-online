"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SearchRedirectButton = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center mt-4">
      <Button onClick={() => router.push("/search")}>View All Products</Button>
    </div>
  );
};

export default SearchRedirectButton;
