import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/products.actions";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <div className="space-y-8">
      <ProductList title="Newest Arrivals" data={latestProducts} />
    </div>
  );
};

export default HomePage;
