import { PackageCheck, DollarSign, CreditCard, Headphones } from "lucide-react";

export default function InfoComponent() {
  return (
    <div className="bg-gray-100 dark:bg-[#0a0a23] rounded-lg p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        
        <div className="flex flex-col items-center">
          <PackageCheck className="h-8 w-8 text-primary" />
          <h3 className="font-bold text-gray-900 dark:text-white mt-4">Free Shipping</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Free Shipping on orders above $100</p>
        </div>

        <div className="flex flex-col items-center">
          <DollarSign className="h-8 w-8 text-primary" />
          <h3 className="font-bold text-gray-900 dark:text-white mt-4">Money Back Guarantee</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Within 30 days of purchase</p>
        </div>

        <div className="flex flex-col items-center">
          <CreditCard className="h-8 w-8 text-primary" />
          <h3 className="font-bold text-gray-900 dark:text-white mt-4">Flexible Payments</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Pay with credit card, Paypal, or cash on delivery</p>
        </div>

        <div className="flex flex-col items-center">
          <Headphones className="h-8 w-8 text-primary" />
          <h3 className="font-bold text-gray-900 dark:text-white mt-4">24/7 Support</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Get support at any time</p>
        </div>

      </div>
    </div>
  );
}
