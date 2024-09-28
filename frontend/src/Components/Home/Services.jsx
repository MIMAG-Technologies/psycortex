import React, { useState } from "react";
import { Link } from "react-router-dom";

function HomeServices() {
  const [sections, setSections] = useState([
    {
      title: "Step 1: Get Matched to the Right Therapist",
      bg: `${process.env.PUBLIC_URL}/assets/Images/Home/service1.jpg`,
      info: "Answer a few personalized questions, and we will match you with the most suitable therapist who aligns with your specific needs and preferences. Tap into our extensive network of credentialled professionals.",
      active: true,
      to: "#",
    },
    {
      title: "Step 2: Choose Your Communication Method",
      bg: `${process.env.PUBLIC_URL}/assets/Images/Home/service2.png`,
      info: "Engage with your therapist in a way that’s comfortable for you. Whether through text, chat, phone, or video, you can select the method that best suits your needs.",
      active: false,
      to: "#",
    },
    {
      title: "Step 3: Schedule at Your Convenience",
      bg: `${process.env.PUBLIC_URL}/assets/Images/Home/service4.jpg`,
      info: "Book live sessions at a time that fits your schedule. You can communicate anytime with your therapist and access sessions from any device, whether on the go or at home.",
      active: false,
      to: "#",
    },
    {
      title: "Step 4: Start Your Journey to Mental Wellness",
      bg: `${process.env.PUBLIC_URL}/assets/Images/Home/service5.jpg`,
      info: "Begin your personalized therapy sessions and explore a transformative approach to mental wellness with our evidence-based interventions and compassionate care.",
      active: false,
      to: "#",
    },
  ]);
  const handleSectionHover = (index) => {
    const updatedSections = sections.map((section, i) => ({
      ...section,
      active: i === index,
    }));
    setSections(updatedSections);
  };

  return (
    <div
      id="HomeServices"
      style={{
        backgroundImage: `url(${
          sections.find((section) => section.active)?.bg
        })`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        className="info-tab"
        // ref={infoTabRef}
      >
        <h1>
          <i className="fas fa-lightbulb"></i>
          {"  "}HOW IT WORKS
        </h1>
        {sections.map((section, index) => (
          <React.Fragment key={index}>
            {section.active && (
              <>
                <h2>{section.title}</h2>
                <p>{section.info}</p>
              </>
            )}
          </React.Fragment>
        ))}
      </div>

      <ul
        className="intro-nav"
        // ref={introNavRef}
      >
        {sections.map((section, index) => (
          <Link
            to={section.to}
            key={index}
            style={
              section.active
                ? {
                    fontSize: "25px",
                    borderBottom: "2px solid  #a536f3",
                  }
                : {}
            }
            onMouseEnter={() => handleSectionHover(index)}
          >
            {section.title}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default HomeServices;
