import LoadingIcon from "../../elements/loadingIcon";
const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

const LogIn = () => {
  window.location.replace(`${API_URL}/api/connect/google`);
  return <LoadingIcon />;
};

export default LogIn;
