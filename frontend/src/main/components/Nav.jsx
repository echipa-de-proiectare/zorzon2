import { useState } from "react";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable
import "../styles/Nav.css";

const Nav = ({ about }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = () => window.innerWidth < 992; // Check if the current screen width is for mobile

  const toggleIsOpen = () => {
    if (isMobile()) {
      setIsOpen(!isOpen);
      const body = document.body;
      // Toggle body scroll
      body.style.overflow = isOpen ? "" : "hidden";
    }
  };
  const onLogoClick = () => {
    if (isMobile()) {
      setIsOpen(false);
      document.body.style.overflow = "";
    }
  };

  const logo = about.logo_secondary.url;

  return (
    <nav
      className="navbar is-fixed-top is-white"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/" onClick={onLogoClick}>
          <img src={`${API_URL}${logo}`} alt="ZorZon Logo" />
        </Link>

        <a
          role="button"
          className={`navbar-burger ${
            isOpen ? "is-active" : ""
          } has-text-black`}
          aria-label="menu"
          aria-expanded={isOpen ? "true" : "false"}
          data-target="navbar"
          onClick={toggleIsOpen}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbar"
        className={`navbar-end navbar-menu ${isOpen ? "is-active" : ""}`}
      >
        <div className="navbar-end">
          <Link className="navbar-item" to="/portofoliu" onClick={toggleIsOpen}>
            PORTOFOLIU
          </Link>
          <Link className="navbar-item" to="/contact" onClick={toggleIsOpen}>
            CONTACT
          </Link>
          <Link
            className="navbar-item"
            to="/services-and-rates"
            onClick={toggleIsOpen}
          >
            SERVICII
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
