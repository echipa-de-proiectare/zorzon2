import PropTypes from "prop-types";
import { imageFallbackUrl, imageSrcSet } from "../utils/images";

function ProjectCard({ project }) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-3by4">
          <img
            loading="lazy"
            src={imageFallbackUrl(project.cover)}
            srcSet={imageSrcSet(project.cover)}
            sizes="(max-width: 768px) calc(100vw - 3rem), 240px"
            alt={
              project.cover.alternativeText || project.name || "Project image"
            }
            className="is-cover"
          />
        </figure>
      </div>
      <div className="card-content">
        <h5 className="content ">{project.name}</h5>
        <p className="content">{project.location}</p>
      </div>
    </div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      url: PropTypes.string.isRequired,
      width: PropTypes.number,
      alternativeText: PropTypes.string,
      formats: PropTypes.shape({
        thumbnail: PropTypes.shape({
          url: PropTypes.string,
          width: PropTypes.number,
        }),
        small: PropTypes.shape({
          url: PropTypes.string,
          width: PropTypes.number,
        }),
        medium: PropTypes.shape({
          url: PropTypes.string,
          width: PropTypes.number,
        }),
        large: PropTypes.shape({
          url: PropTypes.string,
          width: PropTypes.number,
        }),
      }),
    }).isRequired,
  }).isRequired,
};

export default ProjectCard;
