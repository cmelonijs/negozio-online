"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { updateOrderToDelivered } from "@/lib/actions/order.actions"; 
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  orderId: string;
}

const MarkAsDeliveredButton = ({ orderId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleMarkAsDelivered = () => {
    startTransition(async () => {
      try {
        await updateOrderToDelivered(orderId);
        toast.success("Order marked as delivered");
        router.refresh(); 
      } catch {
        toast.error("Failed to mark as delivered");
      }
    });
  };

  return (
    <Button onClick={handleMarkAsDelivered} disabled={isPending}>
      {isPending ? "Updating..." : "Mark as Delivered"}
    </Button>
  );
};

export default MarkAsDeliveredButton;
