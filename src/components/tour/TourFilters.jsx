import "/home/lea/tours/tours-ge/src/styles/tourfilter.css";

export default function TourFilters({ activeFilter, setFilter }) {
  const filters = [
    { id: "all", label: "All" },
    { id: "mountain", label: "Mountain" },
    { id: "wine", label: "Wine" },
    { id: "sea", label: "Sea" },
    { id: "culture", label: "Culture" },
  ];

  return (
    <div className="tour-filters">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setFilter(filter.id)}
          className={activeFilter === filter.id ? "active" : ""}
          data-filter={filter.id}
          aria-pressed={activeFilter === filter.id}
        >
          <span className="filter-icon">{filter.icon}</span>
          {filter.label}
        </button>
      ))}
    </div>
  );
}

// TourFilters.propTypes = {
//   activeFilter: PropTypes.string.isRequired,
//   setFilter: PropTypes.func.isRequired,
// };
