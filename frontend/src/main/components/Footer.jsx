import {
  DESIGN_INSTAGRAM,
  DESIGN_URL,
  isJewelrySite,
  JEWELRY_INSTAGRAM,
  JEWELRY_URL,
} from "../../site";
import "../styles/Footer.css";

// Links to the other ZORZON site and to this site's Instagram
const Footer = () => {
  return (
    <footer className="footer site-footer">
      {isJewelrySite ? (
        <a href={DESIGN_URL}>ZORZON Design</a>
      ) : (
        <a href={JEWELRY_URL}>ZORZON Jewelry</a>
      )}
      <a
        className="site-footer-instagram"
        href={isJewelrySite ? JEWELRY_INSTAGRAM : DESIGN_INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram
      </a>
    </footer>
  );
};

export default Footer;
