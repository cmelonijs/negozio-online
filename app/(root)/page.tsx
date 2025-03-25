
const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

const RootPage = async() => {
  await delay(2000);
  return <>Root page</>;
};

export default RootPage;
