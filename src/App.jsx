import { useState } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header></Header>
      <Home></Home>
    </>
  );
}

export default App;
