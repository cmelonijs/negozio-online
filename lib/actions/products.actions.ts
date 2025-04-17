"use server";

import { prisma } from "@/db/prisma";
import { convertToPlainObject, formatError } from "../utils";
import { revalidatePath } from "next/cache";
import { insertProductSchema, updateProductSchema } from "../validators";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { LATEST_PRODUCT_LIMIT, PAGE_SIZE } from "../costants";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

// get latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCT_LIMIT,
    orderBy: {
      createdAt: "desc",
    },
  });

  //   return data;
  return convertToPlainObject(data);
}

// get signle product by slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}

// get single product by id
export async function getProductById(productId: string) {
  const data = await prisma.product.findFirst({
    where: { id: productId },
  });

  return convertToPlainObject(data);
}

export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
  price,
  rating,
  sort,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
  price?: string;
  rating?: string;
  sort?: string;
}) {
  // Query filter
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          } as Prisma.StringFilter,
        }
      : {};

  // Category filter
  const categoryFilter = category && category !== "all" ? { category } : {};

  // Price filter
  const priceFilter: Prisma.ProductWhereInput =
    price && price !== "all"
      ? {
          price: {
            gte: Number(price.split("-")[0]),
            lte: Number(price.split("-")[1]),
          },
        }
      : {};

  // Rating filter
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            gte: Number(rating),
          },
        }
      : {};

  const data = await prisma.product.findMany({
    where: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    },
    // this is added now for sorting
    orderBy:
      sort === "lowest"
        ? { price: "asc" }
        : sort === "highest"
          ? { price: "desc" }
          : sort === "rating"
            ? { rating: "desc" }
            : { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  const dataCount = await prisma.product.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

// delete product
export async function deleteProduct(id: string) {
  try {
    const productExists = await prisma.product.findFirst({
      where: {
        id: id,
      },
    });

    if (!productExists) throw new Error("Product is not found");

    await prisma.product.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

// create a product
export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  try {
    const product = insertProductSchema.parse(data);

    await prisma.product.create({
      data: product,
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

// update a product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data);

    const productExists = await prisma.product.findFirst({
      where: {
        id: product.id,
      },
    });

    if (!productExists) throw new Error("Product not found");

    await prisma.product.update({
      where: {
        id: product.id,
      },
      data: product,
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

// get all categories
export async function getAllCategories() {
  const data = await prisma.product.groupBy({
    by: ["category"],
    _count: true,
  });

  return data;
}

// get featured products
export async function getFeaturedProducts() {
  const data = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return convertToPlainObject(data);
}
export async function getSlugBasedOnName(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .substring(0, 50);
  return slug;
}

// Upload product images
export async function uploadProductImages(files: File[]): Promise<string[]> {
  try {
    const uploadedImages: string[] = [];
    
    const uploadDir = path.join(process.cwd(), "public", "images", "sample-products");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    for (const file of files) {
      if (file.size > 0) {
        // Validate file size (4MB limit)
        if (file.size > 4 * 1024 * 1024) {
          throw new Error(`Image ${file.name} exceeds the 4MB size limit`);
        }
        
        // Create a unique filename
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.name.replace(/\s+/g, "-")}`;
        
        // Define the file path
        const filePath = path.join(uploadDir, filename);
        
        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Write file to the sample-products directory
        await writeFile(filePath, buffer);
        
        // Add the correct relative path to the uploaded images array
        uploadedImages.push(`/images/sample-products/${filename}`);
      }
    }
    
    return uploadedImages;
  } catch (err) {
    console.error("Error uploading images:", err);
    throw new Error(formatError(err));
  }
}