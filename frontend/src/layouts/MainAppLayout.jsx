import { Outlet } from "react-router-dom";
import Footer from "../main/components/Footer";
import Nav from "../main/components/Nav";
import { useEffect } from "react";

const MainAppLayout = ({ about }) => {
  useEffect(() => {
    // Add the class to the body element
    document.body.classList.add("has-navbar-fixed-top");

    // Cleanup: Remove the class when component unmounts
    return () => {
      document.body.classList.remove("has-navbar-fixed-top");
    };
  }, []); // Empty dependency array to run this effect only on mount/unmount

  return (
    <div
      className="is-flex is-flex-direction-column is-justify-content-space-between"
      style={{ height: "100%" }}
    >
      <Nav about={about} />
      <div className="container is-max-desktop">
        <Outlet />
      </div>
      <Footer about={about} />
    </div>
  );
};

export default MainAppLayout;
