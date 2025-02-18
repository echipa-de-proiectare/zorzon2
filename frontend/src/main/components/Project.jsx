import { useParams } from "react-router-dom";
import { useFetchProjectById } from "../hooks/useFetchProjects";
import LoadingIcon from "../../elements/loadingIcon";
import { act, useEffect, useState } from "react";
import "../styles/Project.css";
import ViewImages from "../../components/ViewImages";

function Project() {
  let { id } = useParams();
  const { loading, error, project } = useFetchProjectById(id);
  const [activeImage, setActiveImage] = useState(0);

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <LoadingIcon />;

  return (
    <>
      <div className="section">
        <div className="container is-flex is-flex-direction-column is-align-items-center">
          <h1 className="title is-4">{project.name}</h1>
          <h2 className="subtitle is-6">{project.location}</h2>
        </div>
      </div>
      <div className="section">
        <div className="columns is-flex is-justify-content-center">
          <div className="column is-two-fifths is-full-mobile">
            {project && project.images && (
              <ViewImages
                document={{ document: project.images }}
                activeImage={activeImage}
                setActiveImage={setActiveImage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Project;
