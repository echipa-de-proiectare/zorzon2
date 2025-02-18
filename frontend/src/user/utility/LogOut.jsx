import { useContext } from "react";
import { UserContext } from "./UserContext";
import LoadingIcon from "../../elements/loadingIcon";
import { Navigate } from "react-router-dom";

const LogOut = () => {
  const { setUser } = useContext(UserContext);
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
  setUser(null);
  Navigate("/");
  return <LoadingIcon />;
};

export default LogOut;
