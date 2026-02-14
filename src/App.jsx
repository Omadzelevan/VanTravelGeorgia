import { useState } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import TourGallery from "./components/tour/TourGallery";
import About from "./pages/About";
function App() {
  return (
    <>
      <Header></Header>
      <Home></Home>
      <TourGallery></TourGallery>
      <About></About>
    </>
  );
}

export default App;
