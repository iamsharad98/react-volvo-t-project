import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../models/Product";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Carousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/cars.json")
      .then((response) => response.json())
      .then((data: Product[]) => setProducts(data));

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="carousel">
      <Slider {...settings}>
        <div className={`carousel-container ${isMobile ? "mobile" : "desktop"}`}>
          {products
            .slice(currentIndex, isMobile ? currentIndex + 1 : currentIndex + 4)
            .map((product) => (
              <div className="carousel-item" key={product.id}>
                <div className="text-section">
                  <p className="bodyType">{product.bodyType.toUpperCase()}</p>
                  <p>
                    <span className="name" style={{ fontWeight: "bold" }}>
                      {product.modelName}
                    </span>{" "}
                    <span className="type">{product.modelType}</span>
                  </p>
                </div>
                <img
                  src={product.imageUrl}
                  alt={product.modelName}
                  className="product-image"
                />
                <div className="actions">
                  <Link to={`/learn/${product.id}`} className="link">
                    LEARN &gt;
                  </Link>
                  <Link to={`/shop/${product.id}`} className="link">
                    SHOP &gt;
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </Slider>
      <div className="carousel-controls">
        <button onClick={handlePrev}>&lt;</button>
        <button onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
};

export default Carousel;
