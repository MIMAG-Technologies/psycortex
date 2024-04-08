import React, { useState, useEffect } from "react";
function LandingPage() {
  const whatsAppLink = 'https://wa.me/7249424403?text="" ';

  const titleArr = ["Mental Health", "Indian Psychology", "Drug De-Addiction"];
  const infoArry = [
    "Through personalized sessions with trained professionals, individuals can learn effective coping strategies to navigate the challenges of daily life. These sessions often involve identifying stressors, exploring underlying emotions, and developing practical techniques such as relaxation exercises, mindfulness, and cognitive restructuring.",
    "Indian psychology offers a unique perspective on mental health that integrates ancient wisdom with modern practices. Rooted in ancient texts like the Vedas, Upanishads, and Yoga Sutras, Indian psychology emphasizes holistic well-being encompassing the mind, body, and spirit. Concepts such as Ayurveda, yoga, and meditation are central to promoting mental health by addressing the interconnectedness of physical and psychological states.",
    "Drug de-addiction counseling offers a lifeline to individuals grappling with substance abuse and addiction. Through compassionate guidance and evidence-based interventions, counselors facilitate the journey towards recovery. They work collaboratively with clients to explore the root causes of addiction, address underlying emotional issues, and develop personalized strategies for managing cravings and triggers.",
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
        <div>
          <h1>Psychological Therapy</h1>
          <h2>{titleArr[index]}</h2>
          <p>{infoArry[index]}</p>
        </div>
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
