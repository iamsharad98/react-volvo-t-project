import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../models/Product";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Carousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  const sliderRef = useRef<any>(null);

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
    if (sliderRef) {
      sliderRef.current?.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderRef) {
      sliderRef.current?.slickNext();
    }
  };

  const settings = {
    dots: isMobile,
    infinite: false,
    speed: 500,
    slidesToShow: isMobile ? 1 : 4,
    slidesToScroll: 1,
    nextArrow: null,
    prevArrow: null,
    initialSlide: 0,
  };

  return (
    <div className="w-3/4 m-auto relative mt-8">
      <Slider {...settings} ref={sliderRef}>
        {products.map((product) => (
          <div className="carousel-item bg-white p-4 mt-4" key={product.id}>
            <div className="text-section">
              <p className="text-[14px] text-gray-500 uppercase">
                {product.bodyType}
              </p>
              <p className="text-[14px] font-semibold">
                <span className="font-bold">{product.modelName}</span>{" "}
                <span className="text-gray-400">{product.modelType}</span>
              </p>
            </div>
            <div>
              <img
                src={product.imageUrl}
                alt={product.modelName}
                className="w-auto h-full max-w-full max-h-[250px]"
              />
            </div>
            <div className="actions flex gap-4 mt-4 justify-center items-center">
              <Link
                to={`/learn/${product.id}`}
                className="text-teal-blue text-sm hover:underline font-medium"
              >
                <div className="flex flex-row justify-center items-center">
                  <p>LEARN</p>
                  <img
                    src="/icons/chevron-small.svg"
                    alt="left-image"
                    className={`w-[12px] h-[12px] ml-1 transition duration-150 ease-in-out`}
                  />
                </div>
              </Link>
              <Link
                to={`/shop/${product.id}`}
                className="text-teal-blue text-sm hover:underline font-medium"
              >
                <div className="flex flex-row justify-center items-center">
                  <p>SHOP</p>
                  <img
                    src="/icons/chevron-small.svg"
                    alt="left-image"
                    className={`w-[12px] h-[12px] ml-1 transition duration-150 ease-in-out`}
                  />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </Slider>

      {!isMobile && (
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={handlePrev} className="w-10 h-10">
            <img
              src="/icons/chevron-circled.svg"
              alt="left-image"
              className={`transition duration-150 ease-in-out scale-x-[-1]`}
            />
          </button>
          <button onClick={handleNext} className="w-10 h-10">
            <img
              src="/icons/chevron-circled.svg"
              alt="right-image"
              className="transition duration-150 ease-in-out active:scale-90"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
