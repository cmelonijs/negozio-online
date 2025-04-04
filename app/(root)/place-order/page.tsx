import CheckoutSteps from "@/components/shared/checkout-steps";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@/auth";
import OrderPaymentMethodPage from "./orderPaymentMethod";
import { ShippingAddress } from "@/types";
import OrderShippingAdressPage from "./orderShippingAddress";
import OrderProductsList from "./orderProducts";
import { getMyCart } from "@/lib/actions/cart.actions";

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
    <>
      <CheckoutSteps current={3} />
      <OrderPaymentMethodPage paymentMethod={userPaymentMethod} />;
      <OrderShippingAdressPage initialShippingForm={shippingAddress || undefined} />
      <OrderProductsList cart={cart}/>
    </>
  );
};

export default PaymentMethodPage;
