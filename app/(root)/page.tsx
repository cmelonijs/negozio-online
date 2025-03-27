/* import sampleData from "@/db/sample-data";
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
 */
 
import ProductList from "@/components/shared/product/product-list";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function RootPage() {
  try {
    
    const products = await prisma.product.findMany({
      take: 4, // Limit the products to 4
    });

    return (

      <div className="product-cards-bigdiv flex wrapper">
        <div className="responsive-cards-div  flex-wrap">
        <ProductList data={products} title="Product Cards" limit={4} />
      </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return <div>Error fetching products</div>;
  }
}
