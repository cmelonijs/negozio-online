/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function AddToCartForm(productId: any) {

    const handleClick = () => {
        console.log(productId);
        console.log('Button clicked!');
        toast.success('Event has been created')
    };

    return (
        <div className="flex flex-col">
            <Button
                variant="outline"
                onClick={handleClick}
            >
                Add to Cart
            </Button>
        </div>
    );
}
