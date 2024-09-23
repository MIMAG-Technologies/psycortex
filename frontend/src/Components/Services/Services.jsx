import React, { useRef, useEffect } from "react";
import "./Services.css";
import jsonData from "./Services.json";
import { useParams } from "react-router-dom";

function Services() {
  const { section, subsection } = useParams();
  const sectionData = jsonData[section][subsection];
  const observedElements = useRef([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [subsection]);

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
  }, []); // Ensure useEffect runs whenever sectionData changes

  const randomImage = Math.floor(Math.random() * 5) + 1;
  const imageUrl = `${process.env.PUBLIC_URL}/assets/Images/Services/${section}/img${randomImage}.jpg`;

  return (
    <div id="Services" key={subsection}>
      <div className="breadcrumb">
        <i className="fa-solid fa-house"></i>

        {` > ` + sectionData.breadcrumb}
      </div>
      <div className="sec1">
        <h1 ref={(el) => el && observedElements.current.push(el)}>
          {sectionData.title}
        </h1>
        <p ref={(el) => el && observedElements.current.push(el)}>
          {sectionData.p1}
        </p>
        <p ref={(el) => el && observedElements.current.push(el)}>
          {sectionData.p2}
        </p>
        <p ref={(el) => el && observedElements.current.push(el)}>
          {sectionData.p3}
        </p>
      </div>
      <div
        key={subsection}
        className="sec2"
        style={{
          background: `url(${imageUrl}) center / cover fixed`,
        }}
      >
        <div>
          <span ref={(el) => el && observedElements.current.push(el)}>
            <i className="fa-solid fa-quote-left"></i>
            {sectionData.quote}
            <i className="fa-solid fa-quote-right"></i>
          </span>
          <span
            className="author"
            ref={(el) => el && observedElements.current.push(el)}
          >
            -{sectionData.writer}
          </span>
        </div>
      </div>

      <div
        className="sec3"
        style={{
          backgroundColor:
            section === "psychologicalcounselling"
              ? "#0f1e6d"
              : section === "sexologycounselling"
              ? "#416d19"
              : section === "corporate"
              ? "#fba748"
              : "#492e87",
        }}
      >
        <div>
          <h3 ref={(el) => el && observedElements.current.push(el)}>
            {sectionData.title + " at Psycortex Pvt. Ltd"}
          </h3>
          <p ref={(el) => el && observedElements.current.push(el)}>
            {sectionData.p4}
          </p>
          <p ref={(el) => el && observedElements.current.push(el)}>
            {sectionData.p5}
          </p>
          <p ref={(el) => el && observedElements.current.push(el)}>
            {sectionData.p6}
          </p>
          <p ref={(el) => el && observedElements.current.push(el)}>
            {sectionData.p7}
          </p>
          <p ref={(el) => el && observedElements.current.push(el)}>
            {sectionData.p8}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;
