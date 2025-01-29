const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable
import { act, useEffect, useState } from "react";
import ImageSwiper from "../../components/ImageSwiper";
import { saveAs } from "file-saver"; // Import file-saver
import JSZip from "jszip"; // Import jszip for creating ZIP files
import InfoSidebar from "./InfoSidebar";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { use } from "react";
const ImageViewer = ({ document, reviewDate, phase }) => {
  const [activeImage, setActiveImage] = useState(document.document[0]);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    setActiveImage(document.document[0]);
  }, [document]);
  const openModal = () => {
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };
  const handleImageChange = (image) => {
    setActiveImage(image); // Update active image
  };

  const downloadCurrentImage = () => {
    const imageUrl = `${API_URL}${activeImage.formats.large.url}`;
    saveAs(imageUrl, "image.jpg"); // Pass the URL and file name
  };
  const downloadAllImagesAsZip = async (images) => {
    const zip = new JSZip();

    // Add images to the ZIP archive
    for (const [index, image] of images.entries()) {
      const imageUrl = `${API_URL}${image.url}`;
      const imageName = `image-${index + 1}.jpg`;

      try {
        // Fetch the image data as a Blob
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        // Add the Blob to the ZIP file
        zip.file(imageName, blob);
      } catch (error) {
        console.error(`Failed to fetch image ${imageName}:`, error);
      }
    }

    // Generate the ZIP file
    try {
      const zipBlob = await zip.generateAsync({ type: "blob" });

      // Trigger download using file-saver
      saveAs(zipBlob, `${phase}-${reviewDate}.zip`);
    } catch (error) {
      console.error("Failed to generate ZIP file:", error);
    }
  };

  return (
    <div className="container">
      <div className="columns">
        <div className="column is-1">
          <div className="grid is-flex is-flex-direction-column is-justify-content-left">
            {document.document.map((doc) => (
              <div
                key={doc.id}
                className="cell"
                style={{
                  opacity: activeImage.id === doc.id ? "1" : "0.3",
                  transition: "opacity 0.3s ease", // Smooth fade effect
                  outline: "none", // Disable focus outline
                  userSelect: "none", // Prevent accidental selection
                }}
              >
                <figure className="document">
                  <img
                    loading="lazy"
                    src={`${API_URL}${doc.formats.thumbnail.url}`}
                    alt={doc.name || "document"}
                    onClick={() => setActiveImage(doc)} // Update on thumbnail click
                  />
                </figure>
              </div>
            ))}
          </div>
        </div>
        <div className="column is-three-fifths">
          <ImageSwiper
            activeImage={activeImage}
            images={document.document}
            onImageChange={handleImageChange} // Pass callback
            openModal={openModal}
          />
        </div>
        <InfoSidebar
          document={document}
          downloadCurrent={downloadCurrentImage}
          downloadAll={downloadAllImagesAsZip}
        />
      </div>
      <>
        {isModalActive && (
          <div className={`modal ${isModalActive ? "is-active" : ""}`}>
            <div className="modal-background" onClick={closeModal}></div>
            <div
              className="modal-content "
              style={{ width: "auto", height: "100%" }}
            >
              <TransformWrapper>
                <TransformComponent>
                  <figure className="document">
                    <img
                      loading="lazy"
                      src={`${API_URL}${activeImage.formats.large.url}`}
                      alt={activeImage.name || "document"}
                    />
                  </figure>
                </TransformComponent>
              </TransformWrapper>
            </div>
            <button
              className="modal-close is-large"
              aria-label="close"
              onClick={closeModal}
            ></button>
          </div>
        )}
      </>
    </div>
  );
};

export default ImageViewer;
