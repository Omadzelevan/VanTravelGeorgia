import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

export default function ToursCard({
  id,
  title,
  location,
  duration,
  price,
  image,
  onQuickBook,
}) {
  const handleQuickBook = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickBook) {
      onQuickBook({ id, title, price });
    }
  };

  return (
    <Link to={`/tour/${id}`} className="tour-card">
      <div className="tour-image">
        <img src={image} alt={title} loading="lazy" />
        <div className="tour-overlay">
          <button className="quick-book-btn" onClick={handleQuickBook}>
            Quick Book
          </button>
          <span className="view-details">View Details →</span>
        </div>
      </div>
      <div className="tour-info">
        <h3>{title}</h3>
        <p className="tour-location">📍 {location}</p>
        <div className="tour-footer">
          <span className="tour-duration">⏱️ {duration}</span>
          <span className="tour-price">${price}</span>
        </div>
      </div>
    </Link>
  );
}

// ToursCard.propTypes = {
//   id: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   location: PropTypes.string.isRequired,
//   duration: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   image: PropTypes.string.isRequired,
//   onQuickBook: PropTypes.func,
// };
