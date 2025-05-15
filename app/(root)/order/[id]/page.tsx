import { Metadata } from "next";
import { auth } from "@/auth";
import { getUserRole } from "@/lib/actions/user.actions";

import { getOrderById } from "@/lib/actions/order.actions";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Decimal } from "@prisma/client/runtime/library";
import OrderTable from "./order-tabla";
import { DynamicBreadcrumbs } from "@/components/shared/breadcrumb";
import MarkAsPaidButton from "@/components/admin/MarkAsPaidBtn";

export const metadata: Metadata = {
  title: "Order Details",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

const OrderDetailsPage = async ({ params }: PageProps) => {
  const awaitedParams = await params;
  
  const session = await auth();

  const userId = session?.user?.id;
const role = userId ? await getUserRole(userId) : null;
  const isAdmin = role === "admin";
  console.log("isAdmin", role);
 

  const order = await getOrderById(awaitedParams.id);
  if (!order) {
    return <div>Order not found</div>;
  }
  const {
    shippingAddress,
    paymentMethod,
    OrderItem,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order as {
    shippingAddress: {
      fullName: string;
      streetAddress: string;
      city: string;
      postalCode: string;
      country: string;
    } | null;
    paymentMethod: string;
    OrderItem: {
      slug: string;
      image: string;
      name: string;
      qty: number;
      price: Decimal;
    }[];
    itemsPrice: Decimal;
    taxPrice: Decimal;
    shippingPrice: Decimal;
    totalPrice: Decimal;
    isPaid: boolean;
    paidAt: string | null;
    isDelivered: boolean;
    deliveredAt: string | null;
  };

  console.log("isPaid", isPaid)
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Order Details</h1>
      <DynamicBreadcrumbs nonClickableSegments={["order"]} />
      <p>Order ID: {(await params).id}</p>

      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="flex flex-col space-y-6 lg:w-2/3">
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
                <strong>Status:</strong>{" "}
                {isDelivered && deliveredAt
                  ? `Delivered at ${new Date(deliveredAt).toLocaleString()}`
                  : "Not Delivered"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl pb-4">Payment Method</h2>
              <p>{paymentMethod}</p>
              <p>
                <strong>Status:</strong>{" "}
                {isPaid && paidAt
                  ? `Paid at ${new Date(paidAt).toLocaleString()}`
                  : "Not Paid"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl pb-4">Order Items</h2>
              <OrderTable
                order={OrderItem.map((item) => ({
                  ...item,
                  productId: item.slug,
                  price: item.price.toString(),
                }))}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/3">
          <Card>
            <CardContent className="p-4 space-y-4 pl-7 pr-7">
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
              {isAdmin && !isPaid && (
  <div className="pt-4">
    <MarkAsPaidButton orderId={(await params).id} />
  </div>
)}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;