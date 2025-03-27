import { notFound } from "next/navigation";
import ProductImage from '@/components/shared/product/product.images'
import { getProductBySlug } from "@/lib/actions/products.actions";

export default async function ProductPage (props: { params: Promise<{ slug: string }>; }) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 max-w-screen-xl m-auto px-4 md:px-8 lg:px-12 xl:px-16 py-8 md:py-12 lg:py-16 xl:py-20">
      <section className="flex flex-col items-start gap-8 md:flex-row md:gap-4 xl:gap-6">
        
        <div className="w-full md:w-1/2">
        <ProductImage value={product.images}/>
        </div>

        
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg">{product.description}</p>
          <p className="text-lg font-bold">Precio: ${product.price.toString()}</p>
          <p className="text-lg">Calificación: {product.rating.toString()} / 5</p>
          <p className="text-lg">Revisiónes: {product.numReviews}</p>
          <p className="text-lg">Stock: {product.stock}</p>
          <p className="text-lg">Categoría: {product.category}</p>
          <p className="text-lg">Marca: {product.brand}</p>
        </div>
      </section>
    </div>
  );
}
