/* import { cn } from "@/lib/utils";

const ProductImage = ({
  value,
  className,
}: {
  value: string[];
  className?: string;
}) => {
  
  
};

export default ProductImage;
 */
"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ProductImage = ({
  value,
  className,
}: {
  value: string[];
  className?: string;
}) => {
  const [selectedImage, setSelectedImage] = useState(value[0]);

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative w-64 h-64 border rounded-lg overflow-hidden shadow-md">
        <Image
          src={selectedImage}
          alt="Selected Product"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <div className="flex gap-2">
        {value.map((img, index) => (
          <div
            key={index}
            className={cn(
              "relative w-16 h-16 border cursor-pointer rounded-md overflow-hidden transition-all duration-300",
              selectedImage === img ? "border-blue-500" : "border-gray-300"
            )}
            onClick={() => setSelectedImage(img)}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-md hover:opacity-80"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
