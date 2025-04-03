import { useEffect } from "react";
import ImageSwiper from "./ImageSwiper";

const ImageModal = ({
  images,
  isModalActive,
  setIsModalActive,
  activeImage,
  setActiveImage,
}) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsModalActive(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {isModalActive && (
        <div className={`modal ${isModalActive ? "is-active" : ""}`}>
          <div
            className="modal-background"
            onClick={() => setIsModalActive(false)}
          ></div>
          <div className="modal-content">
            <ImageSwiper
              activeImage={activeImage}
              images={images}
              setActiveImage={setActiveImage}
              setIsModalActive={() => null}
            />
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setIsModalActive(false)}
          ></button>
        </div>
      )}
    </>
  );
};

export default ImageModal;
