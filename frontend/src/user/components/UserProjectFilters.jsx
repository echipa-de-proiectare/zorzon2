import { useEffect } from "react";

const UserProjectFilters = ({
  reviewDate,
  setReviewDate,
  uniqueSortedDates,
}) => {
  const handleDateChange = (date) => {
    setReviewDate(date);
  };

  return (
    <div className="dropdown is-hoverable">
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{reviewDate}</span>{" "}
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu4" role="menu">
        <div className="dropdown-content">
          {uniqueSortedDates.map((date) => (
            <a
              className={
                reviewDate === date
                  ? `dropdown-item is-active`
                  : `dropdown-item`
              }
              key={date}
              onClick={() => handleDateChange(date)}
            >
              {date}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProjectFilters;
