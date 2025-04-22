"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Sale = {
  name: string;
  date: string; 
  totalPrice: number;
};

type Props = {
  sales: Sale[];
};

const RecentSales = ({ sales }: Props) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Recent Sales
      </h2>
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <Table>
          <TableHeader className="bg-gray-100 dark:bg-gray-800">
            <TableRow>
              <TableHead className="text-gray-700 dark:text-gray-300">
                Customer
              </TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">
                Date
              </TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">
                Total
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white dark:bg-gray-900">
            {sales.map((sale, index) => (
              <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <TableCell className="text-gray-900 dark:text-gray-100">
                  {sale.name}
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">
                  {new Date(sale.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                  ${sale.totalPrice.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecentSales;
