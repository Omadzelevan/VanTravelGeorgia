import "../../styles/tourfilter.css";
import { useLanguage } from "../../context/LanguageContext";

export default function TourFilters({ activeFilter, setFilter }) {
  const { t } = useLanguage();
  const filters = [
    { id: "all", label: t.tours.filters.all },
    { id: "mountain", label: t.tours.filters.mountain },
    { id: "wine", label: t.tours.filters.wine },
    { id: "sea", label: t.tours.filters.sea },
    { id: "culture", label: t.tours.filters.culture },
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
