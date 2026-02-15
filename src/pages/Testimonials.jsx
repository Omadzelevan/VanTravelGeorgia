import { useEffect, useRef } from "react";
import "/home/lea/tours/tours-ge/src/styles/testimonials.css";

export default function Testimonials() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval;
    let isPaused = false;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isPaused && scrollContainer) {
          scrollContainer.scrollLeft += 1;
          
          // Reset scroll when reaching the end
          if (
            scrollContainer.scrollLeft >=
            scrollContainer.scrollWidth - scrollContainer.clientWidth
          ) {
            scrollContainer.scrollLeft = 0;
          }
        }
      }, 30);
    };

    startScroll();

    // Pause on hover
    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearInterval(scrollInterval);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "United States",
      rating: 5,
      text: "Our trip to Georgia with VanTravelGeorgia was absolutely incredible! The guide was knowledgeable, the van was comfortable, and the scenery was breathtaking. Highly recommend!",
      date: "January 2025",
    },
    {
      id: 2,
      name: "Marco Rossi",
      location: "Italy",
      rating: 5,
      text: "Best travel experience I've ever had! From Kazbegi to Batumi, every stop was perfectly planned. The wine tours were exceptional. Thank you for the amazing memories!",
      date: "December 2024",
    },
    {
      id: 3,
      name: "Emma Schmidt",
      location: "Germany",
      rating: 5,
      text: "Professional service, comfortable transportation, and stunning locations. Our family loved every moment of the tour. Georgia is beautiful and this company made it even better!",
      date: "November 2024",
    },
    {
      id: 4,
      name: "James Parker",
      location: "United Kingdom",
      rating: 5,
      text: "Fantastic adventure through Georgia! The mountain views, ancient churches, and local cuisine were highlights. Our guide was friendly and spoke excellent English.",
      date: "October 2024",
    },
    {
      id: 5,
      name: "Sophie Dubois",
      location: "France",
      rating: 5,
      text: "An unforgettable journey! The attention to detail and personalized service exceeded our expectations. We can't wait to come back and explore more of Georgia!",
      date: "September 2024",
    },
    {
      id: 6,
      name: "Michael Chen",
      location: "Australia",
      rating: 5,
      text: "The wine region tours were spectacular! Great balance of culture, nature, and relaxation. VanTravelGeorgia knows how to create the perfect itinerary.",
      date: "August 2024",
    },
  ];

  // Duplicate testimonials for seamless infinite scroll
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-header">
        <h2>What Our Travelers Say</h2>
        <p className="testimonials-subtitle">
          Real experiences from people who explored Georgia with us
        </p>
      </div>

      <div className="testimonials-scroll-container" ref={scrollRef}>
        <div className="testimonials-track">
          {allTestimonials.map((testimonial, index) => (
            <div key={`${testimonial.id}-${index}`} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="testimonial-info">
                  <h3>{testimonial.name}</h3>
                  <p className="testimonial-location">{testimonial.location}</p>
                </div>
              </div>

              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>

              <p className="testimonial-text">{testimonial.text}</p>

              <p className="testimonial-date">{testimonial.date}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonials-gradient-left"></div>
      <div className="testimonials-gradient-right"></div>
    </section>
  );
}