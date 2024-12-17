/* import ImageViewer from "./ImageViewer";
import O3DViewer from "./O3DViewer";
*/
import { useOutletContext } from "react-router-dom";
import PDFViewer from "./PDFViewer";
import { useFetchProjectPhase } from "../hooks/useFetchUserProjects";
import ImageViewer from "./ImageViewer";

const UserProject = () => {
  const { viewItemId, viewPhaseId } = useOutletContext();

  const { loadingProjectPhase, errorProjectPhase, projectPhase } =
    useFetchProjectPhase(viewPhaseId, viewItemId);

  /* 
  const { loadingAllReviewDates, errorAllReviewDates, allReviewDates } =
    useFetchAllReviewDates();

  if (errorProjectPhase || errorAllReviewDates)
    return <p>A network error was encountered</p>;
  if (loadingProjectPhase || loadingAllReviewDates) return <p>Loading...</p>;
*/
  if (errorProjectPhase) return <p>A network error was encountered</p>;
  if (loadingProjectPhase) return <p>Loading...</p>;
  // Ensure projectPhase and document array are valid

  if (!projectPhase || projectPhase.length === 0) {
    return <p>No documents available for this project phase.</p>;
  }

  return (
    <>
      {projectPhase[0].ext === ".pdf" ? (
        <PDFViewer document={projectPhase} />
      ) : (
        /* ) : document.ext === ".obj" || document.ext === ".mtl" ? (
        <O3DViewer document={projectPhase.document} ext={document.ext} /> */
        <ImageViewer document={projectPhase} />
      )}
    </>
  );
};

export default UserProject;
