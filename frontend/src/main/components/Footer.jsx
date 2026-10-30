import { DESIGN_URL, JEWELLERY_URL } from "../../site";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer site-footer">
      <a href={DESIGN_URL}>ZORZON Design</a>
      <span aria-hidden="true">·</span>
      <a href={JEWELLERY_URL}>ZORZON Jewellery</a>
    </footer>
  );
};

export default Footer;
