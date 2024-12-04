import { useParams } from "react-router-dom";
import { useFetchProjectById } from "../hooks/useFetchProjects";
const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

function Project() {
  let { id } = useParams();
  const { loading, error, project } = useFetchProjectById(id);

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="section has-text-centered">
      <h1 className="title is-4">{project.name}</h1>
      <h2 className="subtitle is-6">{project.location}</h2>
      <div className="fixed-grid has-2-cols ">
        <div className="grid ">
          {project.images.map((image, index) => (
            <div className={`cell`} key={index}>
              <figure className="image ">
                <img src={`${API_URL}${image.url}`} alt={"Project Image"} />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Project;
