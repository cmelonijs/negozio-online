"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Sale = {
  id: string;
  name: string;
  date: string;
  totalPrice: number;
};

type Props = {
  sales: Sale[];
};

const RecentSales = ({ sales }: Props) => {
  return (
    <Card className="p-4 flex flex-col rounded-lg border transition-all duration-300 hover:border-gray-500 dark:hover:border-white">
      <CardHeader>
        <CardTitle className="text-xl">Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="rounded-lg border border-gray-200 dark:border-gray-700">
          <Table>
            <TableHeader className="bg-gray-100 dark:bg-gray-800">
              <TableRow>
                <TableHead className="text-gray-700 dark:text-gray-300">Customer</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">Date</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">Total</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white dark:bg-gray-900">
              {sales.map((sale, index) => (
                <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <TableCell className="text-gray-900 dark:text-gray-100">{sale.name}</TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {new Date(sale.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                    ${sale.totalPrice.toFixed(2)}
                  </TableCell>
                  <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                    <Link
                      href={`/order/${sale.id}`}
                      className="hover:underline hover:text-yellow-600"
                    >
                      Details
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSales;
