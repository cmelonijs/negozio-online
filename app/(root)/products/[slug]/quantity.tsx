"use client";

import PlusButton from "@/components/shared/product/addProduct";
import MinusButton from "@/components/shared/product/removeProduct";
import { CartItem } from "@/types";

export default function QuantityComponent({ item }: { item: CartItem }) {
  return(
    <div className="quantity-structure flex-center flex-row gap-2">
    <PlusButton item={item}></PlusButton>
    <span>{item.qty}</span>
    <MinusButton item={item}></MinusButton>
  </div>
)
}
