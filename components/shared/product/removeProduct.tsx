"use client";
import { Button } from "@/components/ui/button";
import { removeItemFormCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";
import { Loader, Minus } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function MinusButton({ item }: { item: CartItem }) {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      variant="outline"
      type="button"
      onClick={() =>

        startTransition(async () => {
          const res = await removeItemFormCart(item.productId);

          if (!res.success) {
            toast.error(res.message);
            return;
          }
        })
      }
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Minus className="w-4 h-4" />
      )}
    </Button>
  );
}
