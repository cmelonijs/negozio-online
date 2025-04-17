import ProductBox from "./products-box";
import CustomersBox from "./customers-box";

const OverviewsPage = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">This is the overview page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
        <ProductBox />
        <CustomersBox />
      </div>
    </>
  );
};

export default OverviewsPage;
