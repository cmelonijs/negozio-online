import { Metadata } from "next";
import Image from "next/image";
import { getOrderById } from "@/lib/actions/order.actions";
import { formatCurrency } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Decimal } from "@prisma/client/runtime/library";

export const metadata: Metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async ({ params }: { params: { id: string } }) => {
  const order = await getOrderById(params.id);

  if (!order) {
    return <div>Order not found</div>;
  }

  const { shippingAddress, paymentMethod, OrderItem, itemsPrice, taxPrice, shippingPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt } = order as {
    shippingAddress: { fullName: string; streetAddress: string; city: string; postalCode: string; country: string } | null;
    paymentMethod: string;
    OrderItem: { slug: string; image: string; name: string; qty: number; price: Decimal }[];
    itemsPrice: Decimal;
    taxPrice: Decimal;
    shippingPrice: Decimal;
    totalPrice: Decimal;
    isPaid: boolean;
    paidAt: string | null;
    isDelivered: boolean;
    deliveredAt: string | null;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Order Details</h1>
      <p>Order ID: {params.id}</p>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl pb-4">Shipping Address</h2>
          {shippingAddress ? (
            <>
              <p>{shippingAddress.fullName}</p>
              <p>
                {shippingAddress.streetAddress}, {shippingAddress.city} <br />
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </>
          ) : (
            <p>Shipping address not available</p>
          )}
          <p>
            <strong>Status:</strong> {isDelivered && deliveredAt ? `Delivered at ${new Date(deliveredAt).toLocaleString()}` : "Not Delivered"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl pb-4">Payment Method</h2>
          <p>{paymentMethod}</p>
          <p>
            <strong>Status:</strong> {isPaid && paidAt ? `Paid at ${new Date(paidAt).toLocaleString()}` : "Not Paid"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl pb-4">Order Items</h2>
          <Table className="bg-white dark:bg-black">
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {OrderItem.map((item: { slug: string; image: string; name: string; qty: number; price: Decimal }) => (
                <TableRow key={item.slug}>
                  <TableCell>
                    <div className="flex items-center">
                      <Image src={item.image} alt={item.name} width={50} height={50} />
                      <span className="ml-2">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>{formatCurrency(Number(item.price))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl pb-4">Order Summary</h2>
          <div className="flex justify-between">
            <span>Items Price:</span>
            <span>{formatCurrency(Number(itemsPrice))}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax Price:</span>
            <span>{formatCurrency(Number(taxPrice))}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Price:</span>
            <span>{formatCurrency(Number(shippingPrice))}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total Price:</span>
            <span>{formatCurrency(Number(totalPrice))}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailsPage;