import { useParams } from "react-router-dom";
import { useFetchProjectById } from "../hooks/useFetchProjects";
import LoadingIcon from "../../elements/loadingIcon";
import { useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../styles/Project.css";

const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

function Project() {
  let { id } = useParams();
  const { loading, error, project } = useFetchProjectById(id);

  const [isModalActive, setIsModalActive] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const openModal = (image) => {
    setActiveImage(image);
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
    setActiveImage(0);
  };

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <LoadingIcon />;

  return (
    <div className="section has-text-centered">
      <h1 className="title is-4">{project.name}</h1>
      <h2 className="subtitle is-6">{project.location}</h2>
      <div className="columns is-multiline">
        {project.images.map((image) => (
          <div
            key={image.id}
            className="column is-full-mobile is-full-tablet is-half-desktop"
          >
            <figure className="image" onClick={() => openModal(image)}>
              <img
                loading="lazy"
                src={`${API_URL}${image.formats?.thumbnail?.url || image.url}`}
                srcSet={`
                  ${API_URL}${image.formats?.thumbnail?.url || image.url} 150w,
                  ${API_URL}${image.formats?.small?.url || image.url} 300w,
                  ${API_URL}${image.formats?.medium?.url || image.url} 600w,
                  ${API_URL}${image.formats?.large?.url || image.url} 900w,
                  ${API_URL}${image.url} 1200w
                `}
                sizes="
                  (max-width: 480px) 150px,
                  (max-width: 768px) 300px,
                  (max-width: 1024px) 450px,
                  (max-width: 1407px) 600px,
                  800px
                "
                alt={image.alternativeText || image.name || "Project image"}
              />
            </figure>
          </div>
        ))}
      </div>
      {/* Full-Screen Modal */}
      {isModalActive && (
        <div className={`modal ${isModalActive ? "is-active" : ""}`}>
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-content">
            <Swiper
              initialSlide={activeImage} // Start from the clicked image
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {project.images.map((image) => (
                <SwiperSlide key={image.id}>
                  <figure className="image">
                    <img
                      src={`${API_URL}${image.url}`}
                      alt={image.name || "Full screen image"}
                    />
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </div>
      )}
    </div>
  );
}

export default Project;
