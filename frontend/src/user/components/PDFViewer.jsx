import { act, useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { pdfjs } from "react-pdf";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { saveAs } from "file-saver"; // Import file-saver
import JSZip from "jszip"; // Import jszip for creating ZIP files
const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable
import InfoSidebar from "./InfoSidebar";
import LoadingIcon from "../../elements/loadingIcon";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
function PDFViewer({ document, reviewDate, phase }) {
  const allPdfs = document.document;
  const [activePdf, setActivePdf] = useState(allPdfs[0]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [scale, setScale] = useState(1); // Scale for responsiveness
  const containerRef = useRef(null); // Reference to container for resizing

  useEffect(() => {
    setActivePdf(allPdfs[0]);
  }, [allPdfs]);
  const calculateScale = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth; // Get container width
      const pdfBaseWidth = 1300; // Base width for the PDF
      const newScale = containerWidth / pdfBaseWidth; // Calculate scale based on container width
      setScale(newScale);
    }
  };

  useEffect(() => {
    calculateScale(); // Calculate scale on initial render
    window.addEventListener("resize", calculateScale); // Recalculate on window resize

    return () => {
      window.removeEventListener("resize", calculateScale); // Cleanup event listener
    };
  }, []);
  const openModal = () => {
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  const downloadCurrentImage = () => {
    const pdfUrl = `${API_URL}${activePdf.url}`;
    saveAs(pdfUrl, "document.pdf"); // Pass the URL and file name
  };

  const downloadAllImagesAsZip = async (allPdfs) => {
    const zip = new JSZip();

    // Add images to the ZIP archive
    for (const [index, doc] of allPdfs.entries()) {
      const pdfUrl = `${API_URL}${doc.url}`;
      const pdfName = `document-${index + 1}.pdf`;

      try {
        // Fetch the image data as a Blob
        const response = await fetch(pdfUrl);
        const blob = await response.blob();

        // Add the Blob to the ZIP file
        zip.file(pdfName, blob);
      } catch (error) {
        console.error(`Failed to fetch image ${pdfName}:`, error);
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
      <div className="columns is-3">
        <div className="column is-1">
          <div className="grid is-flex is-flex-direction-column is-justify-content-left">
            {allPdfs &&
              allPdfs.map((doc) => (
                <Document
                  key={doc.id}
                  file={`${API_URL}${doc.url}`}
                  onClick={() => setActivePdf(doc)}
                >
                  <Page
                    pageNumber={1}
                    scale={0.05}
                    style={{
                      opacity: activePdf.id === doc.id ? "1" : "0",
                    }}
                  ></Page>
                </Document>
              ))}
          </div>
        </div>
        <div
          className="column is-three-fifths"
          ref={containerRef}
          style={{
            height: "auto",
            margin: "0 auto",
            overflow: "hidden",
          }}
        >
          <Document
            file={`${API_URL}${activePdf.url}`}
            onClick={() => openModal()}
            loading={<LoadingIcon />}
          >
            <Page
              pageNumber={1}
              scale={scale}
              style={{
                margin: "0 auto", // Center the PDF page
              }}
            ></Page>
          </Document>
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
              <TransformWrapper
                minScale={1} // Minimum scale to prevent the image from shrinking too much
                maxScale={3} // Maximum scale to prevent excessive zooming
                centerZoomedOut={true} // Center the image when zoomed out
              >
                <TransformComponent>
                  <Document file={`${API_URL}${activePdf.url}`}>
                    <Page pageNumber={1} scale={1.1}></Page>
                  </Document>
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
}

export default PDFViewer;
