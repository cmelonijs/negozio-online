import Image from "next/image";
import ProductPrice from "./product.price";
import { Star } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/products/${product.slug}`} passHref>
    <Card className="w-full h-full flex flex-col hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48">
        <Image
          src={product.images[0]}
          layout="fill"
          className="object-cover rounded-t-md"
          alt={product.name}
        />
      </div>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ProductPrice value={product.price} />
      </CardContent>
      <CardFooter className="flex justify-center gap-1">
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </CardFooter>
    </Card>
    </Link>
  );
};

export default ProductCard;
