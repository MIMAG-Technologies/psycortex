import React, { useRef, useEffect } from "react";
import jsonData from "./UniqueFeatures.json";
import { useParams } from "react-router-dom";
import "./UniqueFeatures.css";

function UniqueFeature() {
  const { section } = useParams();
  const sectionData = jsonData[section];
  const observedElements = useRef([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [section]);

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

  return (
    <div id="UniqueFeature" key={section}>
      <div
        className="breadcrumb"
        ref={(el) => el && observedElements.current.push(el)}
      >
        <i className="fa-solid fa-house"></i>

        {" > " + sectionData?.breadcrumb}
      </div>
      <div className="section1">
        <div>
          <h1 ref={(el) => el && observedElements.current.push(el)}>
            {sectionData?.title}
          </h1>
          <h3 ref={(el) => el && observedElements.current.push(el)}>
            {sectionData?.subtitle1}
          </h3>
          <div>
            <div>
              <p
                key={section}
                ref={(el) => el && observedElements.current.push(el)}
              >
                {sectionData?.p11}
              </p>
              <p
                key={section}
                ref={(el) => el && observedElements.current.push(el)}
              >
                {sectionData?.p12}
              </p>
            </div>
            <div>
              <p
                key={section}
                ref={(el) => el && observedElements.current.push(el)}
              >
                {sectionData?.p13}
              </p>
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/assets/Images/Unique Features/${sectionData?.s1img}`
                }
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="section2">
        <div>
          <div>
            <h1 ref={(el) => el && observedElements.current.push(el)}>
              {sectionData.subtitle2}
            </h1>
            <p
              key={section}
              ref={(el) => el && observedElements.current.push(el)}
            >
              {sectionData.p21}
            </p>
            <p
              key={section}
              ref={(el) => el && observedElements.current.push(el)}
            >
              {sectionData.p22}
            </p>
          </div>

          <video
            playsInline
            autoPlay
            loop
            muted
            key={section}
            ref={(el) => el && observedElements.current.push(el)}
          >
            <source
              src={
                process.env.PUBLIC_URL +
                `/assets/Videos/Unique Features/${sectionData?.s2vid}`
              }
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default UniqueFeature;
