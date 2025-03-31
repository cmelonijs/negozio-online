"use client";

import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";

export default function AddToCartForm(productId: any) {

    const addItemToCart = () => {
        console.log(productId);//later on add the functionality of actually adding the product
        toast.success("Product added to the cart", {
            action: {
              label: "Go to cart",
              onClick: () => window.location.href = "/cart",
            },
          })
    };

    return (
        <div>
            <Toaster />
            <Button  onClick={addItemToCart}>
                Add to Cart
            </Button>
        </div>
    );
}