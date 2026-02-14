import "../styles/home.css";
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>VanTravelGeorgia</h1>
        <h2>Explore Georgia With Comfort & Freedom</h2>
        <p>
          Private tours, mountain adventures, cultural journeys and
          unforgettable road trips across Georgia.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">View Tours</button>
          <button className="secondary-btn">Contact Us</button>
        </div>
      </div>

      {/* Moving Tours */}
      <div className="tour-marquee">
        <div className="marquee-track">
          <span>Kazbegi Tour</span>
          <span>Svaneti Adventure</span>
          <span>Kakheti Wine Tour</span>
          <span>Batumi Coastal Trip</span>
          <span>Vardzia Cave Tour</span>

          {/* duplicate for smooth loop */}
          <span>Kazbegi Tour</span>
          <span>Svaneti Adventure</span>
          <span>Kakheti Wine Tour</span>
          <span>Batumi Coastal Trip</span>
          <span>Vardzia Cave Tour</span>
        </div>
      </div>
    </section>
  );
}
