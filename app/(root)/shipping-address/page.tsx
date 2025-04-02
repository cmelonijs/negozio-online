import CheckoutSteps from "@/components/shared/checkout-steps";
import ShippingForm from "./shipping-form";

const ShippingPage = async () => {
  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingForm />
    </>
  );
};

export default ShippingPage;
