/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";

export default function AddToCartButton({ productId }: { productId: string }) {
  const addItemToCart = async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!res.ok) {
        throw new Error("Failed to add product to cart");
      }

      toast.success("Product added to the cart", {
        action: {
          label: "Go to cart",
          onClick: () => (window.location.href = "/cart"),
        },
      });
    } catch (error) {
      toast.error("Error adding product to cart");
    }
  };

  return (
    <div>
      <Toaster />
      <Button onClick={addItemToCart}>Add to Cart</Button>
    </div>
  );
}