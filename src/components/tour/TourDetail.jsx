import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingModal from "../../features/booking/BookingModal";
import "../../styles/tourdetail.css";
import Seo from "../seo/Seo";
import { toursData } from "../../data/tours";
import { useLanguage } from "../../context/LanguageContext";
export default function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const tour = toursData.find((t) => t.id === parseInt(id));
  const heroImages = tour?.gallery?.length
    ? tour.gallery
    : tour?.image
    ? [tour.image]
    : [];
  const currentImageIndex = heroImages.length
    ? activeImageIndex % heroImages.length
    : 0;

  useEffect(() => {
    if (heroImages.length < 2) return undefined;
    const intervalId = setInterval(() => {
      setActiveImageIndex((previous) => (previous + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [heroImages.length, id]);

  if (!tour) {
    return (
      <div className="tour-not-found">
        <Seo
          title="Tour Not Found | VanTravelGeorgia"
          description="The requested tour could not be found."
          path={`/tour/${id}`}
          noindex
          image="/images/logo.png"
        />
        <h2>{t.tours.detail.notFound}</h2>
        <button onClick={() => navigate("/")}>{t.tours.detail.backToTours}</button>
      </div>
    );
  }

  const handleBooking = () => {
    setIsBookingOpen(true);
  };

  const handlePrevImage = () => {
    const size = heroImages.length;
    if (!size) return;
    setActiveImageIndex((previous) => ((previous % size) - 1 + size) % size);
  };

  const handleNextImage = () => {
    const size = heroImages.length;
    if (!size) return;
    setActiveImageIndex((previous) => (previous + 1) % size);
  };

  return (
    <div className="tour-detail">
      <Seo
        title={`${tour.title} | VanTravelGeorgia`}
        description={tour.description}
        path={`/tour/${tour.id}`}
        image={tour.image}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: tour.title,
          description: tour.description,
          touristType: "Private Tour",
          itinerary: tour.itinerary.map((day) => ({
            "@type": "Trip",
            name: `Day ${day.day}: ${day.title}`,
          })),
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: tour.price,
            availability: "https://schema.org/InStock",
          },
        }}
      />
      {/* Hero Section */}
      <div className="tour-detail-hero">
        <div className="tour-detail-hero-slides" aria-hidden="true">
          {heroImages.map((img, index) => (
            <img
              key={img}
              src={img}
              alt=""
              className={`tour-detail-hero-slide ${
                index === currentImageIndex ? "active" : ""
              }`}
            />
          ))}
        </div>
        <div className="tour-detail-hero-overlay">
          <button
            className="back-button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            ← {t.tours.detail.back}
          </button>
          <div className="tour-detail-hero-content">
            <span className="tour-category-badge">{tour.category}</span>
            <h1>{tour.title}</h1>
            <div className="tour-meta">
              <span>📍 {tour.location}</span>
              <span>⏱️ {tour.duration}</span>
              <span className="tour-price">
                ${tour.price} {t.tours.detail.perPerson}
              </span>
            </div>
          </div>

          <div className="tour-detail-hero-gallery">
            <button
              type="button"
              className="hero-gallery-nav"
              onClick={handlePrevImage}
              aria-label="Previous hero image"
            >
              ←
            </button>
            <div className="hero-gallery-thumbs">
              {heroImages.map((img, index) => (
                <button
                  key={`${img}-${index}`}
                  type="button"
                  className={`hero-thumb ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Show image ${index + 1}`}
                >
                  <img src={img} alt={`${tour.title} view ${index + 1}`} />
                </button>
              ))}
            </div>
            <button
              type="button"
              className="hero-gallery-nav"
              onClick={handleNextImage}
              aria-label="Next hero image"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="tour-detail-container">
        {/* Main Content */}
        <div className="tour-detail-main">
          {/* Description */}
          <section className="tour-section">
            <h2>{t.tours.detail.about}</h2>
            <p>{tour.description}</p>
          </section>

          {/* Highlights */}
          <section className="tour-section">
            <h2>{t.tours.detail.highlights}</h2>
            <ul className="highlights-list">
              {tour.highlights.map((highlight, index) => (
                <li key={index}>
                  <span className="check-icon">✓</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </section>

          {/* Itinerary */}
          <section className="tour-section">
            <h2>{t.tours.detail.itinerary}</h2>
            <div className="itinerary">
              {tour.itinerary.map((day) => (
                <div key={day.day} className="itinerary-day">
                  <h3>
                    {t.tours.detail.day} {day.day}: {day.title}
                  </h3>
                  <ul>
                    {day.activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* What's Included */}
          <section className="tour-section">
            <h2>{t.tours.detail.included}</h2>
            <ul className="included-list">
              {tour.included.map((item, index) => (
                <li key={index}>
                  <span className="check-icon">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Gallery */}
          <section className="tour-section">
            <h2>{t.tours.detail.gallery}</h2>
            <div className="tour-gallery-grid">
              {tour.gallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${tour.title} - ${index + 1}`}
                  loading="lazy"
                />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="tour-detail-sidebar">
          <div className="booking-card">
            <div className="booking-price">
              <span className="price-label">{t.tours.detail.from}</span>
              <span className="price-amount">${tour.price}</span>
              <span className="price-person">{t.tours.detail.perPerson}</span>
            </div>

            <div className="booking-info">
              <div className="info-row">
                <span className="info-label">{t.tours.detail.duration}</span>
                <span className="info-value">{tour.duration}</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t.tours.detail.location}</span>
                <span className="info-value">{tour.location}</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t.tours.detail.category}</span>
                <span className="info-value">{tour.category}</span>
              </div>
            </div>

            <button className="book-now-btn" onClick={handleBooking}>
              {t.tours.detail.bookNow}
            </button>

            <p className="booking-note">{t.tours.detail.bookingNote}</p>
          </div>
        </aside>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        tour={tour}
      />
    </div>
  );
}
