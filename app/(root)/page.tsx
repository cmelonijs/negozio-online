import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";

const RootPage = () => {
  return (
    <>
      <ProductList
        data={sampleData.products}
        title="Newest Arrivals"
        limit={2}
      />
    </>
  );
};

export default RootPage;
