import ImageSwiper from "./ImageSwiper";

const ImageModal = ({ images, isModalActive, activeImage, closeModal }) => {
  return (
    <>
      {isModalActive && (
        <div className={`modal ${isModalActive ? "is-active" : ""}`}>
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-content">
            <ImageSwiper activeImage={activeImage} images={images} />
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </div>
      )}
    </>
  );
};

export default ImageModal;
