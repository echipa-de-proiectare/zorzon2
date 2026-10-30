import PropTypes from "prop-types";
import usePageMeta from "../hooks/usePageMeta";
import { DESIGN_URL, JEWELRY_URL } from "../../site";
import "../styles/Choice.css";

const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

// zorzon.com.ro: pick between interior design and jewelry
function Choice({ about }) {
  usePageMeta({
    description:
      "ZORZON, Timișoara: design de interior și bijuterii artizanale lucrate manual.",
  });

  return (
    <div className="choice">
      <h1 className="choice-logo">
        {about.logo_primary ? (
          <img src={`${API_URL}${about.logo_primary.url}`} alt="ZORZON Studio" />
        ) : (
          "ZORZON"
        )}
      </h1>
      <nav className="choice-options">
        <a href={DESIGN_URL} className="choice-option">
          <span className="choice-label">ZORZON Design</span>
          <span className="choice-description">Arhitectură și design interior</span>
        </a>
        <span className="choice-divider" aria-hidden="true" />
        <a href={JEWELRY_URL} className="choice-option">
          <span className="choice-label">ZORZON Jewelry</span>
          <span className="choice-description">Bijuterii artizanale</span>
        </a>
      </nav>
    </div>
  );
}

Choice.propTypes = {
  about: PropTypes.shape({
    logo_primary: PropTypes.shape({ url: PropTypes.string.isRequired }),
  }).isRequired,
};

export default Choice;
