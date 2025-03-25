import Image from "next/image";
import ProductPrice from "./product.price";
import { Star } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductCard = ({ product }: any) => {
  return (
    <Card key={product.slug}>
      <Image
        src={product.images[0]}
        width={250}
        height={500}
        className="object-cover"
        alt={product.name} 
      />
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ProductPrice value={product.price}/>
      </CardContent>
      <CardFooter>
        <Star/><Star/><Star/><Star/><Star/>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
