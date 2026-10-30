import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingIcon from "../../../elements/loadingIcon";
import { DESIGN_URL } from "../../../site";

// zorzon.com.ro/portofoliu/18 -> design.zorzon.com.ro/portofoliu/18.
// nginx already redirects these in production; this covers local dev.
const MovedToDesign = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const path = pathname === "/design" ? "/" : pathname;
    window.location.replace(`${DESIGN_URL}${path}${search}`);
  }, [pathname, search]);

  return <LoadingIcon />;
};

export default MovedToDesign;
