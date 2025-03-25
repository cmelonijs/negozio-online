// RootPage.js
const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

const RootPage = async () => {
  
  await delay(2000);
  
  return <div>Root page content</div>;
};

export default RootPage;
