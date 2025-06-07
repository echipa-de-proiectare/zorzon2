import { useFetchUserProject } from "./useFetchUserProject";
import "@google/model-viewer";
const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

function App() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const { loading, error, project } = useFetchUserProject(token);
  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;
  if (!project) {
    // still waiting for data
    return <p>Loading project…</p>;
  }
  const documentAr =
    project.phase[2].item[0].DocumentItem[0].MediaDoc[0].MediaFile.url;

  return (
    <>
      {/* Model Viewer element */}
      <model-viewer
        src={`${API_URL}${documentAr}`}
        shadow-intensity="1"
        ar
        camera-controls
        touch-action="pan-y"
        alt="A 3D model carousel"
      >
        <button slot="ar-button" id="ar-button">
          View in your space
        </button>

        <button id="ar-failure">AR is not tracking!</button>
      </model-viewer>
    </>
  );
}

export default App;
