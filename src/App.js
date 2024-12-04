import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Carousel from './components/Carousel.tsx';
import Learn from './pages/learn.tsx';
import Shop from './pages/shop.tsx';

function App() {
  return (
    <Router future={{
      v7_startTransition: true, // Enable startTransition feature in React Router
      v7_relativeSplatPath: true, // Enable relative route resolution within Splat routes
    }}>
      <Routes>
        <Route path="/" element={<Carousel />} />
        <Route path="/learn/:id" element={<Learn />} />
        <Route path="/shop/:id" element={<Shop />} />
      </Routes>
    </Router>
  );
}

export default App;
