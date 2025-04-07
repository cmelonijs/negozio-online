import { getMyOrders } from "@/lib/actions/order.actions";
import MyOrdersTable from "./orders-table";

const OrdersPage = async () => {
  
  const { data: rawOrders, totalPages } = await getMyOrders({ limit: 4, page: 1 });

 
  const orders = rawOrders.map(order => ({
    id: order.id,
    createdAt: order.createdAt.toISOString(), 
    totalPrice: Number(order.totalPrice), 
    isPaid: order.isPaid,
    isDelivered: order.isDelivered,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <MyOrdersTable orders={orders} totalPages={totalPages} />
    </div>
  );
};

export default OrdersPage;