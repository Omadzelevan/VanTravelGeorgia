import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import Seo from "./components/seo/Seo";
const ADMIN_UI_ENABLED = import.meta.env.VITE_ENABLE_ADMIN === "true";

function HomePage() {
  return (
    <>
      <Seo
        title="VanTravelGeorgia | Private Tours in Georgia"
        description="Private tours across Georgia: mountains, wine regions, coastal routes and cultural adventures with VanTravelGeorgia."
        path="/"
        image="/images/logo.png"
      />
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
    window.scrollTo({ top: 0, behavior: "auto" });
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
            <Route
              path="/admin"
              element={
                ADMIN_UI_ENABLED ? (
                  <>
                    <Seo
                      title="Admin | VanTravelGeorgia"
                      description="Admin dashboard for VanTravelGeorgia."
                      path="/admin"
                      noindex
                      image="/images/logo.png"
                    />
                    <Admin />
                  </>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
