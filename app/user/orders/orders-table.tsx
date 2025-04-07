"use client";

import { formatCurrency } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Order = {
  id: string;
  createdAt: string;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
};

const MyOrdersTable = ({
  orders,
  totalPages,
}: {
  orders: Order[];
  totalPages: number;
}) => {
  return (
    <div>
      <Table className="bg-white dark:bg-black">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>DATE</TableHead>
            <TableHead>TOTAL</TableHead>
            <TableHead>PAID</TableHead>
            <TableHead>DELIVERED</TableHead>
            <TableHead>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleString()} {/* Muestra fecha y hora */}
              </TableCell>
              <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
              <TableCell>{order.isPaid ? "Yes" : "No"}</TableCell>
              <TableCell>{order.isDelivered ? "Yes" : "No"}</TableCell>
              <TableCell>
                <button className="text-yellow-500 hover:underline hover:text-yellow-600">
                  Details
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-4">Total Pages: {totalPages}</p>
    </div>
  );
};

export default MyOrdersTable;