import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import TourGallery from "./components/tour/TourGallery";
import TourDetail from "./components/tour/TourDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import Footer from "./components/layout/Footer";

function HomePage() {
  return (
    <>
      <Home />
      <About />
      <TourGallery />
      <Testimonials />
      <Contact />
      <Footer></Footer>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tour/:id" element={<TourDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
