/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { Cart, CartItem, Product } from "@/types";
import { useRouter } from "next/navigation";


export default function AddToCartButton({ item, cart }: { item: CartItem; cart?: Cart }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();

  console.log('this props cart will be used the handle it', cart)

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item );
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message, {
        action: {
          label: "Go to Cart",
          onClick: () => router.push("/cart"),
        },
      });
    });
  };

  return (
    <div>
      <Button onClick={handleAddToCart}>{!isPending ? 'Add to Cart' : "Adding to cart"}</Button>
    </div>
  );
}
