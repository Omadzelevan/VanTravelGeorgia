import "../styles/about.css";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-content">
          <h2>{t.about.title}</h2>
          <div className="about-text">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <div className="about-features">
              <div className="feature">
                <span className="feature-icon">🚐</span>
                <h3>{t.about.f1Title}</h3>
                <p>{t.about.f1Text}</p>
              </div>
              <div className="feature">
                <span className="feature-icon">🏔️</span>
                <h3>{t.about.f2Title}</h3>
                <p>{t.about.f2Text}</p>
              </div>
              <div className="feature">
                <span className="feature-icon">🍷</span>
                <h3>{t.about.f3Title}</h3>
                <p>{t.about.f3Text}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="about-image">
          <img
            src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Scenic mountain landscape in Georgia with winding roads"
            loading="lazy"
          />
          <div className="image-overlay"></div>
        </div>
      </div>
    </section>
  );
}
