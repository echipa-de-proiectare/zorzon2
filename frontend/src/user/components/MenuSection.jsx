import "../styles/MenuSection.css";

const MenuSection = ({ phase, setPhaseName, phaseName }) => {
  const onItemClick = (element) => {
    setPhaseName(element.name);
  };

  return (
    <li className="menu-section">
      <span className="icon-text is-flex is-justify-content-space-between is-align-items-center">
        <span>{phase.name}</span>
      </span>
      <ul>
        {phase.item.map((element) => (
          <li key={element.id} onClick={() => onItemClick(element)}>
            <a
              className={`has-background-inherit m-0 p-0 ${
                phaseName === element.name ? "is-active" : ""
              }`}
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
              <span className="icon-text is-flex is-justify-content-space-between is-align-items-center">
                <span>{element.name}</span>
                {!element.available && (
                  <span className="icon is-small">
                    <i className="fas fa-lock"></i>
                  </span>
                )}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default MenuSection;
