"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { updateOrderToPaid } from "@/lib/actions/order.actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  orderId: string;
}

const MarkAsPaidButton = ({ orderId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleMarkAsPaid = () => {
    startTransition(async () => {
      try {
        await updateOrderToPaid({ orderId });
        toast.success("Order marked as paid");
        router.refresh();
      } catch  {
        toast.error( "Failed to mark as paid");
      }
    });
  };

  return (
    <Button onClick={handleMarkAsPaid} disabled={isPending}>
      {isPending ? "Marking..." : "Mark as Paid"}
    </Button>
  );
};

export default MarkAsPaidButton;
