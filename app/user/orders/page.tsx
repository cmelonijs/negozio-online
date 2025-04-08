import { getMyOrders } from "@/lib/actions/order.actions";
import MyOrdersTable from "./orders-table";
import { Order } from "@/types";

// 'searchParams' is a Promise that resolves to an object like { page: "1", sort: "asc" }, where keys are strings and values are strings or undefined.
// The type Promise<Record<string, string | undefined>> means it's a promise of a key-value object used to capture URL query params.
const OrdersPage = async ({ searchParams }: { searchParams: Promise<Record<string, string>> }) => {
  const resolvedSearchParams = await searchParams; 
  const currentPage = Number(resolvedSearchParams.page) || 1;

  const { data: rawOrders, totalPages } = await getMyOrders({ limit: 6, page: currentPage });
  
  // Transform rawOrders to match the Order type
  const orders: Order[] = rawOrders.map((order) => {
    const parsedAddress = typeof order.shippingAddress === 'string'
      ? JSON.parse(order.shippingAddress)
      : order.shippingAddress;
  
    return {
      id: order.id,
      createdAt: new Date(order.createdAt),
      userId: order.userId,
      shippingAddress: {
        fullName: parsedAddress?.fullName ?? "",
        streetAddress: parsedAddress?.streetAddress ?? "",
        city: parsedAddress?.city ?? "",
        postalCode: parsedAddress?.postalCode ?? "",
        Country: parsedAddress?.Country ?? "",
        lat: parsedAddress?.lat,
        lng: parsedAddress?.lng,
      },
      paymentMethod: order.paymentMethod,
      PaymentResult: order.PaymentResult,
      itemsPrice: order.itemsPrice.toString(),
      totalPrice: order.totalPrice.toString(),
      shippingPrice: order.shippingPrice.toString(),
      taxPrice: order.taxPrice.toString(),
      isPaid: order.isPaid,
      paidAt: order.paidAt ? new Date(order.paidAt) : null,
      isDelivered: order.isDelivered,
      deliveredAt: order.deliveredAt ? new Date(order.deliveredAt) : null,
      orderItems: [], 
      user: {
        name: "",
        email: "",
      },
    };
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <MyOrdersTable orders={orders} totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};

export default OrdersPage;