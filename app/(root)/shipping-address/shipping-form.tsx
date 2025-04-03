"use client";

import { shippingAddressSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
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
import { changeAddress, getUserShippingAddress } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default function ShippingForm() {
  const form = useForm({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      fullName: "",
      streetAddress: "",
      city: "",
      postalCode: "",
      Country: "",
    },
  });

  useEffect(() => {
    const fetchShippingAddress = async () => {
      const response = await getUserShippingAddress();
      if (response.success && response.data) {
        form.reset(response.data as { 
          fullName: string; 
          streetAddress: string; 
          city: string; 
          postalCode: string; 
          Country: string; 
        }); 
      }
    };

    fetchShippingAddress();
  }, [form]);
  
  const onSubmit = async (data: FieldValues) => { 
    console.log("Form submitted:", data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    await changeAddress(formData);
    form.reset();
    redirect("/payment-method");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md mx-auto space-y-4 p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-xl font-semibold text-gray-800">
          Shipping Address
        </h2>

        <FormField
          control={form.control}
          name="fullName"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof shippingAddressSchema>,
              "fullName"
            >;
          }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="streetAddress"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof shippingAddressSchema>,
              "streetAddress"
            >;
          }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input placeholder="Street Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof shippingAddressSchema>,
              "city"
            >;
          }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postalCode"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof shippingAddressSchema>,
              "postalCode"
            >;
          }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="Postal Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Country"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof shippingAddressSchema>,
              "Country"
            >;
          }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
