import "../../styles/globals.css";
import burger from "../../assets/icons/hamburger 1.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo">
          <h1>Van Travel Georgia</h1>
        </div>
        <nav className="nav">
          <a href="#tours">Tours</a>
          <a href="#why-toru">Why Toru</a>
          <a href="#itineraries">Itineraries</a>
          <a href="#stories">Stories</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="header-cta">
          <button className="btn btn-ghost">Call +995 555 123 456</button>
          <button className="btn btn-primary">Plan My Trip</button>
        </div>
        <div className="burger">
          <button className="burger-btn" aria-label="Open menu">
            <img className="burger-img" src={burger} alt="" />
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}
