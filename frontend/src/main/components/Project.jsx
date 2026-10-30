import { Link, useParams } from "react-router-dom";
import { useFetchProjectById } from "../hooks/useFetchProjects";
import LoadingIcon from "../../elements/loadingIcon";
import ErrorMessage from "../../elements/ErrorMessage";
import usePageMeta from "../hooks/usePageMeta";
import { useEffect, useState } from "react";
import { imageFallbackUrl, imageSrcSet, imageUrl } from "../utils/images";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../styles/Project.css";

function Project() {
  let { id } = useParams();
  const { loading, error, notFound, project } = useFetchProjectById(id);
  const shareImage = project?.images?.[0];
  usePageMeta(
    notFound
      ? { title: "Proiect negăsit", noindex: true }
      : {
          title: project && [project.name, project.location].join(", "),
          description:
            project &&
            `${project.name}, ${project.location} – proiect de design interior realizat de ZORZON.`,
          image: shareImage && imageFallbackUrl(shareImage, 1000),
        }
  );

  const [activeIndex, setActiveIndex] = useState(null);
  const isModalActive = activeIndex !== null;

  const openModal = (index) => setActiveIndex(index);
  const closeModal = () => setActiveIndex(null);

  // Lock page scroll and close on Escape while the gallery is open
  useEffect(() => {
    if (!isModalActive) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") closeModal();
    };

    document.documentElement.classList.add("is-clipped");
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.documentElement.classList.remove("is-clipped");
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalActive]);

  if (loading) return <LoadingIcon />;
  if (notFound)
    return (
      <div className="section has-text-centered">
        <h1 className="title is-4">Proiectul nu a fost găsit</h1>
        <Link to="/portofoliu" className="button is-gray">
          Vezi toate proiectele
        </Link>
      </div>
    );
  if (error) return <ErrorMessage />;

  return (
    <div className="section has-text-centered">
      <h1 className="title is-4">{project.name}</h1>
      <h2 className="subtitle is-6">{project.location}</h2>
      <div className="columns is-multiline">
        {project.images.map((image, index) => (
          <div
            key={image.id}
            className="column is-full-mobile is-full-tablet is-half-desktop"
          >
            <figure className="image" onClick={() => openModal(index)}>
              <img
                loading="lazy"
                src={imageFallbackUrl(image)}
                srcSet={imageSrcSet(image)}
                sizes="(max-width: 1023px) calc(100vw - 3rem), 450px"
                alt={image.alternativeText || project.name}
              />
            </figure>
          </div>
        ))}
      </div>
      {/* Full-Screen Modal */}
      {isModalActive && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-content">
            <Swiper
              initialSlide={activeIndex} // Start from the clicked image
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
                      loading="lazy"
                      src={imageUrl(image)}
                      srcSet={imageSrcSet(image)}
                      sizes="(max-width: 768px) 100vw, 640px"
                      alt={image.alternativeText || project.name}
                    />
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button
            className="modal-close is-large"
            aria-label="Închide galeria"
            onClick={closeModal}
          ></button>
        </div>
      )}
    </div>
  );
}

export default Project;
