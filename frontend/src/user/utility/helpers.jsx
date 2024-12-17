import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const userData = () => {
  const stringifiedUser = localStorage.getItem("user");
  if (stringifiedUser) {
    return JSON.parse(stringifiedUser);
  }
  return null;
};

export const Protector = ({ Component }) => {
  const navigate = useNavigate();
  const jwt = userData();

  useEffect(() => {
    if (!jwt) {
      navigate("/");
    }
  }, [navigate, jwt]);

  return Component;
};
