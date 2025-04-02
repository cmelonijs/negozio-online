import CheckoutSteps from "@/components/shared/checkout-steps";
import PaymentMethodForm from "./payment-form";

const PaymentMethodPage = async () => {
  return (
    <>
      <CheckoutSteps current={2} />
      <PaymentMethodForm/>
    </>
  );
};

export default PaymentMethodPage;
