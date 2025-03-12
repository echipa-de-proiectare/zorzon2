import PDFViewer from "./PDFViewer";
import ImageViewer from "./ImageViewer";
import ThreeDViewer from "./ThreeDViewer";
import { useEffect, useState } from "react";
import UserProjectFilters from "./UserProjectFilters";
import Dashboard from "./Dashboard";
import { useProjectContext } from "../../layouts/UserAppLayout";

const UserProject = () => {
  const project = useProjectContext();

  const [documentItem, setDocumentItem] = useState(
    project.phase[0].item[0].DocumentItem[0]
  );

  const [phaseName, setPhaseName] = useState(project.phase[0].item[0].name);

  const reviewDates = project?.phase.flatMap((phase) =>
    phase.item?.flatMap((item) =>
      item.DocumentItem?.flatMap((doc) => doc.ReviewDate)
    )
  );

  const [reviewDate, setReviewDate] = useState(
    reviewDates[reviewDates.length - 1]
  );
  const uniqueSortedDates = [...new Set(reviewDates)].sort(
    (a, b) => new Date(a) - new Date(b)
  );

  useEffect(() => {
    const element = project.phase
      .flatMap((phase) => phase.item) // Flatten all items from all phases
      .find((item) => item.name === phaseName); // Find the item by name
    // Find the document that matches the selected review date
    let document = element.DocumentItem.find(
      (doc) => doc.ReviewDate === reviewDate
    );

    // If no exact match, find the latest older document
    if (!document) {
      const previousDocs = element.DocumentItem.filter(
        (doc) => new Date(doc.ReviewDate) <= new Date(reviewDate)
      ) // Find only older or equal review dates
        .sort((a, b) => new Date(b.ReviewDate) - new Date(a.ReviewDate)); // Sort descending (newest first)

      document = previousDocs.length > 0 ? previousDocs[0] : null; // Pick the latest available document
    }

    setDocumentItem(document);
  }, [reviewDate, phaseName, project]);

  return (
    <div className="section p-0 my-6 ">
      <div className="columns is-0">
        <div className="column is-2 ">
          {project && (
            <Dashboard setPhaseName={setPhaseName} phaseName={phaseName} />
          )}
        </div>
        <div className="column is-10">
          <UserProjectFilters
            reviewDate={reviewDate}
            setReviewDate={setReviewDate}
            uniqueSortedDates={uniqueSortedDates}
          />
          <div className="section p-0 ">
            {documentItem ? (
              documentItem.type === "document" ? (
                documentItem.MediaDoc[0].MediaFile.ext === ".pdf" ? (
                  <PDFViewer
                    document={documentItem}
                    reviewDate={reviewDate}
                    phase={phaseName}
                  />
                ) : (
                  <ImageViewer
                    document={documentItem}
                    reviewDate={reviewDate}
                    phase={phaseName}
                  />
                )
              ) : documentItem.type === "model" ? (
                <div style={{ height: "80vh", display: "flex" }}>
                  <ThreeDViewer document={documentItem.modelurl} />
                </div>
              ) : null
            ) : (
              <p>Aceasta etapa nu este disponibila pentru data selectata.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProject;
