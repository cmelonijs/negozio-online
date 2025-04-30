// app/search/page.tsx
import { getLatestProducts } from "@/lib/actions/products.actions";
import ProductList from "@/components/shared/product/product-list";


type SearchParams = {
  searchParams: {
    q?: string;
    category?: string;
  };
};

export default async function SearchPage({ searchParams }: SearchParams) {
  const { q = "", category = "" } = searchParams;

  const allProducts = await getLatestProducts(); // Replace with your data fetching logic

  const filteredProducts = allProducts.filter((product: { name: string; category: string; }) => {
    const matchesName = q
      ? product.name.toLowerCase().includes(q.toLowerCase())
      : true;
    const matchesCategory =
      category && category !== "all"
        ? product.category === category
        : true;
    return matchesName && matchesCategory;
  });

  if (filteredProducts.length === 0) {
    return <div className="p-8 text-center">No products found.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">
        Results for &quot;{q}&quot; {category && `in ${category}`}
      </h1>
      <ProductList title="Search Results" data={filteredProducts} />
    </div>
  );
}
