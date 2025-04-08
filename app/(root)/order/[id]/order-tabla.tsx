"use client"
import { OrderItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OrderTable = ({ order }: { order?: OrderItem[] }) => {
  if (!order || order.length === 0) {
    return <p>No items in the order.</p>;
  }

  return (
    <Table className="bg-white dark:bg-black">
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {order.map((item) => (
          <TableRow key={item.slug}>
            <TableCell>
              <div className="flex items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                />
                <span className="ml-2">{item.name}</span>
              </div>
            </TableCell>
            <TableCell>{item.qty}</TableCell>
            <TableCell>{formatCurrency(Number(item.price))}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderTable;