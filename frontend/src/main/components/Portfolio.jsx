import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { useFetchProjectsPrev } from "../hooks/useFetchProjects";

function Portfolio() {
  const { loading, error, projects } = useFetchProjectsPrev();

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="section">
      <div className="fixed-grid has-1-cols-mobile has-4-cols-tablet">
        <div className="grid">
          {projects.map((project) => (
            <div className="cell" key={project.id}>
              <Link to={`/portofoliu/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
