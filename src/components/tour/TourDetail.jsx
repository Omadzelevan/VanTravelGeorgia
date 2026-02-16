import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import BookingModal from "../../features/booking/BookingModal";
import "/home/lea/tours/tours-ge/src/styles/tourdetail.css";

export default function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Tour data (same as in TourGallery)
  const tours = [
    {
      id: 1,
      title: "Kazbegi Mountain Escape",
      location: "Stepantsminda, Georgia",
      duration: "2 Days",
      price: 180,
      category: "mountain",
      image:
        "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "Experience the breathtaking beauty of the Caucasus Mountains. This tour takes you to the iconic Gergeti Trinity Church with stunning views of Mount Kazbek.",
      highlights: [
        "Visit Gergeti Trinity Church at 2,170m elevation",
        "Panoramic views of Mount Kazbek (5,047m)",
        "Traditional Georgian mountain cuisine",
        "Visit Ananuri Fortress complex",
        "Scenic drive along Georgian Military Highway",
      ],
      included: [
        "Transportation in comfortable van",
        "Professional English-speaking guide",
        "1 night accommodation",
        "Breakfast and lunch",
        "All entrance fees",
      ],
      itinerary: [
        {
          day: 1,
          title: "Tbilisi to Kazbegi",
          activities: [
            "Depart from Tbilisi at 9:00 AM",
            "Stop at Ananuri Fortress (12th century)",
            "Lunch at local restaurant in Pasanauri",
            "Arrive in Stepantsminda, check-in to hotel",
            "Afternoon hike to Gergeti Trinity Church",
            "Dinner with traditional Georgian dishes",
          ],
        },
        {
          day: 2,
          title: "Kazbegi Exploration & Return",
          activities: [
            "Morning mountain photography session",
            "Visit local craftsmen and try traditional felt-making",
            "Lunch in Stepantsminda",
            "Return journey to Tbilisi with scenic stops",
            "Arrive in Tbilisi around 7:00 PM",
          ],
        },
      ],
      gallery: [
        "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1670765/pexels-photo-1670765.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
    },
    {
      id: 2,
      title: "Kakheti Wine Journey",
      location: "Kakheti Region",
      duration: "1 Day",
      price: 120,
      category: "wine",
      image:
        "https://images.pexels.com/photos/367233/pexels-photo-367233.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "Discover Georgia's wine-making heritage in the Kakheti region, home to 8,000 years of wine culture. Visit traditional wineries and taste authentic Georgian wines.",
      highlights: [
        "Visit 3 traditional wine cellars",
        "Taste 10+ varieties of Georgian wine",
        "Traditional Georgian feast (Supra)",
        "Learn about Qvevri wine-making method (UNESCO heritage)",
        "Visit Sighnaghi, the 'City of Love'",
      ],
      included: [
        "Transportation in comfortable van",
        "Expert sommelier guide",
        "Wine tastings at 3 wineries",
        "Traditional Georgian lunch",
        "All entrance fees",
      ],
      itinerary: [
        {
          day: 1,
          title: "Kakheti Wine Tour",
          activities: [
            "Depart from Tbilisi at 9:00 AM",
            "First winery visit - traditional Qvevri wines",
            "Second winery - modern Georgian wines",
            "Traditional Georgian lunch (Supra) with wine pairing",
            "Visit Sighnaghi town and ancient walls",
            "Third winery - dessert wines and Chacha tasting",
            "Return to Tbilisi around 7:00 PM",
          ],
        },
      ],
      gallery: [
        "https://images.pexels.com/photos/367233/pexels-photo-367233.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2467506/pexels-photo-2467506.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
    },
    {
      id: 3,
      title: "Batumi Coastal Tour",
      location: "Batumi, Georgia",
      duration: "2 Days",
      price: 150,
      category: "sea",
      image:
        "https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "Explore the pearl of the Black Sea! Modern architecture, beautiful beaches, and vibrant nightlife await you in Batumi.",
      highlights: [
        "Batumi Boulevard seaside walk",
        "Ali and Nino moving statue",
        "Batumi Botanical Garden",
        "Dolphinarium show",
        "Modern architecture tour",
      ],
      included: [
        "Transportation in comfortable van",
        "Professional guide",
        "1 night hotel accommodation",
        "Breakfast",
        "All entrance fees",
      ],
      itinerary: [
        {
          day: 1,
          title: "Journey to Batumi",
          activities: [
            "Depart from Tbilisi at 8:00 AM",
            "Arrive in Batumi, check-in to hotel",
            "Lunch at seaside restaurant",
            "Walk along Batumi Boulevard",
            "Visit Ali and Nino statue",
            "Evening at Batumi beach",
            "Dinner at local restaurant",
          ],
        },
        {
          day: 2,
          title: "Batumi Exploration",
          activities: [
            "Morning visit to Batumi Botanical Garden",
            "Dolphinarium show",
            "Lunch in city center",
            "Modern architecture tour",
            "Free time for shopping or beach",
            "Return to Tbilisi",
          ],
        },
      ],
      gallery: [
        "https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
    },
    {
      id: 4,
      title: "Ushguli Adventure",
      location: "Svaneti, Georgia",
      duration: "3 Days",
      price: 220,
      category: "culture",
      image:
        "https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "Journey to Europe's highest inhabited village! Experience medieval towers, ancient traditions, and stunning mountain landscapes in UNESCO-listed Svaneti.",
      highlights: [
        "Visit Ushguli - highest inhabited village in Europe",
        "Medieval Svan towers",
        "UNESCO World Heritage sites",
        "Traditional Svan cuisine",
        "Mountain hiking opportunities",
      ],
      included: [
        "Transportation in 4x4 vehicle",
        "Professional guide",
        "2 nights accommodation",
        "All meals",
        "All entrance fees",
      ],
      itinerary: [
        {
          day: 1,
          title: "Tbilisi to Mestia",
          activities: [
            "Early departure from Tbilisi",
            "Scenic drive through mountains",
            "Arrive in Mestia, check-in",
            "Visit Mestia Svan towers",
            "Traditional Svan dinner",
          ],
        },
        {
          day: 2,
          title: "Ushguli Expedition",
          activities: [
            "Drive to Ushguli (2,200m elevation)",
            "Explore medieval village",
            "Visit Queen Tamar's towers",
            "Traditional Svan lunch",
            "Hiking in the area",
            "Return to Mestia for overnight",
          ],
        },
        {
          day: 3,
          title: "Return Journey",
          activities: [
            "Morning in Mestia",
            "Visit local museum",
            "Return journey to Tbilisi",
            "Scenic stops along the way",
          ],
        },
      ],
      gallery: [
        "https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
    },
    {
      id: 5,
      title: "Tbilisi City Vibes",
      location: "Tbilisi, Georgia",
      duration: "1 Day",
      price: 100,
      category: "city",
      image:
        "https://images.pexels.com/photos/3894365/pexels-photo-3894365.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "Discover the charm of Tbilisi! Walk through narrow streets of Old Town, enjoy sulfur baths, and taste delicious Georgian cuisine.",
      highlights: [
        "Old Town walking tour",
        "Narikala Fortress panoramic views",
        "Traditional sulfur baths experience",
        "Georgian wine and cuisine tasting",
        "Modern Tbilisi architecture",
      ],
      included: [
        "Professional walking guide",
        "Traditional Georgian lunch",
        "Wine tasting (4 varieties)",
        "Cable car tickets",
        "All entrance fees",
      ],
      itinerary: [
        {
          day: 1,
          title: "Tbilisi City Tour",
          activities: [
            "Meet at Liberty Square at 10:00 AM",
            "Walk through Old Town cobblestone streets",
            "Visit Metekhi Church",
            "Cable car to Narikala Fortress",
            "Lunch at traditional Georgian restaurant",
            "Visit sulfur baths district",
            "Wine tasting at local wine bar",
            "Explore Rustaveli Avenue",
            "Tour ends at 6:00 PM",
          ],
        },
      ],
      gallery: [
        "https://images.pexels.com/photos/3894365/pexels-photo-3894365.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2467506/pexels-photo-2467506.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
    },
  ];

  const tour = tours.find((t) => t.id === parseInt(id));

  if (!tour) {
    return (
      <div className="tour-not-found">
        <h2>Tour not found</h2>
        <button onClick={() => navigate("/")}>Back to Tours</button>
      </div>
    );
  }

  const handleBooking = () => {
    setIsBookingOpen(true);
  };

  return (
    <div className="tour-detail">
      {/* Hero Section */}
      <div
        className="tour-detail-hero"
        style={{ backgroundImage: `url(${tour.image})` }}
      >
        <div className="tour-detail-hero-overlay">
          <button
            className="back-button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            ← Back
          </button>
          <div className="tour-detail-hero-content">
            <span className="tour-category-badge">{tour.category}</span>
            <h1>{tour.title}</h1>
            <div className="tour-meta">
              <span>📍 {tour.location}</span>
              <span>⏱️ {tour.duration}</span>
              <span className="tour-price">${tour.price} per person</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tour-detail-container">
        {/* Main Content */}
        <div className="tour-detail-main">
          {/* Description */}
          <section className="tour-section">
            <h2>About This Tour</h2>
            <p>{tour.description}</p>
          </section>

          {/* Highlights */}
          <section className="tour-section">
            <h2>Tour Highlights</h2>
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
            <h2>Itinerary</h2>
            <div className="itinerary">
              {tour.itinerary.map((day) => (
                <div key={day.day} className="itinerary-day">
                  <h3>
                    Day {day.day}: {day.title}
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
            <h2>What's Included</h2>
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
            <h2>Gallery</h2>
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
              <span className="price-label">From</span>
              <span className="price-amount">${tour.price}</span>
              <span className="price-person">per person</span>
            </div>

            <div className="booking-info">
              <div className="info-row">
                <span className="info-label">Duration</span>
                <span className="info-value">{tour.duration}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Location</span>
                <span className="info-value">{tour.location}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Category</span>
                <span className="info-value">{tour.category}</span>
              </div>
            </div>

            <button className="book-now-btn" onClick={handleBooking}>
              Book Now
            </button>

            <p className="booking-note">
              Contact us for custom dates and group bookings
            </p>
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
