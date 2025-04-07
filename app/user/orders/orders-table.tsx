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
import Pagination from "@/components/shared/pagination";
import { Order } from "@/types";

const MyOrdersTable = ({
  orders,
  totalPages,
  currentPage,
}: {
  orders: Order[];
  totalPages: number;
  currentPage: number;
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
                {new Date(order.createdAt).toLocaleString()} {/* Show date and time */}
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
      <Pagination page={currentPage} totalPages={totalPages} urlParamName="page" />
    </div>
  );
};

export default MyOrdersTable;