import "./App.css";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import TourGallery from "./components/tour/TourGallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
        <TourGallery />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
