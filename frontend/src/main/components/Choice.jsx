import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useFetchProjectsSpotlight } from "../hooks/useFetchProjects";
import { useFetchJewels } from "../../jewellery/hooks/useFetchJewels";
import usePageMeta from "../hooks/usePageMeta";
import { imageFallbackUrl, imageSrcSet } from "../utils/images";
import { JEWELLERY_URL } from "../../site";
import "../styles/Choice.css";

const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

const ChoiceImage = ({ image, alt }) =>
  image ? (
    <img
      src={imageFallbackUrl(image)}
      srcSet={imageSrcSet(image)}
      sizes="(max-width: 768px) calc(100vw - 3rem), 440px"
      alt={alt}
      className="is-cover"
    />
  ) : (
    <div className="choice-placeholder" />
  );

ChoiceImage.propTypes = {
  image: PropTypes.object,
  alt: PropTypes.string.isRequired,
};

// zorzon.com.ro: pick between interior design and jewellery
function Choice({ about }) {
  const { projects } = useFetchProjectsSpotlight();
  const { jewels } = useFetchJewels();
  usePageMeta({
    title: "Interior Design & Jewellery Design",
    description:
      "ZORZON, Timișoara: design de interior și bijuterii artizanale lucrate manual.",
  });

  return (
    <div className="choice section">
      <h1 className="choice-logo">
        {about.logo_primary ? (
          <img src={`${API_URL}${about.logo_primary.url}`} alt="ZORZON Studio" />
        ) : (
          "ZORZON"
        )}
      </h1>
      <div className="columns is-variable is-5 choice-options">
        <div className="column">
          <Link to="/design" className="choice-option">
            <figure className="image is-4by5">
              <ChoiceImage image={projects?.[0]?.cover} alt="Interior Design" />
            </figure>
            <span className="choice-label">Interior Design</span>
          </Link>
        </div>
        <div className="column">
          <a href={JEWELLERY_URL} className="choice-option">
            <figure className="image is-4by5">
              <ChoiceImage image={jewels?.[0]?.cover} alt="Jewellery Design" />
            </figure>
            <span className="choice-label">Jewellery Design</span>
          </a>
        </div>
      </div>
    </div>
  );
}

Choice.propTypes = {
  about: PropTypes.shape({
    logo_primary: PropTypes.shape({ url: PropTypes.string.isRequired }),
  }).isRequired,
};

export default Choice;
