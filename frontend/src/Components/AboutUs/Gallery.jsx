import React, { useEffect, useRef } from "react";

function Gallery() {
  const observedElements = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transform = "scale(1)";
            entry.target.style.opacity = "1";
          } else {
            entry.target.style.transform = "scale(0.95)";
            entry.target.style.opacity = "0";
          }
        });
      },
      { threshold: 0.1 }
    );

    observedElements.current.forEach((el) => {
      if (el) {
        // Ensure element is valid before observing
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  const images = [
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (1).jpg",
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (2).jpg",
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (3).jpg",
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (4).jpg",
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (5).jpg",
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (6).jpg",
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (7).jpg",
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (8).jpg",
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (9).jpg",
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (10).jpg",
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (11).jpg",
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (12).jpg",
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (13).jpg",
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (14).jpg",
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (15).jpg",
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (16).jpg",
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (17).jpg",
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (18).jpg",
    "/assets/Images/AboutUs/Gallery Images/Gallery-img- (19).jpg",
  ];

  const halfLength = Math.ceil(images.length / 2);
  const leftImages = images.slice(0, halfLength);
  const rightImages = images.slice(halfLength);

  return (
    <div className="Gallery">
      <div className="gall-lhs">
        {leftImages.map((image, index) => (
          <img
            src={image}
            alt={`Gallery ${index + 1}`}
            key={index}
            ref={(el) => el && observedElements.current.push(el)}
          />
        ))}
      </div>
      <div className="gall-rhs">
        {rightImages.map((image, index) => (
          <img
            src={image}
            alt={`Gallery ${index + 1 + halfLength}`}
            key={index}
            ref={(el) => el && observedElements.current.push(el)}
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
