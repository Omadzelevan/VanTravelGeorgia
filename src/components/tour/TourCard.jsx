import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

function buildPexelsSrcSet(url) {
  if (!url.includes("pexels.com")) return undefined;
  return [480, 768, 1080]
    .map((width) => `${url.replace(/w=\d+/, `w=${width}`)} ${width}w`)
    .join(", ");
}

export default function ToursCard({
  id,
  title,
  location,
  duration,
  price,
  image,
  images,
  onQuickBook,
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const cardImages = images?.length ? images : [image];
  const currentImageIndex = cardImages.length
    ? activeImageIndex % cardImages.length
    : 0;

  useEffect(() => {
    if (cardImages.length < 2) return undefined;
    const intervalId = setInterval(() => {
      setActiveImageIndex((previous) => (previous + 1) % cardImages.length);
    }, 5500);
    return () => clearInterval(intervalId);
  }, [cardImages.length, id]);

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
        <div className="tour-image-slides" aria-hidden="true">
          {cardImages.map((cardImage, index) => (
            <img
              key={`${id}-${cardImage}-${index}`}
              src={cardImage}
              srcSet={buildPexelsSrcSet(cardImage)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt={title}
              loading="lazy"
              decoding="async"
              className={`tour-image-slide ${
                index === currentImageIndex ? "active" : ""
              }`}
            />
          ))}
        </div>
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
