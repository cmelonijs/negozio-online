import CheckoutSteps from "@/components/shared/checkout-steps";
import ShippingForm from "./shipping-form";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@/auth";
import { ShippingAddress } from "@/types";

const ShippingPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  let userShippingForm : ShippingAddress | undefined = undefined;

  if (userId) {
    try {
      const user = await getUserById(userId);
      userShippingForm = user.address && typeof user.address === 'object' ? user.address as ShippingAddress : undefined;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingForm initialShippingForm={userShippingForm}/>
    </>
  );
};

export default ShippingPage;
