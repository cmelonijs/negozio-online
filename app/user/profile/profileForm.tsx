/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { updateProfileSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { updateProfile } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useRef } from "react";

// Extend the schema for form state management
const formSchema = updateProfileSchema.extend({
  _message: z.object({
    type: z.string().optional(),
    text: z.string().optional()
  }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProfileFormProps {
  user: { 
    name: string; 
    email: string 
  };
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const formCompleted = useRef(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      _message: { type: "", text: "" }
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Clear any existing message
    form.setValue('_message', { type: "", text: "" });

    try {
      const result = await updateProfile({
        name: data.name,
        email: data.email
      });

      if (result.success) {
        form.setValue('_message', { type: "success", text: result.message });
        formCompleted.current = true;
        router.refresh();
      } else {
        form.setValue('_message', { type: "error", text: result.message });
      }
    } catch (error) {
      form.setValue('_message', { 
        type: "error", 
        text: "An error occurred while updating profile" 
      });
    }
  };

  // Get the current message from form values
  const message = form.watch('_message');

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-colors">
      {message?.text && (
        <div
          className={`p-3 rounded-md mb-4 ${
            message.type === "success"
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }: { field: ControllerRenderProps<FormValues, "email"> }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md 
                              bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400
                              focus:ring-0 focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }: { field: ControllerRenderProps<FormValues, "name"> }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md 
                              bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 
                              transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className={`w-full py-2 px-4 mt-2 rounded-md font-medium text-white 
                       bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 
                       focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-500 
                       transition-colors
                       ${form.formState.isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {form.formState.isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
}