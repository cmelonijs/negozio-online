import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/product/product-list";

const RootPage = () => {
  return (
    <>
      <div className="product-cards-bigdiv">
          <ProductList 
          data={sampleData} 
          title="Product Cards" 
          limit={4}/>
      </div>
    </>
  );
};

export default RootPage;
