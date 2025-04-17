"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { z } from "zod";
import { createProduct, getSlugBasedOnName, updateProduct } from "@/lib/actions/products.actions";
import { productFormSchema } from "@/lib/validators";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { MultipleImageUpload } from "@/components/MultipleImageUpload";

// Field configuration type
type FieldConfig = {
  name: keyof z.infer<typeof productFormSchema>;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
  min?: string;
  max?: string;
  step?: string;
  isCheckbox?: boolean;
  checkboxLabel?: string;
  fullWidth?: boolean;
  isImageUpload?: boolean;
};

type ProductType = z.infer<typeof productFormSchema> & {
  id?: string;
  images?: string[];
  banner?: string | null;
};

export default function ProductForm({ product }: { product?: ProductType }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const isEditMode = !!product;

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      price: 0,
      stock: 0,
      rating: 0,
      numReviews: 0,
      category: "",
      brand: "",
      images: [], // Changed from image and image2 to images array
      isFeatured: false,
    },
  });

  // Set form values when product data is available
  useEffect(() => {
    if (product) {
      const formValues = {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
        stock: product.stock,
        rating: product.rating,
        numReviews: product.numReviews,
        category: product.category,
        brand: product.brand,
        images: product.images || [], // Use the entire images array
        isFeatured: product.isFeatured,
      };
      
      form.reset(formValues);
    }
  }, [product, form]);

  const fields: FieldConfig[] = [
    { name: "name", label: "Product Name", placeholder: "Product name" },
    { 
      name: "slug", 
      label: "Slug", 
      placeholder: "product-slug"
    },
    { 
      name: "price", 
      label: "Price", 
      type: "number", 
      step: "0.01" 
    },
    { 
      name: "stock", 
      label: "Stock", 
      type: "number" 
    },
    { 
      name: "category", 
      label: "Category", 
      placeholder: "Category" 
    },
    { 
      name: "brand", 
      label: "Brand", 
      placeholder: "Brand" 
    },
    { 
      name: "images", 
      label: "Product Images", 
      description: "Upload product images (max 5, each less than 4MB)",
      isImageUpload: true
    },
    { 
      name: "isFeatured", 
      label: "Featured Product", 
      isCheckbox: true, 
      description: "Display this product in featured section" 
    },
    { 
      name: "description", 
      label: "Description", 
      placeholder: "Product description", 
      fullWidth: true 
    },
  ];

  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    try {
      setIsSubmitting(true);
      
      let result;
      
      if (isEditMode && product?.id) {
        // Update existing product
        result = await updateProduct({
          id: product.id,
          ...values,
          price: values.price.toString(),
          banner: product.banner || null,
        });
      } else {
        // Create new product
        result = await createProduct({
          ...values,
          price: values.price.toString(),
          banner: null,
        });
      }
      
      if (result.success) {
        toast.success(result.message); 
        router.push("/admin/products");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  const renderField = (fieldConfig: FieldConfig) => {
    const { name, label, placeholder, description, type, min, max, step, isCheckbox, isImageUpload, fullWidth } = fieldConfig;
    
    // Special case for the slug field to include the generate button
    if (name === "slug") {
      return (
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="dark:text-gray-200">
              <FormLabel className="dark:text-gray-200">{label}</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Input 
                    placeholder={placeholder} 
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500"
                    {...field} 
                  />
                </FormControl>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={async () => {
                    const productName = form.getValues("name");
                    if (productName) {
                      const generatedSlug = await getSlugBasedOnName(productName);
                      form.setValue("slug", generatedSlug);
                    } else {
                      toast.error("Please enter a product name first");
                    }
                  }}
                  className="dark:hover:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                >
                  Generate
                </Button>
              </div>
              {description && <FormDescription className="dark:text-gray-400">{description}</FormDescription>}
              <FormMessage className="dark:text-red-400" />
            </FormItem>
          )}
        />
      );
    }
    
    // Special case for image uploads
    if (isImageUpload) {
      return (
        <FormField
          key={name}
          control={form.control}
          name="images"
          render={({ field }) => (
            <MultipleImageUpload
              label={label}
              description={description}
              values={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              maxImages={5}
            />
          )}
        />
      );
    }
    
    // Default rendering for other fields
    return (
      <FormField
        key={name}
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem 
            className={`${isCheckbox ? "flex flex-row items-start space-x-3 space-y-0 p-4" : ""} dark:text-gray-200`}
          >
            {isCheckbox ? (
              <>
                <FormControl>
                  <Checkbox
                    checked={field.value as boolean}
                    onCheckedChange={field.onChange}
                    className="dark:border-gray-600"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="dark:text-gray-200">{label}</FormLabel>
                  {description && <FormDescription className="dark:text-gray-400">{description}</FormDescription>}
                </div>
              </>
            ) : (
              <>
                <FormLabel className="dark:text-gray-200">{label}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder={placeholder} 
                    type={type} 
                    min={min}
                    max={max}
                    step={step}
                    className={`${fullWidth ? "min-h-32" : ""} dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500`}
                    {...field} 
                    value={type === "number" && field.value === 0 ? "" : typeof field.value === "boolean" ? field.value.toString() : field.value}
                    onChange={e => {
                      if (type === "number") {
                        const value = e.target.value === "" ? 0 : parseFloat(e.target.value);
                        field.onChange(value);
                      } else {
                        field.onChange(e);
                      }
                    }}
                  />
                </FormControl>
                {description && <FormDescription className="dark:text-gray-400">{description}</FormDescription>}
                <FormMessage className="dark:text-red-400" />
              </>
            )}
          </FormItem>
        )}
      />
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 rounded-lg bg-white dark:bg-gray-900 border dark:border-gray-800 shadow-sm">
        <h2 className="text-xl font-bold mb-6 dark:text-white">Product Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields
            .filter(field => !field.fullWidth && !field.isImageUpload)
            .map(renderField)}
        </div>
        
        {/* Image upload section */}
        {fields
          .filter(field => field.isImageUpload)
          .map(renderField)}

        {fields
          .filter(field => field.fullWidth)
          .map(renderField)}

        <div className="flex justify-end space-x-4 pt-4 border-t dark:border-gray-800">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.back()}
            className="dark:hover:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="dark:bg-yellow-600 dark:hover:bg-yellow-700"
          >
            {isSubmitting 
              ? "Saving..." 
              : isEditMode ? "Update Product" : "Create Product"
            }
          </Button>
        </div>
      </form>
    </Form>
  );
}
