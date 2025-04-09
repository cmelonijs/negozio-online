"use client";

import { useTransition } from "react";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";
import { Cart } from "@/types";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addItemToCart, removeItemFormCart } from "@/lib/actions/cart.actions";
import { toast } from "sonner";

const CartTable = ({ cart }: { cart?: Cart }) => {

  const [isPending, startTransition] = useTransition();

  return (
    <>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go to shop</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table className="bg-white dark:bg-black">
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
                        href={`/products/${item.slug}`}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="flex-center gap-2">
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                        onClick={
                          () => {
                            startTransition(async () => {
                              const res = await removeItemFormCart(
                                item.productId
                              );
                              if (!res.success) {
                                toast.error(res.message);
                                return;
                              }
                            })
                          }
                        }
                      >
                        {isPending ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Minus className="w-4 h-4" />
                        )}
                      </Button>
                      <span>{item.qty}</span>
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                        onClick={
                          () => {
                            startTransition(async () => {
                              const res = await addItemToCart(item);
 
                              if (!res.success) {
                                toast.error(res.message);
                                return;
                              }
                            })
                           }
                           
                        }
                      >
                        {isPending ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">€{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Card>
            <CardContent className="p-4 gap-4">
              <div className="pb-3 text-xl">
                Subtotal({cart.items.reduce((acc, curr) => acc + curr.qty, 0)}
                ): <span className="font-bold">{cart.itemsPrice}</span>
              </div>
              <Link
                href="/shipping-address"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-yellow-500 font-semibold rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:bg-yellow-600"
              >
                {isPending ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                Proceed to checkout
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CartTable;
