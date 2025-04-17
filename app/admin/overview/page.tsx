import { countAllProducts } from "@/lib/actions/products.actions";
import { countUsersWithRole } from "@/lib/actions/user.actions";
import { countAllOrders } from "@/lib/actions/order.actions";
import { getRecentSales } from "@/lib/actions/order.actions"; 
import ProductBox from "./products-box";
import CustomersBox from "./customers-box";
import SalesBox from "./sales-box";
import RecentSales from "./recent-sales";

type Sale = {
  name: string;
  date: string; 
  totalPrice: number;  
};

const OverviewsPage = async () => {
  const { total: totalProducts } = await countAllProducts();
  const { total: totalUsers } = await countUsersWithRole("user");
  const { totalOrders } = await countAllOrders();
  const salesResponse = await getRecentSales();


  let formattedSales: Sale[] = []; 

  if (Array.isArray(salesResponse)) {
    formattedSales = salesResponse.map((sale) => ({
      name: sale.name,
      date: sale.date.toISOString(), 
      totalPrice: parseFloat(sale.totalPrice.toString()), 
    }));
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">This is the overview page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
        <ProductBox total={typeof totalProducts === "number" ? totalProducts : null} />
        <CustomersBox total={typeof totalUsers === "number" ? totalUsers : null} />
        <SalesBox totalOrders={typeof totalOrders === "number" ? totalOrders : null} />
      </div>
      <RecentSales sales={formattedSales} /> 
    </>
  );
};

export default OverviewsPage;
