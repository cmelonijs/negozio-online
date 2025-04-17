"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

interface MultipleImageUploadProps {
  label: string;
  description?: string;
  values: string[];
  onChange: (values: string[]) => void;
  onBlur?: () => void;
  maxImages?: number;
}

export function MultipleImageUpload({
  label,
  description,
  values,
  onChange,
  onBlur,
  maxImages = 5,
}: MultipleImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    // Check if adding this file exceeds the max limit
    if (values.length >= maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }
    
    const file = e.target.files[0];
    
    // Validate file size (4MB)
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image must be less than 4MB");
      return;
    }
    
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("File must be an image");
      return;
    }
    
    try {
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append("files", file);
      
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || "Upload failed");
      }
      
      if (result.paths && result.paths.length > 0) {
        onChange([...values, ...result.paths]);
      }
      
      // Reset the input
      e.target.value = "";
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleRemoveImage = (index: number) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    onChange(newValues);
  };
  
  return (
    <FormItem className="dark:text-gray-200">
      <FormLabel className="dark:text-gray-200">{label}</FormLabel>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          {values.map((image, index) => (
            <div key={index} className="relative w-40 h-40 border dark:border-gray-700 rounded-md overflow-hidden group">
              <Image
                src={image}
                alt={`Product image ${index + 1}`}
                fill
                sizes="160px"
                className="object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 hidden group-hover:flex"
                onClick={() => handleRemoveImage(index)}
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          {values.length < maxImages && (
            <FormControl>
              <div className="w-40 h-40 border dark:border-gray-700 rounded-md flex items-center justify-center">
                <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center gap-2">
                  <Plus className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-500">Add Image</span>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    onBlur={onBlur}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </FormControl>
          )}
        </div>
        
        {isUploading && <p className="text-sm">Uploading...</p>}
        {description && <FormDescription className="dark:text-gray-400">{description}</FormDescription>}
        <FormMessage className="dark:text-red-400" />
      </div>
    </FormItem>
  );
}
