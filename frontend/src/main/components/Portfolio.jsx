import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { useFetchProjectsPrev } from "../hooks/useFetchProjects";
import LoadingIcon from "../../elements/loadingIcon";
import ErrorMessage from "../../elements/ErrorMessage";
import usePageMeta from "../hooks/usePageMeta";

function Portfolio() {
  const { loading, error, projects } = useFetchProjectsPrev();
  usePageMeta({
    title: "Portofoliu",
    description:
      "Proiecte de arhitectură și design de interior realizate de ZORZON în Timișoara.",
  });

  if (error) return <ErrorMessage />;
  if (loading) return <LoadingIcon />;

  return (
    <div className="section">
      <h1 className="is-sr-only">Portofoliu</h1>
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
