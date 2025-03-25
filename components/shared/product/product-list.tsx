import ProductCard from "./product-card";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ProductList = ({
  data,
  title,
  limit,
}: {
  data: any;
  title?: string;
  limit?: number;
}) => {
  const limitedData = limit ? data.products.slice(0, limit) : data;

  return (
    <div  className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.products.length > 0 ? (
        <div  className="flex wrap gap-4">
          {limitedData.map((product: any) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div>
          <p>No product found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
