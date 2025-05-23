import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/products.actions";
import CarouselClient from "@/components/shared/carousel";
import InfoComponent from "@/components/shared/infoComponent";
import ViewProductsBtn from "@/components/shared/viewProductsBtn";
import { CountdownTimer } from "@/components/shared/dealCountdown";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();

  const images = [
    { id: 1, src: "/images/banner-1.jpg", alt: "Banner 1" },
    { id: 2, src: "/images/banner-2.jpg", alt: "Banner 2" },
  ];

  const dealEndDate = new Date("2025-05-31T23:59:59");

  return (
    <>
      <div className="carousel">
        <CarouselClient images={images} />
      </div>
      <div className="space-y-10">
      <ProductList title="Newest Arrivals" data={latestProducts} />
      <ViewProductsBtn />
      <InfoComponent />
      <CountdownTimer finalDate={dealEndDate} />
      </div>
   
    </>
  );
};

export default HomePage;
