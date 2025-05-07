import { adminDashboardStats } from "@/lib/actions/user.actions";
import { getOrdersByMonth, getRecentSales } from "@/lib/actions/order.actions";
import StatBox from "./stat-box";
import RecentSales from "./recent-sales";
import { Graph } from "./graph";

type Sale = {
  id: string;
  name: string;
  date: string;
  totalPrice: number;
};

const OverviewsPage = async () => {
  const { total: totalProducts } = await adminDashboardStats("products");
  const { total: totalUsers } = await adminDashboardStats("users", "user");
  const { total: totalOrders } = await adminDashboardStats("orders");
  const { total: totalRevenue } = await adminDashboardStats("revenue");

  const salesResponse = await getRecentSales();

  let formattedSales: Sale[] = [];

  if (Array.isArray(salesResponse)) {
    formattedSales = salesResponse.map((sale) => ({
      id: sale.id,
      name: sale.name,
      date: sale.date.toISOString(),
      totalPrice: parseFloat(sale.totalPrice.toString()),
    }));
  }

  const chartData = await getOrdersByMonth(); 

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">This is the overview page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
        <StatBox title="Revenue" value={totalRevenue ?? 0} iconType="revenue" isCurrency />
        <StatBox title="Sales" value={totalOrders ?? 0} iconType="sales" />
        <StatBox title="Customers" value={totalUsers ?? 0} iconType="users" />
        <StatBox title="Products" value={totalProducts ?? 0} iconType="products" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
    <Graph data={chartData }/>
    <RecentSales sales={formattedSales} />
  </div>
    </>
  );
};

export default OverviewsPage;
