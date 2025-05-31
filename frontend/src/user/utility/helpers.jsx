import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LoadingIcon from "../../elements/loadingIcon";
import { UserContext } from "./UserContext";
const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable
export const userData = () => {
  const stringifiedUser = localStorage.getItem("user");
  if (stringifiedUser) {
    return JSON.parse(stringifiedUser);
  }
  return null;
};

export const Protector = ({ Component }) => {
  const { jwt, hydrated } = useContext(UserContext);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (hydrated) {
      setChecking(false);
    }
  }, [hydrated]);
  console.log("hydrated:", hydrated, "jwt:", jwt);
  if (checking) return <LoadingIcon />;

  if (!jwt) return <Navigate to="/" />;
  return Component;
};

export const DisplayImage = ({ image }) => {
  return (
    <img
      loading="lazy"
      src={`${API_URL}${image.formats.thumbnail.url}`} // Fallback image for older browsers
      srcSet={`
            ${API_URL}${image.formats.thumbnail.url} 117w,
            ${API_URL}${image.formats.small.url} 375w,
            ${API_URL}${image.formats.medium.url} 563w,
            ${API_URL}${image.formats.large.url} 750w,
            ${API_URL}${image.url} 3000w
          `}
      sizes="
            (max-width: 768px) 375px,
            (min-width: 769px) and (max-width: 1023px) 563px,
            (min-width: 1024px) and (max-width: 1215px) 750px,
            (min-width: 1216px) and (max-width: 1407px) 1000px,
            3000px
          "
      alt={image.name || "Image"}
    />
  );
};
