import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/products.actions";
import CarouselClient from "@/components/shared/carousel";
import InfoComponent from "@/components/shared/infoComponent";
import ProductFilter from "@/components/shared/product/filter";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();

  const images = [
    { id: 1, src: "../../images/banner-1.jpg", alt: "Banner 1" },
    { id: 2, src: "../../images/banner-2.jpg", alt: "Banner 2" },
  ];

  return (
    <>
      <div className="space-y-8">
        <ProductFilter title="Newest Arrivals" data={latestProducts} />
      </div>
      <div className="carousel">
        <CarouselClient images={images} />
      </div>
      <div className="space-y-8">
        <ProductList title="Newest Arrivals" data={latestProducts} />
      </div>
      <div className="space-y-8">
        <InfoComponent />
      </div>
    </>
  );
};

export default HomePage;
