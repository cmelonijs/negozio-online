import { auth } from "@/auth";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { ShippingAddress } from "@/types";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import PlaceOrderForm from "./place-order-form";

export const metadata: Metadata = {
  title: "Place Order",
};

const PlaceorderPage = async () => {
  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const user = await getUserById(userId);

  if (!cart || cart.items.length === 0) {
    // Use Link instead of redirect
    return (
      <div className="text-center">
        <p>Your cart is empty. <Link href="/cart" className="text-blue-500 hover:underline">Go back to your cart</Link>.</p>
      </div>
    );
  }

  if (!user.address) {
    // Use Link instead of redirect
    return (
      <div className="text-center">
        <p>You need to provide a shipping address. <Link href="/shipping-page" className="text-blue-500 hover:underline">Add your shipping address</Link>.</p>
      </div>
    );
  }

  if (!user.paymentMethod) {
    // Use Link instead of redirect
    return (
      <div className="text-center">
        <p>You need to select a payment method. <Link href="/payment-method" className="text-blue-500 hover:underline">Add your payment method</Link>.</p>
      </div>
    );
  }

  const userAddress = user.address as ShippingAddress;

  return (
    <>
      <CheckoutSteps current={3} />
      <h1 className="py-4 text-2xl font-semibold">Place Order</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-medium pb-4">Shipping Address</h2>
              <p>{userAddress.fullName}</p>
              <p>
                {userAddress.streetAddress}, {userAddress.city} <br />
                {userAddress.postalCode}, {userAddress.Country}
              </p>
              <div className="mt-4">
                <Link href="/shipping-address">
                  <Button variant="outline" >Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-medium pb-4">Payment Method</h2>
              <p>{user.paymentMethod}</p>
              <div className="mt-4">
                <Link href="/payment-method">
                  <Button variant="outline">Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-medium pb-4">Order Summary</h2>
              <Table className="bg-white dark:bg-gray-800">
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.items.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center space-x-3"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="rounded"
                          />
                          <span>{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell className="text-center">{item.qty}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between">
                <div>Items</div>
                <div>{formatCurrency(cart.itemsPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Tax</div>
                <div>{formatCurrency(cart.taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>{formatCurrency(cart.shippingPrice)}</div>
              </div>
              <div className="flex justify-between font-semibold">
                <div>Total</div>
                <div>{formatCurrency(cart.totalPrice)}</div>
              </div>
              <PlaceOrderForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PlaceorderPage;
