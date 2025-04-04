import CheckoutSteps from "@/components/shared/checkout-steps";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@/auth";

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <>
      <CheckoutSteps current={3} />
      
    </>
  );
};

export default PaymentMethodPage;
