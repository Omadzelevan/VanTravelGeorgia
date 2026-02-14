export default function ToursCard({ image, title, location, duration, price }) {
  return (
    <div className="tour-card">
      <img src={image} alt={title} />
      <div className="tour-info">
        <h3>{title}</h3>
        <p className="location">{location}</p>
        <p>{duration}</p>
        <div className="price-row">
          <span>${price}</span>
          <button>Book Now</button>
        </div>
      </div>
    </div>
  );
}
