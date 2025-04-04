import CheckoutSteps from "@/components/shared/checkout-steps";
import PaymentMethodForm from "./payment-form";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@/auth";

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  let userPaymentMethod = null;

  if (userId) {
    try {
      const user = await getUserById(userId);
      userPaymentMethod = user.paymentMethod || null;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }
  return (
    <>
      <CheckoutSteps current={2} />
      <PaymentMethodForm initialPaymentMethod={userPaymentMethod} />
    </>
  );
};

export default PaymentMethodPage;
