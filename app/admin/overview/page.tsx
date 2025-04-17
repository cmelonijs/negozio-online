import ProductBox from "./products-box";

const OverviewsPage = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">This is the overview page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        <ProductBox />
        {/* Add more boxes here later */}
      </div>
    </>
  );
};

export default OverviewsPage;
