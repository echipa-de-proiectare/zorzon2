const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable
import { useEffect, useState } from "react";
import ImageSwiper from "./ImageSwiper";
import ImageModal from "./ImageModal";

const ViewImages = ({ document, activeImage, setActiveImage }) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const images = document.document;
  return (
    <div className="container ">
      <div className="columns is-flex is-flex-wrap-wrap is-mobile">
        <div className="column is-2 is-full-mobile">
          <div className="grid is-flex is-flex-direction-column is-justify-content-left">
            {images.map((doc, index) => (
              <div
                key={doc.id}
                className="cell"
                style={{
                  opacity: activeImage === index ? "1" : "0.3",
                  transition: "opacity 0.3s ease",
                  outline: "none", // Disable focus outline
                  userSelect: "none", // Prevent accidental selection
                }}
              >
                <figure className="document">
                  <img
                    loading="lazy"
                    src={`${API_URL}${doc.formats.thumbnail.url}`}
                    alt={doc.name || "document"}
                    onClick={() => setActiveImage(index)} // Update on thumbnail click
                  />
                </figure>
              </div>
            ))}
          </div>
        </div>
        <div className="column is-10 is-full-mobile">
          <ImageSwiper
            activeImage={activeImage}
            images={images}
            setActiveImage={setActiveImage}
            setIsModalActive={setIsModalActive}
          />
        </div>
      </div>
      <ImageModal
        images={images}
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
      />
    </div>
  );
};

export default ViewImages;
