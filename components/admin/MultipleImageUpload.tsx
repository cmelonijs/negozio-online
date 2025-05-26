"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { UploadButton } from "../../components/product/uploadthing";

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
                <div className="cursor-pointer w-full h-full flex flex-col items-center justify-center gap-2">
                  <UploadButton
                    endpoint="imageUploader"
                    onBeforeUploadBegin={(files) => {
                      // Check if adding these files exceeds the max limit
                      if (values.length + files.length > maxImages) {
                        toast.error(`Maximum ${maxImages} images allowed`);
                        // Return a smaller list of files or empty list to prevent upload
                        return files.slice(0, Math.max(0, maxImages - values.length));
                      }
                      return files;
                    }}
                    onUploadBegin={() => {
                      setIsUploading(true);
                      if (onBlur) onBlur();
                    }}
                    onClientUploadComplete={(res) => {
                      setIsUploading(false);
                      if (res && res.length > 0) {
                        // Extract URLs from the response and add them to values
                        const newImageUrls = res.map(file => file.url);
                        onChange([...values, ...newImageUrls]);
                        toast.success("Images uploaded successfully");
                      }
                    }}
                    onUploadError={(error: Error) => {
                      setIsUploading(false);
                      toast.error(`Upload error: ${error.message}`);
                    }}
                    appearance={{
                      button: "bg-transparent text-gray-500 hover:bg-transparent hover:text-gray-700",
                      container: "w-full h-full flex flex-col items-center justify-center",
                      allowedContent: "hidden"
                    }}
                    content={{
                      button({ }) {
                        return (
                          <>
                            <Plus className="h-8 w-8 text-gray-400" />
                            <span className="text-sm text-gray-500">Add Image</span>
                          </>
                        );
                      }
                    }}
                  />
                </div>
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
