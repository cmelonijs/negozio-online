const Footer = () => {

  return (
      <footer className="border-t">
          <div className="p-5 flex-center gap-2">
              <h2>
                  {new Date().getFullYear()}
              </h2>
              <h2>
                  Companny name
              </h2>
              <h2>
              . All right are reserved.
              </h2>
          </div>
      </footer>
  );

};
export default Footer;