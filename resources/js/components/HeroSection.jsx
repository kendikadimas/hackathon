import React, { useState, useEffect } from "react";

const images = ["/spanduk.png", "/spanduk2.png", "/spanduk3.png"];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full mt-4 px-6">
      <div className="max-w-screen-xl mx-auto relative h-[600px] rounded-xl overflow-hidden shadow-md">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Spanduk ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000
              ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
