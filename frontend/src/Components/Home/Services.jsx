import React, { useState } from "react";
import { Link } from "react-router-dom";

function HomeServices() {
  const [sections, setSections] = useState([
    {
      title: "Cognitive Behavior Therapy",
      bg: `${process.env.PUBLIC_URL}/assets/Images/Home/service1.jpg`,
      info: "Cognitive Behavioral Therapy (CBT) offers valuable support for individuals experiencing a range of emotional and psychological challenges. It assists individuals in managing their moods, alleviating anxiety, addressing depression, coping with issues related to alcohol and drug use, navigating marital difficulties, managing eating disorders, and coping with severe mental illnesses.",
      active: true,
      to: "/uniquefeature/cbt",
    },
    {
      title: "Stress Management",
      bg: `${process.env.PUBLIC_URL}/assets/Images/Home/service2.png`,
      info: "This therapeutic intervention aims to assist individuals in effectively managing their occupational stressors and fulfilling their professional duties, ultimately contributing to their overall sense of happiness and well-being. By employing various techniques and strategies within this therapy, individuals are empowered to navigate the challenges presented by their work environment with greater ease and resilience. ",
      active: false,
      to: "/uniquefeature/stressmanagementcounselling",
    },
    {
      title: "Alcohol & Drug De-addiction",
      bg: `${process.env.PUBLIC_URL}/assets/Images/Home/service3.jpg`,
      info: "The primary goal of drug treatment is to provide support and assistance to individuals struggling with addiction, helping them break free from the cycle of compulsive drug seeking and usage. Through comprehensive treatment approaches, individuals are equipped with the tools and resources necessary to overcome their dependence on substances. By addressing the underlying factors contributing to addiction and implementing personalized treatment plans .",
      active: false,
      to: "/services/psychologicalcounselling/substanceabuseoraddictioncounselling",
    },
    {
      title: "Memory Management",
      bg: `${process.env.PUBLIC_URL}/assets/Images/Home/service4.jpg`,
      info: "Engaging in regular physical activity has numerous benefits for your overall health, one of which is the enhancement of blood circulation throughout your entire body, including the brain. This increased blood flow plays a crucial role in supporting cognitive function and may contribute to maintaining optimal memory function. By promoting greater blood flow to the brain, physical activity serves as a valuable means of preserving cognitive sharpness .",
      active: false,
      to: "/services/psychologicaltesting/intelligencebuildingprogram",
    },
    {
      title: "Career Counselling",
      bg: `${process.env.PUBLIC_URL}/assets/Images/Home/service5.jpg`,
      info: "Career counseling is a specialized service to assist individuals in navigating career exploration. Counselors use assessments, discussions, and guidance to identify strengths, interests, and aptitudes. This process provides insight into potential career pathways aligning with skills, values, and aspirations, aiding informed decision-making. Career counseling offers invaluable support, equipping individuals with tools to pursue fulfilling careers .",
      active: false,
      to: "/uniquefeature/careercounseling",
    },
    {
      title: "Anger Management",
      bg: `${process.env.PUBLIC_URL}/assets/Images/Home/service6.jpg`,
      info: "Anger management counseling is a comprehensive therapeutic approach meticulously crafted to guide individuals through an introspective journey aimed at understanding and effectively managing the complexities of their anger and its pervasive ramifications. Through this process, participants are empowered to delve deep into their emotional landscape, unraveling the interplay of triggers, underlying emotions, and behavioral responses associated with anger.",
      active: false,
      to: "/uniquefeature/anxietycounseling",
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
