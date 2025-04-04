import CheckoutSteps from "@/components/shared/checkout-steps";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@/auth";
import OrderPaymentMethodPage from "./orderPaymentMethod";
import { ShippingAddress } from "@/types";
import OrderShippingAdressPage from "./orderShippingAddress";
import OrderProductsList from "./orderProducts";
import { getMyCart } from "@/lib/actions/cart.actions";
import OrderSummaryButton from "./orderPriceSummaryButton";

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  let userPaymentMethod = null;
  const cart = await getMyCart();
  let shippingAddress: ShippingAddress | null = null;

  if (userId) {
    try {
      const user = await getUserById(userId);
      userPaymentMethod = user.paymentMethod || null;
      shippingAddress = user?.address as ShippingAddress || null;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }
  return (
    <div className="space-y-6">
      <CheckoutSteps current={3} />
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        {/* Left Column (Wider) */}
        <div className="w-full lg:w-2/3 space-y-6">
          <OrderPaymentMethodPage paymentMethod={userPaymentMethod} />
          <OrderShippingAdressPage initialShippingForm={shippingAddress || undefined} />
          <OrderProductsList cart={cart} />
        </div>

        {/* Right Column (Narrower) */}
        <div className="w-full lg:w-1/3">
          <OrderSummaryButton cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodPage;
