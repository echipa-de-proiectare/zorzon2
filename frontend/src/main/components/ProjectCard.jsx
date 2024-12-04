const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

function ProjectCard({ project }) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-3by4">
          <img src={`${API_URL}${project.coverUrl}`} alt={"Project Image"} />
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
