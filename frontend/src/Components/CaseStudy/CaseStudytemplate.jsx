import React, { useEffect, useRef } from "react";
import jsonData from "./CaseStudy.json";
import { useParams } from "react-router-dom";

function CaseStudytemplate() {
  const { section } = useParams();
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
  const casestudy = jsonData.find((item) => item.searchkey === section);
  if (!casestudy) {
    return "NO BLOG FOUND";
  }
  return (
    <div className="One-Blog">
      <h1
        ref={(el) => el && observedElements.current.push(el)}
        style={{ fontSize: "2.4em" }}
      >
        {casestudy.title}
      </h1>
      <div>
        <p ref={(el) => el && observedElements.current.push(el)}>
          {casestudy.by}
        </p>
      </div>
      <img
        ref={(el) => el && observedElements.current.push(el)}
        src={casestudy.img}
        alt=""
      />
      {casestudy.content.map((item, index) => {
        if (item.tag === "img") {
          return (
            <img
              ref={(el) => el && observedElements.current.push(el)}
              key={index}
              src={item.src}
              alt=""
            />
          );
        } else if (item.tag === "h2") {
          return (
            <h2
              ref={(el) => el && observedElements.current.push(el)}
              key={index}
            >
              {item.text}
            </h2>
          );
        } else if (item.tag === "p") {
          return (
            <p
              ref={(el) => el && observedElements.current.push(el)}
              key={index}
              style={{ marginLeft: `${item.level === "2" ? "1em" : "0px"}` }}
            >
              {item.text}
            </p>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default CaseStudytemplate;
