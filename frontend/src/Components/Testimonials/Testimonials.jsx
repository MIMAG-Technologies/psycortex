import React, { useEffect, useRef } from "react";
import "./Testimonial.css";
import data from "./Testimonial.json";
import OurGallery from "./OurGallery";

function Testimonials() {
  const observedElements = useRef([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transform = "scale(1)";
            entry.target.style.opacity = "1";
          } else {
            entry.target.style.transform = "scale(0.85)";
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
  const oneTestmonial = (ele) => {
    return (
      <div
        className="onetestimonial"
        key={ele.name}
        ref={(el) => el && observedElements.current.push(el)}
      >
        <i className="fa-solid fa-quote-right"></i>
        <p>{ele.msg}</p>
        <h3>{ele.name}</h3>
        <h4>{ele.role}</h4>
      </div>
    );
  };

  return (
    <>
      <div id="Testimonials">
        <div className="header">
          <h1>Testimonials</h1>
        </div>
        <h1 ref={(el) => el && observedElements.current.push(el)}>
          What Our Clients Say
        </h1>
        <h2>
          <span
            ref={(el) => el && observedElements.current.push(el)}
            className="line"
          ></span>
          Clients's Review
          <span className="line"></span>
        </h2>
        <div className="all-testimonialdiv">
          {data.map((ele) => oneTestmonial(ele))}
        </div>
        <h1 ref={(el) => el && observedElements.current.push(el)}>
          Our Gallery
        </h1>
        <h2>
          <span
            ref={(el) => el && observedElements.current.push(el)}
            className="line"
          ></span>
          Our Memorable Moments
          <span className="line"></span>
        </h2>
      </div>
      <OurGallery />
    </>
  );
}

export default Testimonials;
