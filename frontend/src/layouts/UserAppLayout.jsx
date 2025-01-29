import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "../user/components/Dashboard";
import { useFetchUserProject } from "../user/hooks/useFetchUserProjects";
import NotAllowedUserHome from "../user/components/NotAllowedUserHome";
import Nav from "../main/components/Nav";

const UserAppLayout = ({ about }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCollapsedSecondary, setIsCollapsedSecondary] = useState(false);

  const { loadingProject, errorProject, project } = useFetchUserProject();

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };
  const toggleMenuSecondary = () => {
    setIsCollapsedSecondary(!isCollapsedSecondary);
  };

  if (errorProject) return <p>A network error was encountered</p>;
  if (loadingProject) return <p>Loading...</p>;
  if (!project) return <NotAllowedUserHome />;

  return (
    <>
      <Nav about={about} />
      <div className="section" style={{ height: "100%" }}>
        <div className="columns">
          <div
            className={`column   ${isCollapsed ? "is-narrow p-0" : "is-2"}`}
            style={{
              transition: "width 0.3s",
              overflow: "hidden",
            }}
          >
            {!isCollapsed && <Dashboard project={project} />}
          </div>

          <button
            className="button p-1"
            onClick={toggleMenu}
            style={{ height: "30px" }}
          >
            <i
              className={`fa-solid ${
                isCollapsed ? "fa-angle-right" : "fa-angle-left"
              }`}
            ></i>
          </button>
          <div className="column is-four-fifths ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAppLayout;
