import sampleData from "@/db/sample-data";
import ProductCard from "@/components/shared/product/product-card";

const RootPage = () => {
  return (
    <>
      <div className="product-cards-bigdiv">
        <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {sampleData.products.slice(0, 4).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RootPage;
