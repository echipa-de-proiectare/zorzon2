import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable
import { DESIGN_URL, isJewelrySite, JEWELRY_URL } from "../../site";
import "../styles/Nav.css";

const Nav = ({ about, links }) => {
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

        {/* Switch between the two ZORZON sites; the current one is plain text */}
        <div className="navbar-item site-switch">
          {isJewelrySite ? (
            <a href={DESIGN_URL}>Design</a>
          ) : (
            <span aria-current="page">Design</span>
          )}
          <span className="site-switch-separator" aria-hidden="true">
            /
          </span>
          {isJewelrySite ? (
            <span aria-current="page">Jewelry</span>
          ) : (
            <a href={JEWELRY_URL}>Jewelry</a>
          )}
        </div>

        {links.length > 0 && (
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
        )}
      </div>

      <div
        id="navbar"
        className={`navbar-end navbar-menu ${isOpen ? "is-active" : ""}`}
      >
        <div className="navbar-end">
          {links.map((link) => (
            <Link
              key={link.label}
              className="navbar-item"
              to={link.to}
              onClick={toggleIsOpen}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  about: PropTypes.shape({
    logo_secondary: PropTypes.shape({ url: PropTypes.string.isRequired })
      .isRequired,
  }).isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Nav;
