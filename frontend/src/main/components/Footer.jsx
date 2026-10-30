import PropTypes from "prop-types";
import {
  DESIGN_URL,
  isJewelrySite,
  JEWELRY_INSTAGRAM,
  JEWELRY_URL,
} from "../../site";
import "../styles/Footer.css";

const Footer = ({ about }) => {
  const instagram = isJewelrySite
    ? JEWELRY_INSTAGRAM
    : about.contact.find((link) => link.name === "Instagram")?.link;

  return (
    <footer className="footer site-footer">
      <div className="site-footer-links">
        <a href={DESIGN_URL}>ZORZON Design</a>
        <span aria-hidden="true">·</span>
        <a href={JEWELRY_URL}>ZORZON Jewelry</a>
      </div>
      {instagram && (
        <a
          className="site-footer-instagram"
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      )}
    </footer>
  );
};

Footer.propTypes = {
  about: PropTypes.shape({
    contact: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        link: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};

export default Footer;
