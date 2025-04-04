"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

interface ShippingAdressProps {
  initialShippingForm?: {
    fullName: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    Country: string;
  };
}

export default function OrderShippingAdressPage({
  initialShippingForm,
}: ShippingAdressProps) {
  if (!initialShippingForm) {
    return (
      <p className="text-center text-gray-500">No shipping address provided.</p>
    );
  }

  const { fullName, streetAddress, city, postalCode, Country } =
    initialShippingForm;

  return (
    <div className=" mx-auto space-y-4 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Shipping Address
      </h2>
      <p className="text-gray-700">
        <span className="font-medium">Full Name:</span> {fullName}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Street Address:</span> {streetAddress}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">City:</span> {city}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Postal Code:</span> {postalCode}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Country:</span> {Country}
      </p>

      <Button className="mt-3" onClick={() => redirect("/shipping-address")} variant="outline">
        Edit
      </Button>
    </div>
  );
}
