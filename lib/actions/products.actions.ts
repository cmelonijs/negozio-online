"use server";

import { prisma } from "@/db/prisma";
import { convertToPlainObject, formatError } from "../utils";
import { revalidatePath } from "next/cache";
import { insertProductSchema, updateProductSchema,reviewSchema,updateReviewSchema } from "../validators";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { LATEST_PRODUCT_LIMIT, PAGE_SIZE } from "../costants";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { getUserById } from "./user.actions";
import { auth } from "@/auth";

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



// Create a new review
export async function createReview(data: z.infer<typeof reviewSchema>) {
  try {
    // Validate the review data
    const review = reviewSchema.parse(data);
    
    // Check if the product exists
    const product = await prisma.product.findUnique({
      where: { id: review.productId },
    });
    
    if (!product) {
      throw new Error("Product not found");
    }
    
    // Create the review
    await prisma.review.create({
      data: review,
    });
    
    // Update the product's rating and numReviews
    await updateProductRating(review.productId);
    
    // Revalidate product page
    revalidatePath(`/products/${product.slug}`);
    
    return {
      success: true,
      message: "Review added successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

// Update an existing review
export async function updateReview(data: z.infer<typeof updateReviewSchema>) {
  try {
    // Validate the review data
    const review = updateReviewSchema.parse(data);
    
    // Check if the review exists
    const reviewExists = await prisma.review.findUnique({
      where: { id: review.id },
    });
    
    if (!reviewExists) {
      throw new Error("Review not found");
    }
    
    // Update the review
    await prisma.review.update({
      where: { id: review.id },
      data: {
        title: review.title,
        content: review.content,
        rating: review.rating,
      },
    });
    
    // Update the product's rating
    await updateProductRating(review.productId);
    
    // Get product slug for revalidation
    const product = await prisma.product.findUnique({
      where: { id: review.productId },
      select: { slug: true },
    });
    
    if (product) {
      revalidatePath(`/products/${product.slug}`);
    }
    
    return {
      success: true,
      message: "Review updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

// Delete a review
export async function deleteReview(id: string) {
  try {
    // Check if the review exists
    const review = await prisma.review.findUnique({
      where: { id },
    });
    
    if (!review) {
      throw new Error("Review not found");
    }
    
    const productId = review.id;
    
    // Delete the review
    await prisma.review.delete({
      where: { id },
    });
    
    // Update the product's rating
    await updateProductRating(productId);
    
    // Get product slug for revalidation
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { slug: true },
    });
    
    if (product) {
      revalidatePath(`/products/${product.slug}`);
    }
    
    return {
      success: true,
      message: "Review deleted successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

// Get all reviews with pagination
export async function getReviews({
  page = 1,
  limit = PAGE_SIZE,
}: {
  page?: number;
  limit?: number;
}) {
  try {
    const reviews = await prisma.review.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        id: "desc",
      },
    });
    
    const totalReviews = await prisma.review.count();
    
    return {
      data: convertToPlainObject(reviews),
      totalPages: Math.ceil(totalReviews / limit),
      currentPage: page,
    };
  } catch (err) {
    console.error("Error fetching reviews:", err);
    throw new Error(formatError(err));
  }
}

export async function getReviewsByProductId({
  productId
}: {
  productId: string;
}) {
  try {
    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: {
        id: "desc",
      },
    });
    
    return {
      data: convertToPlainObject(reviews)
    };
  } catch (err) {
    console.error("Error fetching product reviews:", err);
    throw new Error(formatError(err));
  }
}

// Helper function to update a product's rating based on its reviews
async function updateProductRating(productId: string) {
  try {
    // Get all reviews for the product
    const reviews = await prisma.review.findMany({
      where: { productId },
      select: { rating: true },
    });
    
    // Calculate the average rating
    let avgRating = 0;
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + Number(review.rating), 0);
      avgRating = totalRating / reviews.length;
    }
    
    // Update the product's rating and number of reviews
    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: avgRating,
        numReviews: reviews.length,
      },
    });
    
    return true;
  } catch (err) {
    console.error("Error updating product rating:", err);
    throw new Error(formatError(err));
  }
}
export async function canUserReviewProduct(userId: string, productId: string) {
  try {
    // Check if the user has ordered this product and it was delivered
    const orders = await prisma.order.findMany({
      where: {
        userId,
        isDelivered: true,
        isPaid: true,
      }
    });
    
    if (orders.length === 0) {
      return false;
    }
    
    // Check if user has already reviewed this product
    const existingReview = await prisma.review.findFirst({
      where: {
        userId,
        productId
      }
    });
    
    // User can review if they haven't already done so
    return !existingReview;
  } catch (error) {
    console.error("Error checking if user can review product:", error);
    return false;
  }
}

export async function addReview(review: { 
  productId: string; 
  rating: number; 
  title: string; 
  comment: string;
}) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return {
      success: false,
      message: "You must be logged in to add a review",
    };
  }
  
  try {
    const canReview = await canUserReviewProduct(session.user.id, review.productId);
    
    if (!canReview) {
      return {
        success: false,
        message: "You can only review products you have purchased and received",
      };
    }
    
    const user = await getUserById(session.user.id);
    
    // Create the review
    await prisma.review.create({
      data: {
        userId: session.user.id,
        productId: review.productId,
        rating: review.rating,
        userName: user.name || "Anonymous",
        title: review.title,
        content: review.comment,
      },
    });
    
    // Update product rating and review count
    await updateProductRating(review.productId);
    
    return {
      success: true,
      message: "Review added successfully!",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}