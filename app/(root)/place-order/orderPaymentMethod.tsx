'use client';

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

interface PaymentMethodFormProps {
    paymentMethod: string | null;
}

export default function OrderPaymentMethodPage({ paymentMethod }: PaymentMethodFormProps) {
    return (
        <div className="max-w-md mx-auto space-y-4 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>

            {paymentMethod ? (
                <div className="mt-4">
                    <p className="text-gray-700">
                        <span className="font-medium">Selected payment method:</span> {paymentMethod}
                    </p>
                </div>
            ) : (
                <p className="text-amber-600">No payment method selected yet.</p>
            )}
            <Button
                onClick={() => redirect("/payment-method")}
                variant="outline"
            >
                Edit
            </Button>
        </div>
    );
}