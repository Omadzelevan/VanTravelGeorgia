import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import TourGallery from "./components/tour/TourGallery";
import TourDetail from "./components/tour/TourDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import Admin from "./pages/Admin";
import Footer from "./components/layout/Footer";
import { LanguageProvider } from "./context/LanguageContext";

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

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useLayoutEffect(() => {
    if (location.hash) return;
    window.scrollTo(0, 0);
    const rafId = window.requestAnimationFrame(() => window.scrollTo(0, 0));
    const timeoutId = window.setTimeout(() => window.scrollTo(0, 0), 0);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [location.pathname, location.hash]);

  return null;
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tour/:id" element={<TourDetail />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
