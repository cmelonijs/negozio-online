import { getMyOrders } from "@/lib/actions/order.actions";
import MyOrdersTable from "./orders-table";

const OrdersPage = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const currentPage = Number(searchParams.page) || 1; 

  const { data: rawOrders, totalPages } = await getMyOrders({ limit: 3, page: currentPage });

  const orders = rawOrders.map(order => ({
    id: order.id,
    createdAt: new Date(order.createdAt),
    userId: order.userId,
    shippingAddress: order.shippingAddress,
    paymentMethod: order.paymentMethod,
    PaymentResult: order.PaymentResult,
    itemsPrice: order.itemsPrice,
    totalPrice: order.totalPrice,
    isPaid: order.isPaid,
    isDelivered: order.isDelivered,
    deliveredAt: order.deliveredAt ? new Date(order.deliveredAt) : null,
    shippingPrice: order.shippingPrice,
    taxPrice: order.taxPrice,
    paidAt: order.paidAt ? new Date(order.paidAt) : null,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <MyOrdersTable orders={orders} totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};

export default OrdersPage;