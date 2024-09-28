import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

function MissionVissionValues() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div id="MissionVissionValues">
      <Helmet>
        <title>Mission, Vision & Values at Psycortex</title>
        <meta
          name="description"
          content="Understand the mission, vision, and values driving Psycortex. Learn how we are committed to excellence in mental health and community support."
        />
      </Helmet>
      <div className="breadcrumb">
        <i className="fa-solid fa-house"></i>{" "}
        {" > About Us > Mission Vision and Values"}
      </div>

      <div className="missionvv_cards">
        <div
          className="card"
          style={{
            background: `url(${
              process.env.PUBLIC_URL +
              "/assets/Images/AboutUs/MissionVissionAndValues/mission.jpg"
            }) center / cover`,
          }}
        >
          <span>MISSION</span>
          <div className="card__content">
            <p className="card__title">Mission</p>
            <p className="card__description">
              Psycortex connects individuals to essential mental well-being
              through compassionate, reliable, and affordable online mental
              health services. We strive to make mental health care accessible
              to all, ensuring that every individual has the support they need
              at the right time. Our mission is to break the barriers of stigma,
              and to provide a safe and welcoming environment for all, fostering
              mental resilience and emotional well-being.
            </p>
          </div>
        </div>

        <div
          className="card"
          style={{
            background: `url(${
              process.env.PUBLIC_URL +
              "/assets/Images/AboutUs/MissionVissionAndValues/vision.jpg"
            }) center / cover`,
          }}
        >
          <span>VISION</span>
          <div className="card__content">
            <p className="card__title">Vision</p>
            <p className="card__description">
              To be the most trusted and widely accessed online platform for
              impactful mental health and wellness support. We envision a future
              where mental health services are universally accessible, helping
              individuals overcome challenges and live empowered lives.
              Psycortex aims to integrate mental health into everyday life
              through innovation, ensuring that support is never far away when
              it's needed most.
            </p>
          </div>
        </div>

        <div
          className="card"
          style={{
            background: `url(${
              process.env.PUBLIC_URL +
              "/assets/Images/AboutUs/MissionVissionAndValues/values.jpg"
            }) center / cover`,
          }}
        >
          <span>VALUES</span>
          <div className="card__content">
            <p className="card__title">Values</p>
            <p className="card__description">
              At Psycortex, we believe in compassion, reliability, transparency,
              innovation, and inclusivity as core values in providing mental
              health support. We are committed to delivering mental health care
              that not only meets the highest standards but also prioritizes
              trust and empathy. Our innovative approaches allow us to stay at
              the forefront of mental health solutions, and our inclusive
              mindset ensures that we serve people from all walks of life.
            </p>
          </div>
        </div>

        <div
          className="card "
          style={{
            background: `url(${
              process.env.PUBLIC_URL +
              "/assets/Images/AboutUs/MissionVissionAndValues/motto.jpg"
            }) center / cover`,
          }}
        >
          <span>MOTTO</span>
          <div className="card__content">
            <p className="card__title">Motto</p>
            <p className="card__description">
              Reliable Support, Empowered Minds. Our motto encapsulates our
              belief that with consistent and dependable mental health support,
              individuals can take control of their well-being and lead
              fulfilling, empowered lives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissionVissionValues;
