"use client";

import React, { useState } from "react";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { getLatestProducts } from "@/lib/actions/products.actions";
import Image from "next/image";

const CarouselClient = ({ images }: { images: { id: number; src: string; alt: string; width?: number; height?: number }[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const handleBannerClick = async () => {
    const latestProducts = await getLatestProducts();
       const randomProduct =
      latestProducts[Math.floor(Math.random() * latestProducts.length)];

    router.push(`/products/${randomProduct.slug}`);
  };

  return (
    <div className="relative w-full h-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500 cursor-pointer"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onClick={handleBannerClick}
      >
        {images.map((image) => (
          <div key={image.id} className="flex-shrink-0 w-full">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width ?? 600}  
              height={image.height ?? 400} 
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>

      <Button
        onClick={goToPreviousSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-gray-900 text-black dark:text-white p-2 rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        <CircleArrowLeft size={24} />
      </Button>

      <Button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-gray-900 text-black dark:text-white p-2 rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        <CircleArrowRight size={24} />
      </Button>
    </div>
  );
};

export default CarouselClient;