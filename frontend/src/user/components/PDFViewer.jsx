import { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { pdfjs } from "react-pdf";
const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
function PDFViewer({ document }) {
  /*  
cand trec de la existing plan la proposed plan de exemplu imi pastreaza pagenumerul de la existing plan. Ar trebui sa se reseteze
 const [pageNumber, setPageNumber] = useState(0);

  const onPrevClick = () => {
    if (pageNumber === 0) {
      const newPageNumber = url.length - 1;
      setPageNumber(newPageNumber);
    } else {
      const newPageNumber = pageNumber - 1;
      setPageNumber(newPageNumber);
    }
  };

  const onNextClick = () => {
    if (pageNumber === url.length - 1) {
      const newPageNumber = 0;
      setPageNumber(newPageNumber);
    } else {
      const newPageNumber = pageNumber + 1;
      setPageNumber(newPageNumber);
    }
  }; */

  return (
    <div className="is-flex is-align-items-center is-gap-5 is-flex-direction-column">
      {/* {url.length > 1 && (
        <>
          <p>
            Page {pageNumber + 1} of {url.length}
          </p>
          <nav className="pagination" role="navigation" aria-label="pagination">
            <a onClick={onPrevClick} className="pagination-previous">
              Previous
            </a>
            <a onClick={onNextClick} className="pagination-next">
              Next page
            </a>
          </nav>
        </>
      )}
 */}
      {document &&
        document.map((element) => (
          <Document key={element.id} file={`${API_URL}${element.url}`}>
            <Page pageNumber={1}></Page>
          </Document>
        ))}
    </div>
  );
}

export default PDFViewer;
