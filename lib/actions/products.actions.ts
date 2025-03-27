"use server";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../costants";
import { prisma } from "@/db/prisma";

// Get the latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(data);
}
