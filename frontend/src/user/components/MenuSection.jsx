import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

const MenuSection = ({ phase, project }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onArrowClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="menu-section">
      <span className="icon-text is-flex is-justify-content-space-between is-align-items-center">
        <span>{phase.name}</span>
        {!isOpen && (
          <span className="icon is-small" onClick={onArrowClick}>
            <i className="fa-solid fa-angle-right"></i>
          </span>
        )}
        {isOpen && (
          <span className="icon is-small" onClick={onArrowClick}>
            <i className="fa-solid fa-angle-down"></i>
          </span>
        )}
      </span>
      {isOpen && (
        <ul>
          {phase.item.map((element) => (
            <li key={element.id}>
              <Link
                className={`has-background-inherit m-0 p-0`}
                to="/user/project"
                state={{
                  documentItem: element.DocumentItem,
                  project: project,
                  phase: element.name,
                }}
                style={
                  element.available
                    ? {}
                    : {
                        pointerEvents: "none",
                        color: "gray",
                        cursor: "not-allowed",
                      }
                }
              >
                <span className="icon-text is-flex is-justify-content-space-between">
                  <span>{element.name}</span>
                  {!element.available && (
                    <span className="icon is-small">
                      <i className="fas fa-lock"></i>
                    </span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuSection;
