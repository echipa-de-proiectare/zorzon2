import PropTypes from "prop-types";

const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

function ProjectCard({ project }) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-3by4">
          <img
            loading="lazy"
            src={`${API_URL}${
              project.cover.formats?.thumbnail?.url || project.cover.url
            }`}
            srcSet={`
              ${API_URL}${
              project.cover.formats?.thumbnail?.url || project.cover.url
            } 150w,
              ${API_URL}${
              project.cover.formats?.small?.url || project.cover.url
            } 300w,
              ${API_URL}${
              project.cover.formats?.medium?.url || project.cover.url
            } 600w,
              ${API_URL}${
              project.cover.formats?.large?.url || project.cover.url
            } 900w,
              ${API_URL}${project.cover.url} 1200w
            `}
            sizes="
              (max-width: 480px) 150px,
              (max-width: 768px) 300px,
              (max-width: 1024px) 450px,
              (max-width: 1407px) 600px,
              800px
            "
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
      alternativeText: PropTypes.string,
      formats: PropTypes.shape({
        thumbnail: PropTypes.shape({
          url: PropTypes.string,
        }),
        small: PropTypes.shape({
          url: PropTypes.string,
        }),
        medium: PropTypes.shape({
          url: PropTypes.string,
        }),
        large: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    }).isRequired,
  }).isRequired,
};

export default ProjectCard;
