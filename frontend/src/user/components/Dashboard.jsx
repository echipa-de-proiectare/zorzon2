import { Link } from "react-router-dom";
import MenuSection from "./MenuSection";
/* import MenuSection from "./MenuSection"; */

const Dashboard = ({ project }) => {
  return (
    <div className="container">
      <aside className="menu">
        <p className="menu-label"> {project.name} </p>
        <ul className="menu-list">
          {project.phase.map((phase) => (
            <MenuSection key={phase.id} phase={phase} project={project} />
          ))}
        </ul>

        <p className="menu-label">Profile</p>
        <ul className="menu-list">
          <li>
            <Link to="/user/profile" className="has-background-inherit m-0 p-0">
              User Profile
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Dashboard;
