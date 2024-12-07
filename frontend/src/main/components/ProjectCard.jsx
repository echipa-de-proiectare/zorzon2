const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

function ProjectCard({ project }) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-3by4">
          <img
            loading="lazy"
            src={`${API_URL}${project.cover.formats.thumbnail.url}`} // Fallback image for older browsers
            srcSet={`
                    ${API_URL}${project.cover.formats.thumbnail.url} 117w,
                    ${API_URL}${project.cover.formats.small.url} 375w,
                    ${API_URL}${project.cover.formats.medium.url} 563w,
                    ${API_URL}${project.cover.formats.large.url} 750w,
                    ${API_URL}${project.cover.url} 3000w
                  `}
            sizes="
                    (max-width: 768px) 375px,      
                    (min-width: 769px) and (max-width: 1023px) 563px,
                    (min-width: 1024px) and (max-width: 1215px) 750px, 
                    (min-width: 1216px) and (max-width: 1407px) 1000px, 
                    3000px                        
              "
            alt={"Image"} // Provide alt text
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
export default ProjectCard;
