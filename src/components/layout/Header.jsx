import "../../styles/globals.css";
import burger from "../../assets/icons/hamburger 1.svg";
import Logo from "/home/lea/tours/tours-ge/src/assets/images/logo.png";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <div className="nav">
        <div className="lang-chose">
          <select>
            <option value="en">🇬🇧</option>
            <option value="ge">🇬🇪</option>
          </select>
        </div>
        <div className="burger">
          <img src={burger} alt="" />
        </div>
      </div>
    </header>
  );
}
