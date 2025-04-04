import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details",
};

const orderDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <>Order {id} detail page</>;
};

export default orderDetailsPage;
