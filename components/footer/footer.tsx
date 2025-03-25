import { APP_NAME } from "@/lib/costants";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="p-5 flex-center gap-2">
        <h2>
          {new Date().getFullYear()} {APP_NAME}. All right are reserved.
        </h2>
      </div>
    </footer>
  );
};
export default Footer;
