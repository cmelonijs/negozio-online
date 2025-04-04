"use client";

import { Cart } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const OrderProductsList = ({ cart }: { cart?: Cart }) => {

  return (
    <div className=" mx-auto space-y-4 p-6 bg-white shadow-lg rounded-lg mt-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Items</h2>
      
      {!cart || cart.items.length === 0 ? (
        <p className="text-amber-600">
          No items in cart. <Link href="/" className="text-blue-600 hover:underline">Go to shop</Link>
        </p>
      ) : (
        <div className="space-y-4">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.items.map((item) => (
                <TableRow key={item.slug}>
                  <TableCell>
                    <Link
                      className="flex items-center"
                      href={`/product/${item.slug}`}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded"
                      />
                      <span className="px-2 text-gray-700 text-sm">{item.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell className="text-center text-gray-700">
                    {item.qty}
                  </TableCell>
                  <TableCell className="text-right text-gray-700">€{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="border-t pt-4">
            <p className="text-gray-700 font-medium">
              Subtotal: <span className="float-right">€{cart.itemsPrice}</span>
            </p>
          </div>
          
          <Button 
            className="w-full mt-2"
            variant="outline"
            onClick={() =>redirect("/cart")}
          >
            Edit Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderProductsList;