import React, { useEffect, useState } from "react";

function OurGallery() {
  const [counter, setCounter] = useState(0);

  const imgarr = [
    "/assets/Images/Testimonials/OurGallery/photo2.jpeg",
    "/assets/Images/Testimonials/OurGallery/photo3.jpeg",
    "/assets/Images/Testimonials/OurGallery/photo4.jpeg",
    "/assets/Images/Testimonials/OurGallery/photo5.jpeg",
    "/assets/Images/Testimonials/OurGallery/photo6.jpeg",
    "/assets/Images/Testimonials/OurGallery/photo7.jpeg",
    "/assets/Images/Testimonials/OurGallery/photo8.jpeg",
    "/assets/Images/Testimonials/OurGallery/photo9.jpeg",
    "/assets/Images/Testimonials/OurGallery/photo10.jpeg",
    "/assets/Images/Testimonials/OurGallery/photo11.jpeg",
    "/assets/Images/Testimonials/OurGallery/photo12.jpeg",
  ];

  const nextFunc = () => {
    if (counter < imgarr.length - 1) {
      setCounter(counter + 1);
    }
  };

  const prevFunc = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  useEffect(() => {
    // Increment the counter every 8 seconds
    const interval = setInterval(() => {
      if (counter < imgarr.length - 1) {
        setCounter(counter + 1);
      } else {
        // Reset counter to 0 when reaching the last slide
        setCounter(0);
      }
    }, 4000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [counter, imgarr.length]);

  return (
    <div id="OurGallery">
      <div className="corausol">
        <i className="fa-solid fa-angle-right next" onClick={nextFunc}></i>
        <i className="fa-solid fa-angle-left prev" onClick={prevFunc}></i>
        {imgarr.map((photo, index) => (
          <div style={{ transform: `translateX(${-counter * 100}%)` }}>
            <img src={photo} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurGallery;
