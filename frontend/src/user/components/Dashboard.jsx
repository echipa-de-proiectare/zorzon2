import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../utility/UserContext";
import { useFetchUserProjects } from "../hooks/useFetchUserProjects";
import MenuSection from "./MenuSection";
/* import MenuSection from "./MenuSection"; */

const Dashboard = ({ viewItemId, setViewItemId, setViewPhaseId }) => {
  const { loading, error, projects } = useFetchUserProjects();
  const { setUser } = useContext(UserContext);

  const handleProfileClick = () => {
    setViewItemId(null);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <aside className="menu">
      <p className="menu-label">Notifications</p>
      <ul className="menu-list">
        <li>
          <a
            className="has-background-inherit m-0 p-0"
            onClick={handleProfileClick}
          >
            N1
          </a>
        </li>
        <li>
          <a
            className="has-background-inherit m-0 p-0"
            onClick={handleProfileClick}
          >
            N2
          </a>
        </li>
      </ul>
      {projects && (
        <>
          <p className="menu-label"> {projects.name} </p>
          <ul className="menu-list">
            {projects.phase.map((phase) => (
              <MenuSection
                key={phase.id}
                phase={phase}
                setViewItemId={setViewItemId}
                viewItemId={viewItemId}
                setViewPhaseId={setViewPhaseId}
              />
            ))}
          </ul>
        </>
      )}
      <p className="menu-label">Profile</p>
      <ul className="menu-list">
        <li>
          <Link
            to="/user/profile"
            className="has-background-inherit m-0 p-0"
            onClick={handleProfileClick}
          >
            User Profile
          </Link>
        </li>
        <li>
          <a
            className="has-background-inherit m-0 p-0"
            onClick={handleProfileClick}
          >
            P2
          </a>
        </li>
      </ul>
      <Link className="button mt-5" to="/" onClick={handleLogoutClick}>
        <strong>Log out</strong>
      </Link>
    </aside>
  );
};

export default Dashboard;
