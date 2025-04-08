import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";
import LoadingIcon from "../../elements/loadingIcon";

const LogOut = () => {
  const { setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    sessionStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setUser(null);
    setRedirect(true);
  }, [setUser]);

  if (redirect) return <Navigate to="/" />;
  return <LoadingIcon />;
};

export default LogOut;
