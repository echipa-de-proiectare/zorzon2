import PropTypes from "prop-types";
import { imageFallbackUrl, imageSrcSet } from "../../main/utils/images";
import "../styles/Jewelry.css";

function JewelCard({ jewel }) {
  return (
    <div className="jewel-card">
      <figure className="image is-4by5">
        <img
          loading="lazy"
          src={imageFallbackUrl(jewel.cover)}
          srcSet={imageSrcSet(jewel.cover)}
          sizes="(max-width: 768px) calc(50vw - 2rem), 300px"
          alt={jewel.cover.alternativeText || jewel.name}
          className="is-cover"
        />
        {!jewel.available && <span className="jewel-sold">Vândut</span>}
      </figure>
      <div className="jewel-card-text">
        <p className="jewel-name">{jewel.name}</p>
        {jewel.material && <p className="jewel-material">{jewel.material}</p>}
        {jewel.price && <p className="jewel-price">{jewel.price}</p>}
      </div>
    </div>
  );
}

JewelCard.propTypes = {
  jewel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    material: PropTypes.string,
    price: PropTypes.string,
    available: PropTypes.bool,
    cover: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alternativeText: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default JewelCard;
