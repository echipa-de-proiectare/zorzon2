const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable
import { useEffect, useState } from "react";

import { saveAs } from "file-saver"; // Import file-saver
import JSZip from "jszip"; // Import jszip for creating ZIP files
import InfoSidebar from "./InfoSidebar";
import ViewImages from "./ViewImages";

const ImageViewer = ({ document, reviewDate, phase }) => {
  const [activeImage, setActiveImage] = useState(0);
  const allImages = document.MediaDoc;

  const downloadCurrentImage = () => {
    const imageUrl = `${API_URL}${allImages[activeImage].MediaFile.formats.large.url}`;
    saveAs(imageUrl, `${allImages[activeImage].Title}`);
  };
  const downloadAllImagesAsZip = async (images) => {
    const zip = new JSZip();

    // Add images to the ZIP archive
    for (const image of images) {
      const imageUrl = `${API_URL}${image.MediaFile.formats.large.url}`;
      const imageName = `${image.Title}.jpeg`;

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
    <div className="columns is-0">
      <div className="column is-10">
        <ViewImages
          document={document}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
        />
      </div>

      <InfoSidebar
        document={document}
        downloadCurrent={downloadCurrentImage}
        downloadAll={downloadAllImagesAsZip}
      />
    </div>
  );
};

export default ImageViewer;
