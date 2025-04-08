import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import LoadingIcon from "../../elements/loadingIcon";
const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

const GoogleAuthRedirect = () => {
  const navigate = useNavigate();
  const { setUser, setJwt } = useContext(UserContext);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const hash = window.location.search;
        const queryString = hash.substring(hash.indexOf("?"));
        const res = await axios.get(
          `${API_URL}/api/auth/google/callback?${queryString}`
        );

        const { jwt, user } = res.data;

        // Don't store jwt in localStorage!
        setJwt(jwt); // store in memory only
        sessionStorage.setItem("jwt", jwt);
        localStorage.setItem("user", JSON.stringify(user)); // optional
        setUser(user);
        navigate("/user/profile");
      } catch (err) {
        console.error("Error during authentication", err);
      }
    };

    fetchAuthData();
  }, [navigate, setJwt, setUser]);

  return <LoadingIcon />;
};

export default GoogleAuthRedirect;
