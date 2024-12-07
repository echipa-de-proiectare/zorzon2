import { useParams } from "react-router-dom";
import { useFetchProjectById } from "../hooks/useFetchProjects";
import LoadingIcon from "../../elements/loadingIcon";
const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

function Project() {
  let { id } = useParams();
  const { loading, error, project } = useFetchProjectById(id);

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <LoadingIcon />;

  return (
    <div className="section has-text-centered">
      <h1 className="title is-4">{project.name}</h1>
      <h2 className="subtitle is-6">{project.location}</h2>
      <div className="fixed-grid has-2-cols ">
        <div className="grid ">
          {project.images.map((image) => (
            <div className={`cell`} key={image.id}>
              <figure className="image">
                <img
                  src={`${API_URL}${image.formats.thumbnail.url}`} // Fallback image for older browsers
                  srcSet={`
                    ${API_URL}${image.formats.thumbnail.url} 117w,
                    ${API_URL}${image.formats.small.url} 375w,
                    ${API_URL}${image.formats.medium.url} 563w,
                    ${API_URL}${image.formats.large.url} 750w,
                    ${API_URL}${image.url} 3000w
                  `}
                  sizes="
                    (max-width: 768px) 375px,      
                    (min-width: 769px) and (max-width: 1023px) 563px,
                    (min-width: 1024px) and (max-width: 1215px) 750px, 
                    (min-width: 1216px) and (max-width: 1407px) 1000px, 
                    3000px                        
              "
                  alt={image.name || "Image"} // Provide alt text
                />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Project;
