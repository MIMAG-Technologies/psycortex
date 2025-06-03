import React from "react";
import { Link } from "react-router-dom";

function HomeServices() {
  const sections = [
    {
      title: "Get Matched to the Right Therapist",
      icon: "fa-user-md",
      info: "Answer a few personalized questions and get matched with a therapist who aligns with your needs and preferences. Access our network of credentialed professionals for support.",
      to: "#",
    },
    {
      title: "Choose Your Communication Method",
      icon: "fa-comments",
      info: "Select how you want to connect: text, chat, phone, or video. Communicate in the way that feels most comfortable and convenient for you at any time.",
      to: "#",
    },
    {
      title: "Schedule at Your Convenience",
      icon: "fa-calendar-alt",
      info: "Book live sessions at times that fit your schedule. Message your therapist anytime and join sessions from any device, whether you’re at home or on the go.",
      to: "#",
    },
    {
      title: "Start Your Journey to Mental Wellness",
      icon: "fa-brain",
      info: "Begin your personalized therapy sessions and experience a transformative approach to mental wellness with evidence-based care and ongoing support.",
      to: "#",
    },
  ];

  return (
    <div id="HomeServices" className="services-redesign">
      <div className="services-container">
        <h1 className="services-title">HOW IT WORKS</h1>

        <div className="services-circles">
          {sections.map((section, index) => (
            <div className="service-circle-container" key={index}>
              <Link to={section.to} className="service-circle">
                <div className="circle-icon">
                  <i className={`fas ${section.icon}`}></i>
                </div>
                <h3>{section.title}</h3>
              </Link>
              <div className="service-description">
                <p>{section.info}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeServices;
