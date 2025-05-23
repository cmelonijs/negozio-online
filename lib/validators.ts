import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";
import { PAYMENT_METHODS } from "./costants";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places (e.g., 49.99)"
  );

export const productFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  price: z.coerce.number().min(0.01, "Price must be at least 0.01"),
  stock: z.coerce.number().min(0, "Stock must be at least 0"),
  rating: z.coerce.number().min(0, "Rating must be at least 0").max(5, "Rating must be at most 5").default(0),
  numReviews: z.coerce.number().min(0, "Number of reviews must be at least 0").default(0),
  category: z.string().min(3, "Category must be at least 3 characters"),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  images: z.array(z.string()).min(1, "At least one product image is required"),
  isFeatured: z.boolean().default(false),
});

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  price: currency,
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
});

// SCHEMA FOR UPDATING PRODUCT
export const updateProductSchema = insertProductSchema.extend({
  id: z.string().min(1, "Id is required"),
});

// SCHEMA FOR SIGNING USER IN
export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters"),
});

export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a positive number"),
  image: z.string().min(1, "An image is required"),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Session cart ID is required"),
  userId: z.string().optional().nullable(),
});

// SHIPPING ADDRESS SCHEMA
export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  streetAddress: z
    .string()
    .min(3, "Street address must be at least 3 characters"),
  city: z.string().min(3, "City name must be at least 3 characters"),
  postalCode: z.string().min(3, "Postal code must be at least 3 characters"),
  Country: z.string().min(3, "Country Name must be at least 3 characters"),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

// PAYMENT METHOD SCHEMA
export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, "Payment method is required"),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ["type"],
    message: "Invalid payment method",
  });

export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User is required"),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: "Invalid Payment method",
  }),
  shippingAddress: shippingAddressSchema,
});

// SCHEMA FOR INSERTING ORDER ITEM
export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});

// SCHEMA FOR UPDATING USER PROFILE
export const updateProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().min(3, "Email must be at least 3 characters"),
});

export const updateUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().min(3, "Email must be at least 3 characters"),
  role: z.string().refine(
    (val) => val === "admin" || val === "user",
    { message: "Role must be either admin or user" }
  )  
});
// Review schema definition
export const reviewSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(5, "Review content must be at least 5 characters"),
  rating: z.number().min(1).max(5),
  productId: z.string().uuid("Invalid product ID"),
  userId: z.string(),
  userName: z.string(),
});

export const updateReviewSchema = reviewSchema.extend({
  id: z.string().uuid("Invalid review ID"),
});