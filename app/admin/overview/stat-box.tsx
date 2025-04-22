"use client";

import { Card } from "@/components/ui/card";
import {
  Users,
  Barcode,
  BadgeDollarSign,
  CreditCard,
} from "lucide-react";

type StatBoxProps = {
  title: string;
  value: number | 0;
  iconType: "users" | "products" | "revenue" | "sales";
  isCurrency?: boolean;
};

const iconsMap = {
  users: Users,
  products: Barcode,
  revenue: BadgeDollarSign,
  sales: CreditCard,
};

const StatBox = ({ title, value, iconType, isCurrency = false }: StatBoxProps) => {
  const IconComponent = iconsMap[iconType];

  return (
    <Card className="p-4 flex flex-col justify-between h-36 rounded-lg border transition-all duration-300 hover:border-gray-500 dark:hover:border-white">
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold ml-1">{title}</h2>
        <IconComponent className="w-7 h-7 stroke-[2.5] text-black dark:text-white mr-1" />
      </div>
      <p className="text-4xl font-bold text-center mt-2 mb-4">
        {value !== null ? (isCurrency ? `${value.toFixed(2)}€` : value) : "—"}
      </p>
    </Card>
  );
};

export default StatBox;
