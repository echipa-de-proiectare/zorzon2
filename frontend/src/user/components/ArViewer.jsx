import { useContext } from "react";
import { UserContext } from "../utility/UserContext";
const VITE_AR_VIEWER_URL = import.meta.env.VITE_AR_VIEWER_URL; // Access the environment variable
const ArViewer = () => {
  const context = useContext(UserContext);
  const jwt = context.jwt || sessionStorage.getItem("jwt");

  return (
    <iframe
      width="100%"
      height="100%"
      src={`${VITE_AR_VIEWER_URL}/?token=${encodeURIComponent(jwt)}`}
      allow="camera; gyroscope; accelerometer; xr-spatial-tracking"
    ></iframe>
  );
};

export default ArViewer;
