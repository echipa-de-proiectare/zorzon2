import PDFViewer from "./PDFViewer";
import ImageViewer from "./ImageViewer";
import ThreeDViewer from "./ThreeDViewer";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import UserProjectFilters from "./UserProjectFilters";

const UserProject = () => {
  const location = useLocation();
  const { documentItem, project, phase } = location.state || {};
  //extract and sort review dates
  const reviewDates = project?.phase.flatMap((phase) =>
    phase.item?.flatMap((item) =>
      item.DocumentItem?.flatMap((doc) => doc.ReviewDate)
    )
  );
  const uniqueSortedDates = [...new Set(reviewDates)].sort(
    (a, b) => new Date(a) - new Date(b)
  );
  //
  const [reviewDate, setReviewDate] = useState(
    uniqueSortedDates[uniqueSortedDates.length - 1]
  );
  const matchingDocument = documentItem.find(
    (document) => document.ReviewDate === reviewDate
  );

  const fallbackDocument = documentItem
    .filter((document) => new Date(document.ReviewDate) < new Date(reviewDate)) // Filter for dates earlier than the reviewDate
    .sort((a, b) => new Date(b.ReviewDate) - new Date(a.ReviewDate)) // Sort by most recent earlier date
    .at(0); // Get the first one

  const documentToShow = matchingDocument || fallbackDocument;

  return (
    <div className="container">
      <div className="section">
        <p>Review Date</p>
        <UserProjectFilters
          reviewDate={reviewDate}
          setReviewDate={setReviewDate}
          uniqueSortedDates={uniqueSortedDates}
        />
      </div>
      <div className="section">
        {documentToShow ? (
          documentToShow.type === "document" ? (
            documentToShow.document[0].ext === ".pdf" ? (
              <PDFViewer
                document={documentToShow}
                reviewDate={reviewDate}
                phase={phase}
              />
            ) : (
              <ImageViewer
                document={documentToShow}
                reviewDate={reviewDate}
                phase={phase}
              />
            )
          ) : documentToShow.type === "model" ? (
            <ThreeDViewer document={documentToShow.modelurl} />
          ) : null
        ) : (
          <p>No document available at the selected review date.</p>
        )}
      </div>
    </div>
  );
};

export default UserProject;
