import React, { useState } from "react";
import { Link } from "react-router-dom";

function HomeServices() {
  const [sections, setSections] = useState([
    {
      title: "Cognitive Behavior Therapy",
      bg: `${process.env.PUBLIC_URL}/assets/Images/Home/service1.jpg`,
      info: "Cognitive Behavioral Therapy (CBT) offers support to individuals dealing with emotional and psychological difficulties. It helps manage moods, reduce anxiety, address feelings of sadness, and cope with various challenges, including relationship issues and habits related to alcohol or substance use.",
      active: true,
      to: "/uniquefeature/cbt",
    },
    {
      title: "Stress Management",
      bg: `${process.env.PUBLIC_URL}/assets/Images/Home/service2.png`,
      info: "This therapy supports individuals in managing work-related stress and improving their overall well-being. Through a variety of techniques, participants are encouraged to develop strategies that promote resilience and enhance their ability to manage challenges in the workplace.",
      active: false,
      to: "/uniquefeature/stressmanagementcounselling",
    },
    {
      title: "Memory Support",
      bg: `${process.env.PUBLIC_URL}/assets/Images/Home/service4.jpg`,
      info: "Regular physical activity can have positive effects on overall well-being, including cognitive function. Improved circulation, including to the brain, may support healthy memory. This underscores the importance of maintaining physical health to enhance mental clarity.",
      active: false,
      to: "/services/psychologicaltesting/intelligencebuildingprogram",
    },
    {
      title: "Career Counseling",
      bg: `${process.env.PUBLIC_URL}/assets/Images/Home/service5.jpg`,
      info: "Career counseling provides individuals with guidance as they explore different career options. Counselors offer insights based on strengths, interests, and aspirations to help clients make informed decisions and pursue fulfilling professional paths.",
      active: false,
      to: "/uniquefeature/careercounselling",
    },
    {
      title: "Anger Management",
      bg: `${process.env.PUBLIC_URL}/assets/Images/Home/service6.jpg`,
      info: "Anger management counseling is designed to help individuals understand and address their anger in a constructive way. By exploring emotional triggers and learning new coping mechanisms, participants can gain greater control over their emotional responses and enhance personal well-being.",
      active: false,
      to: "/uniquefeature/anxietycounselling",
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
          <i className="fa-solid fa-hand-holding-medical"></i> {"  "}OUR
          SERVICES
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
