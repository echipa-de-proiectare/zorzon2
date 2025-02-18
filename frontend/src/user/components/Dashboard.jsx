import MenuSection from "./MenuSection";
import { useProjectContext } from "../../layouts/UserAppLayout";

const Dashboard = ({ setPhaseName, phaseName }) => {
  const project = useProjectContext();

  return (
    <aside className="menu">
      <p className="menu-label"> {project.name} </p>
      <ul className="menu-list">
        {project.phase.map((phase) => (
          <MenuSection
            key={phase.id}
            phase={phase}
            setPhaseName={setPhaseName}
            phaseName={phaseName}
          />
        ))}
      </ul>
    </aside>
  );
};

export default Dashboard;
