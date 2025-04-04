import CheckoutSteps from "@/components/shared/checkout-steps";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@/auth";
import OrderPaymentMethodPage from "./orderPaymentMethod";
import { ShippingAddress } from "@/types";
import OrderShippingAdressPage from "./orderShippingAddress";

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  let userPaymentMethod = null;
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
    <>
      <CheckoutSteps current={3} />
      <OrderPaymentMethodPage paymentMethod={userPaymentMethod} />;
      <OrderShippingAdressPage initialShippingForm={shippingAddress || undefined} />
    </>
  );
};

export default PaymentMethodPage;
