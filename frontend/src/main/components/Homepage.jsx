import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { useFetchProjectsSpotlight } from "../hooks/useFetchProjects";

const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

function Homepage({ about }) {
  const { loading, error, projects } = useFetchProjectsSpotlight();

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="homepage">
      <section className="hero is-fullheight is-flex is-align-items-center">
        <div className="hero-body">
          {about.logo_primary && (
            <figure className="image ">
              <img
                src={`${API_URL}${about.logo_primary.url}`} // Check if primary logo is available
                alt="Company logo"
                style={{ maxWidth: "300px" }}
              />
            </figure>
          )}
        </div>
      </section>
      <section className="section has-text-centered">
        <h2 className="title is-6">PROIECTE RECENTE</h2>
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
      </section>
      <section className="section has-text-centered">
        <Link to="/portofoliu" className="button is-gray">
          Vezi mai multe proiecte
        </Link>
      </section>
    </div>
  );
}

export default Homepage;
