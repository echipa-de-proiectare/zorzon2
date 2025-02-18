import { Outlet } from "react-router-dom";
import { useFetchUserProject } from "../user/hooks/useFetchUserProjects";
import NotAllowedUserHome from "../user/components/NotAllowedUserHome";
import Nav from "../main/components/Nav";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";

const ProjectContext = createContext();
export const useProjectContext = () => useContext(ProjectContext);

const UserAppLayout = ({ globalSettings }) => {
  const { loadingProject, errorProject, project } = useFetchUserProject();

  const logoSecondary = globalSettings.logo_secondary;
  const topNavigation = globalSettings.userTopNavigation;

  if (errorProject) return <p>A network error was encountered</p>;
  if (loadingProject) return <p>Loading...</p>;
  if (!project) return <NotAllowedUserHome />;

  return (
    <ProjectContext.Provider value={project}>
      <div className="is-flex is-flex-direction-column is-justify-content-space-between">
        <Nav topNavigation={topNavigation} logoSecondary={logoSecondary} />
        <Outlet />
      </div>
    </ProjectContext.Provider>
  );
};

export default UserAppLayout;

UserAppLayout.propTypes = {
  globalSettings: PropTypes.object.isRequired,
};
