import { useEffect, useState } from "react";
import "../styles/home.css";
import { useLanguage } from "../context/LanguageContext";
export default function Hero() {
  const { t } = useLanguage();
  const heroImages = [
    "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=2000&q=80",
  ];
  const [activeBg, setActiveBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBg((prev) => (prev + 1) % heroImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="hero" id="home">
      <div className="hero-bg-slides" aria-hidden="true">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`hero-bg-slide ${index === activeBg ? "is-active" : ""}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      <div className="hero-content">
        <span className="hero-kicker">{t.home.kicker}</span>
        <h1>{t.home.title}</h1>
        <h2>{t.home.subtitle}</h2>
        <p>{t.home.description}</p>

        <div className="hero-buttons">
          <a href="/#tours" className="primary-btn">{t.home.viewTours}</a>
          <a href="/#contact" className="secondary-btn">{t.home.contactUs}</a>
        </div>

        <div className="hero-stats">
          <div>
            <strong>1200+</strong>
            <span>{t.home.happyTravelers}</span>
          </div>
          <div>
            <strong>5</strong>
            <span>{t.home.signatureRoutes}</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>{t.home.support}</span>
          </div>
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
