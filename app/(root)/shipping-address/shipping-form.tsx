"use client";

import { shippingAddressSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function ShippingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(shippingAddressSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    console.log("Form submitted:", data);
      reset();
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">Shipping Address</h2>

      <div className="space-y-1">
        <input
          {...register("fullName")}
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
      </div>

      <div className="space-y-1">
        <input
          {...register("streetAddress")}
          type="text"
          placeholder="Street Address"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {errors.streetAddress && <p className="text-sm text-red-500">{errors.streetAddress.message}</p>}
      </div>

      <div className="space-y-1">
        <input
          {...register("city")}
          type="text"
          placeholder="City"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
      </div>

      <div className="space-y-1">
        <input
          {...register("postalCode")}
          type="text"
          placeholder="Postal Code"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {errors.postalCode && <p className="text-sm text-red-500">{errors.postalCode.message}</p>}
      </div>

      <div className="space-y-1">
        <input
          {...register("Country")}
          type="text"
          placeholder="Country"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {errors.Country && <p className="text-sm text-red-500">{errors.Country.message}</p>}
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full py-2 text-white font-semibold bg-yellow-500 rounded-lg transition hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}