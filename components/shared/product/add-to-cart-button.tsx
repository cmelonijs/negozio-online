/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export default function AddToCartButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();

  // const addItemToCart = async () => {
  //   try {
  //     const res = await fetch("/api/cart", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ productId, quantity: 1 }),
  //     });

  //     if (!res.ok) {
  //       throw new Error("Failed to add product to cart");
  //     }

  //     toast.success("Product added to the cart", {
  //       action: {
  //         label: "Go to cart",
  //         onClick: () => (window.location.href = "/cart"),
  //       },
  //     });
  //   } catch (error) {
  //     toast.error("Error adding product to cart");
  //   }
  // };

  const handleAddToCart = async () => {
    startTransition(async () => {
      // const res = await addItemToCart(item);
      // if (!res.success) {
      //   toast.error(res.message);
      //   return;
      // }
      // toast.success(res.message, {
      //   action: {
      //     label: "Go to Cart",
      //     onClick: () => router.push("/cart"),
      //   },
      // });
    });
  };

  return (
    <div>
      <Toaster />
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </div>
  );
}
