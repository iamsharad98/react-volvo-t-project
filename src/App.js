import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Carousel from './components/Carousel.tsx';
import Learn from './pages/learn.tsx';
import Shop from './pages/shop.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Carousel />} />
        <Route path="/learn/:id" element={<Learn />} />
        <Route path="/shop/:id" element={<Shop />} />
      </Routes>
    </Router>
  );
}

export default App;
