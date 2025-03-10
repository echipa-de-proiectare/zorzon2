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
  const allPdfs = document.MediaDoc;
  const [activePdf, setActivePdf] = useState(allPdfs[0]);
  const [isModalActive, setIsModalActive] = useState(false);
  const containerRef = useRef(null); // Reference to container for resizing
  useEffect(() => {
    setActivePdf(allPdfs[0]);
  }, [reviewDate, allPdfs]);
  const openModal = () => {
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  const downloadCurrentImage = () => {
    const pdfUrl = `${API_URL}${activePdf.MediaFile.url}`;
    saveAs(pdfUrl, `${activePdf.Title}.pdf`); // Pass the URL and file name
  };

  const downloadAllImagesAsZip = async (allPdfs) => {
    const zip = new JSZip();

    // Add images to the ZIP archive
    for (const doc of allPdfs) {
      const pdfUrl = `${API_URL}${doc.MediaFile.url}`;
      const pdfName = `${doc.Title}.pdf`;

      try {
        // Fetch the image data as a Blob
        const response = await fetch(pdfUrl);
        const blob = await response.blob();

        // Add the Blob to the ZIP file
        zip.file(pdfName, blob);
      } catch (error) {
        console.error(`Failed to fetch pdf ${pdfName}:`, error);
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
    <>
      <div className="columns is-0 ">
        {/* this is for the thumbnails column */}
        {/* <div className="column is-1">
          <div className="grid is-flex is-flex-direction-column is-justify-content-left">
            {allPdfs &&
              allPdfs.map((doc) => (
                <Document
                  key={doc.id}
                  file={`${API_URL}${doc.MediaFile.url}`}
                  onClick={() => setActivePdf(doc.MediaFile)}
                  className="cell"
                >
                  <Page
                    pageNumber={1}
                    style={{
                      opacity: activePdf.id === doc.id ? "1" : "0",
                    }}
                  ></Page>
                </Document>
              ))}
          </div>
        </div> */}

        <div
          className="column is-10 "
          ref={containerRef}
          style={{
            height: "auto",
            margin: "0 auto",
            overflow: "hidden",
          }}
        >
          <Document
            file={`${API_URL}${activePdf.MediaFile.url}`}
            onClick={() => openModal()}
            loading={<LoadingIcon />}
          >
            <Page pageNumber={1}></Page>
          </Document>
        </div>
        <div className="column is-2">
          <InfoSidebar
            document={document}
            downloadCurrent={downloadCurrentImage}
            downloadAll={downloadAllImagesAsZip}
          />
          <aside className="menu">
            <p className="menu-label">Planse PDF</p>
            <ul className="menu-list">
              {allPdfs &&
                allPdfs.map((doc) => (
                  <li key={doc.id}>
                    <a
                      className={`m-0 p-0 ${
                        activePdf.Title === doc.Title ? "is-active" : ""
                      }`}
                      onClick={() => setActivePdf(doc)}
                    >
                      {doc.Title}
                    </a>
                  </li>
                ))}
            </ul>
          </aside>
        </div>
      </div>
      <>
        {isModalActive && (
          <div className={`modal ${isModalActive ? "is-active" : ""}`}>
            <div className="modal-background " onClick={closeModal}></div>
            <div
              className="modal-content is-flex-mobile is-align-items-center "
              style={{ width: "auto", height: "100vh" }}
            >
              <TransformWrapper
                minScale={0.5} // Minimum scale to prevent the image from shrinking too much
                maxScale={3} // Maximum scale to prevent excessive zooming
                centerZoomedOut={true} // Center the image when zoomed out
                initialScale={0.8}
              >
                <TransformComponent>
                  <div>
                    <Document file={`${API_URL}${activePdf.MediaFile.url}`}>
                      <Page pageNumber={1} scale={1}></Page>
                    </Document>
                  </div>
                </TransformComponent>
              </TransformWrapper>
            </div>
            <button
              className="modal-close is-large"
              aria-label="close"
              style={{ backgroundColor: "gray" }}
              onClick={closeModal}
            ></button>
          </div>
        )}
      </>
    </>
  );
}

export default PDFViewer;
