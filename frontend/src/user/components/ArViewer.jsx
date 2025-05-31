import { useContext } from "react";
import { UserContext } from "../utility/UserContext";

const ArViewer = () => {
  const context = useContext(UserContext);
  const jwt = context.jwt || sessionStorage.getItem("jwt");
  console.log("JWT in ArViewer:", jwt);

  return (
    <iframe
      width="100%"
      height="100%"
      src={`http://localhost:5174/?token=${encodeURIComponent(jwt)}`}
      allow="camera; gyroscope; accelerometer; xr-spatial-tracking"
    ></iframe>
  );
};

export default ArViewer;
