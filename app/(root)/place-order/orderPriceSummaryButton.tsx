"use client";
import { Cart } from "@/types";
import { formatNumberWithDecimal } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const OrderSummaryButton = ({ cart }: { cart?: Cart }) => {
  if (!cart || !cart.items || cart.items.length === 0) {
    return <p className="text-center text-gray-500">No cart data available.</p>;
  }

/*reduce method to iterate through each item in the array. For each item, multiply its price by its quantity. Accumulate the result into a running total (`sum`).Return the final total price of all items.*/
  const totalItemsPrice = cart.items.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0);

  const taxPrice = Number(cart.taxPrice) || 0;
  const shippingPrice = Number(cart.shippingPrice) || 0;
  const totalPrice = totalItemsPrice + taxPrice + shippingPrice;

  return (
    <div className="max-w-md mx-auto space-y-4 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
      <div className="text-gray-700">
        <p>
          <span className="font-medium">Items Price:</span> ${formatNumberWithDecimal(totalItemsPrice)}
        </p>
        <p>
          <span className="font-medium">Tax Price:</span> ${formatNumberWithDecimal(taxPrice)}
        </p>
        <p>
          <span className="font-medium">Shipping Price:</span> ${formatNumberWithDecimal(shippingPrice)}
        </p>
        <p className="font-bold">
          <span className="font-medium">Total Price:</span> ${formatNumberWithDecimal(totalPrice)}
        </p>
      </div>
      <Button 
            className="w-full mt-2"
            variant="outline"
            //onClick={}
          >
            Edit Cart
          </Button>
    </div>
  );
};

export default OrderSummaryButton;