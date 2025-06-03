import React, { useState, useEffect } from "react";
function LandingPage() {
  const whatsAppLink = "https://wa.me/+918767027078?text=";

  const titleArr = [
    "Mental Wellness Support",
    "Indian Psychological Perspectives",
    "Career Guidance and Counseling",
  ];
  const infoArry = [
    "Our personalized sessions with trained professionals provide individuals with strategies to manage daily life challenges. These sessions involve identifying sources of stress, understanding emotions, and practicing techniques such as relaxation, mindfulness, and cognitive approaches to enhance well-being.",
    "Indian psychology integrates ancient wisdom with modern approaches to mental wellness. Drawing from texts like the Vedas, Upanishads, and Yoga Sutras, it emphasizes a holistic approach, combining practices like Ayurveda, yoga, and meditation to support the balance of mental and physical well-being.",
    "Psycortex Pvt. Ltd. offers tailored guidance to help individuals navigate career challenges, make informed decisions, and achieve professional growth. Our services are grounded in psychological insights, customized to meet the unique needs and goals of each client, empowering them to succeed in the workplace.",
  ];

  const bgArr = [
    `${process.env.PUBLIC_URL}/assets/Images/Home/service1.webp`,
    `${process.env.PUBLIC_URL}/assets/Images/Home/service2.png`,
    `${process.env.PUBLIC_URL}/assets/Images/Home/service3.jpg`,
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % titleArr.length);
    }, 8000);

    return () => clearInterval(intervalId);
  });

  return (
    <>
      <div
        id="LandingPage"
        style={{ background: `url(${bgArr[index]}) center/cover` }}
      >
        {/* <div>
          <h1>Psychological Therapy</h1>
          <h2>{titleArr[index]}</h2>
          <p>{infoArry[index]}</p>
        </div> */}
      </div>
      <a
        href={whatsAppLink}
        id="whatsapp-logo"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </>
  );
}

export default LandingPage;
