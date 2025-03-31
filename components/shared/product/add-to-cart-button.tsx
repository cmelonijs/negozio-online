/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";

export default function AddToCartForm(productId: any) {

    const addItemToCart = () => {
        console.log(productId);
        console.log('Button clicked!');
        toast.success("Product added to the cart", {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
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
