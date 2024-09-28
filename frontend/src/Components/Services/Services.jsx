import React, { useRef, useEffect } from "react";
import "./Services.css";
import jsonData from "./Services.json";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

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
  // const imageUrl = `${process.env.PUBLIC_URL}/assets/Images/Services/${section}/img${randomImage}.jpg`;
  const imageUrl = `${process.env.PUBLIC_URL}/assets/Images/Services/${subsection}.jpg`;

  return (
    <div id="Services" key={subsection}>
      <Helmet>
        <title> {sectionData.title}</title>
        <meta name="description" content={sectionData.p1} />
      </Helmet>
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
            section === "counsellingservices"
              ? "#B0BEC5" // Darkened Blue-Grey
              : section === "psychotherapyapproaches"
              ? "#B2DDD7" // Darkened Soft Teal
              : section === "assessmentandtesting"
              ? "#E5D3B3" // Darkened Ivory
              : section === "careerandskillsdevelopment"
              ? "#D2BA70" // Darkened Pale Gold
              : section === "uniquefeatures"
              ? "#F1D5B3" // Darkened Light Peach
              : "#492e87", // Default (Fallback) color
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

          <Link to={"/booking"} class="button">
            Start Your Journey
            <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
              <path
                clip-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Services;
