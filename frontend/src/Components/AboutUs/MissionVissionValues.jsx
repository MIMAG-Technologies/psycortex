import React, { useEffect } from "react";

function MissionVissionValues() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div id="MissionVissionValues">
      <div className="breadcrumb">
        <i className="fa-solid fa-house"></i>
        {" > About Us > Mission Vission and Values"}{" "}
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
              Psycortex Pvt. Ltd. is dedicated to revolutionizing mental health
              care by providing innovative, accessible, and evidence-based
              solutions to enhance the well-being of individuals worldwide. Our
              mission is to empower individuals to lead fulfilling lives by
              addressing mental health challenges through personalized
              treatment, cutting-edge technology, and compassionate support. We
              strive to break down barriers to mental health care, fostering a
              culture of understanding, acceptance, and proactive intervention.
              Through continuous research, education, and collaboration, we aim
              to redefine the landscape of mental health, ensuring that everyone
              has the opportunity to thrive mentally, emotionally, and
              psychologically.
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
              At Psycortex Pvt. Ltd., our vision is to create a world where
              mental health is prioritized, destigmatized, and readily
              accessible to all. We envision a future where individuals feel
              empowered to seek help without fear or judgment, where mental
              health care is integrated seamlessly into everyday life, and where
              innovative solutions lead to lasting improvements in well-being.
              Through our commitment to excellence, compassion, and inclusivity,
              we aspire to be leaders in the field of mental health, driving
              forward progress, and inspiring positive change on a global scale.
              We envision a society where mental health is recognized as a
              fundamental aspect of overall health and where every individual
              has the opportunity to live their best life, free from the
              constraints of mental illness.
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
              At Psycortex Pvt. Ltd., our values serve as the foundation of
              everything we do. Integrity guides our actions as we prioritize
              honesty, transparency, and ethical conduct in all interactions.
              Compassion is at the heart of our approach, as we strive to create
              a supportive and empathetic environment where individuals feel
              heard, understood, and valued. Innovation drives our commitment to
              constantly push the boundaries of what is possible in mental
              health care, seeking out new solutions and technologies to better
              serve our clients. Collaboration is essential to our success, as
              we recognize the importance of working together with clients,
              colleagues, and communities to achieve our shared goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissionVissionValues;
