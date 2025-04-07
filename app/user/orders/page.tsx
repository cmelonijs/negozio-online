import { getMyOrders } from "@/lib/actions/order.actions";
import MyOrdersTable from "./orders-table";

const OrdersPage = async () => {
  // Llamamos a la función para obtener los pedidos del usuario
  const { data: rawOrders, totalPages } = await getMyOrders({ limit: 4, page: 1 });

  // Convertimos los datos para que sean compatibles con el componente cliente
  const orders = rawOrders.map(order => ({
    id: order.id,
    createdAt: order.createdAt.toISOString(), // Convertimos la fecha a string
    totalPrice: Number(order.totalPrice), // Convertimos Decimal a número
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