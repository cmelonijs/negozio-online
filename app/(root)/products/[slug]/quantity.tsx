"use client";

import PlusButton from "@/components/shared/product/addProduct";
import MinusButton from "@/components/shared/product/removeProduct";
import { CartItem } from "@/types";

export default function QuantityComponent({ item }: { item: CartItem }) {
  return(
    <div className="quantity-structure flex-center flex-row gap-2">
    <MinusButton item={item}></MinusButton>
    <span>{item.qty}</span>
    <PlusButton item={item}></PlusButton>
  </div>
)
}
