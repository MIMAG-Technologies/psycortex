import React, { useRef, useEffect } from "react";

function Acheivements() {
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
  return (
    <div id="Acheivements">
      <h1 ref={(el) => el && observedElements.current.push(el)}>
        Our Acheivements
      </h1>
      <div>
        <div
          ref={(el) => el && observedElements.current.push(el)}
          className="one-special-acheivement"
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/Images/AboutUs/Awards/certificate4.jpeg`}
            alt=""
          />
          <div>
            <p ref={(el) => el && observedElements.current.push(el)}>
              Dr. Vijay Dwivedi was recently honored with a distinguished
              certificate from the WNHO INSTITUTE OF SEXOLOGY, acknowledging his
              remarkable accomplishment in earning a Ph.D. in Sexology and
              Psychosexual Counseling. This achievement underscores Dr.
              Dwivedi's unwavering dedication, profound expertise, and steadfast
              commitment to the counseling domain.
            </p>
          </div>
        </div>
        <div
          ref={(el) => el && observedElements.current.push(el)}
          className="one-acheivement"
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/Images/AboutUs/Awards/certificate2.jpg`}
            alt=""
          />
          <div>
            <p ref={(el) => el && observedElements.current.push(el)}>
              Dr. Vijay Dwivedi was proudly awarded a prestigious certificate by
              the International College of Teachers and Trainers, recognizing
              his outstanding achievement in completing the rigorous Diploma in
              Child Psychology. This accomplishment stands as a testament to Dr.
              Dwivedi's dedication, expertise, and commitment to the field of
              counseling.
            </p>
          </div>
        </div>
        <div
          ref={(el) => el && observedElements.current.push(el)}
          className="one-acheivement"
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/Images/AboutUs/Awards/certificate6.jpeg`}
            alt=""
          />
          <div>
            <p ref={(el) => el && observedElements.current.push(el)}>
              Dr. Vijay Dwivedi received a distinguished certificate from Dega
              Institute and Clinevomedvidya, recognizing his remarkable
              accomplishment in successfully completing the Master Class in
              Clinical Sexology. This achievement underscores Dr. Dwivedi's
              unwavering dedication, expertise, and commitment to the field of
              counseling.
            </p>
          </div>
        </div>
        <div
          ref={(el) => el && observedElements.current.push(el)}
          className="one-acheivement"
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/Images/AboutUs/Awards/certificate1.jpg`}
            alt=""
          />
          <div>
            <p ref={(el) => el && observedElements.current.push(el)}>
              Dr. Vijay Dwivedi was proudly honored with a prestigious
              certificate by the International College of Teachers and Trainers,
              acknowledging his exceptional achievement in completing the
              rigorous Diploma in Counseling. This accomplishment is a testament
              to Dr. Dwivedi's dedication, expertise, and unwavering commitment
              to the counseling profession.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Acheivements;
