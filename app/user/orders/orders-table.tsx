"use client";

import Link from "next/link";
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
    <div className="flex flex-col items-center justify-start min-h-screen py-8 px-4">
      <Table className="bg-white dark:bg-black w-full table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2">ID</TableHead>
            <TableHead className="px-4 py-2">DATE</TableHead>
            <TableHead className="px-4 py-2">TOTAL</TableHead>
            <TableHead className="px-4 py-2">PAID</TableHead>
            <TableHead className="px-4 py-2">DELIVERED</TableHead>
            <TableHead className="px-4 py-2">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <TableCell className="px-4 py-2">
                <Link href={`/order/${order.id}`} className="hover:underline">
                  {order.id}
                </Link>
              </TableCell>
              <TableCell className="px-4 py-2">
                {new Date(order.createdAt).toLocaleString()}
              </TableCell>
              <TableCell className="px-4 py-2">
                {formatCurrency(order.totalPrice)}
              </TableCell>
              <TableCell className="px-4 py-2">
                {order.isPaid ? "Yes" : "No"}
              </TableCell>
              <TableCell className="px-4 py-2">
                {order.isDelivered ? "Yes" : "No"}
              </TableCell>
              <TableCell className="px-4 py-2">
                <Link
                  href={`/order/${order.id}`}
                  className="text-yellow-500 hover:underline hover:text-yellow-600"
                >
                  Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4">
        <Pagination page={currentPage} totalPages={totalPages} urlParamName="page" />
      </div>
    </div>
  );
};

export default MyOrdersTable;