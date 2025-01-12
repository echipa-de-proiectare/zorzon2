import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "../user/components/Dashboard";
import { useFetchUserProjects } from "../user/hooks/useFetchUserProjects";
import NotAllowedUserHome from "../user/components/NotAllowedUserHome";

const UserAppLayout = () => {
  // set what document to view
  const [viewItemId, setViewItemId] = useState("");
  const [viewPhaseId, setViewPhaseId] = useState("");

  const [isCollapsed, setIsCollapsed] = useState(false); // State to toggle menu
  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { loading, error, projects } = useFetchUserProjects();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const viewId = params.get("viewItemId");
    if (viewId) {
      setViewItemId(viewId);
    }

    const phaseId = params.get("viewItemId");
    if (phaseId) {
      setViewItemId(phaseId);
    }
  }, []);

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  if (!projects) return <NotAllowedUserHome />;

  return (
    <>
      <div className="container is-fluid columns pl-0">
        {/* Sidebar Section */}
        <section
          className={`section column has-background-grey-lighter  ${
            isCollapsed ? "is-narrow p-0" : "is-one-fifth "
          }`}
          style={{
            transition: "width 0.3s",
            overflow: "hidden",
          }}
        >
          {!isCollapsed && (
            <Dashboard
              viewItemId={viewItemId}
              setViewItemId={setViewItemId}
              setViewPhaseId={setViewPhaseId}
            />
          )}
        </section>
        <button className="button is-fullheight p-1" onClick={toggleMenu}>
          <i
            className={`fa-solid ${
              isCollapsed ? "fa-angle-right" : "fa-angle-left"
            }`}
          ></i>
        </button>
        <section className="section column is-fullheight">
          <Outlet context={{ viewItemId, viewPhaseId }} />
        </section>
      </div>
    </>
  );
};

export default UserAppLayout;
