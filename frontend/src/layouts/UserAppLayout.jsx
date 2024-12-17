import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "../user/components/Dashboard";
import { useFetchUserProjects } from "../user/hooks/useFetchUserProjects";
import NotAllowedUserHome from "../user/components/NotAllowedUserHome";

const UserAppLayout = () => {
  // set what document to view
  const [viewItemId, setViewItemId] = useState("");
  const [viewPhaseId, setViewPhaseId] = useState("");

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
      <div className="container is-fluid columns">
        <section className="section column is-one-fifth">
          <Dashboard
            viewItemId={viewItemId}
            setViewItemId={setViewItemId}
            setViewPhaseId={setViewPhaseId}
          />
        </section>
        <section className="section column">
          <div>
            <Outlet context={{ viewItemId, viewPhaseId }} />
          </div>
        </section>
      </div>
    </>
  );
};

export default UserAppLayout;
