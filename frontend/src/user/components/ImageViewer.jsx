const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable
import { useEffect, useState } from "react";

import { saveAs } from "file-saver"; // Import file-saver
import JSZip from "jszip"; // Import jszip for creating ZIP files
import InfoSidebar from "./InfoSidebar";
import ViewImages from "../../components/ViewImages";

const ImageViewer = ({ document, reviewDate, phase }) => {
  const [activeImage, setActiveImage] = useState(0);
  const allImages = document.document;

  const downloadCurrentImage = () => {
    const imageUrl = `${API_URL}${allImages[activeImage].formats.large.url}`;
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
        <div className="column is-three-fifths">
          <ViewImages
            document={document}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
          />
        </div>
        <div className="column is-two-fifths">
          <InfoSidebar
            document={document}
            downloadCurrent={downloadCurrentImage}
            downloadAll={downloadAllImagesAsZip}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
