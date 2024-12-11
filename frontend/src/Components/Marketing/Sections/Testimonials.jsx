import { useState } from "react";

function NewTestimonials() {
  const [isHovered, setIsHovered] = useState(false);
  const testimonialData = [
    {
      name: "Rohini S.",
      job: "Anxiety Counseling Client",
      message:
        "I was skeptical at first, but therapy with Psycortex changed my life. I feel heard, supported, and finally on the path to healing.",
    },
    {
      name: "Amit & Neha",
      job: "Marital Counseling Clients",
      message:
        "Our relationship was on the brink, but couples counseling helped us rebuild trust and love. Highly recommend!",
    },
    {
      name: "Raj M.",
      job: "Career Counseling Client",
      message:
        "This team truly cares. From the first session, I felt lighter and more confident about my career choices.",
    },
    {
      name: "Anamika Debnath",
      job: "Mental Health Client",
      message:
        "He encouraged me to focus on health and explore new experiences. I’m so grateful for his guidance and support.",
    },
    {
      name: "Vijayshree Joshi",
      job: "Health Counseling Client",
      message:
        "The counseling services are excellent. His knowledge and care have been truly impactful. Thank you so much!",
    },
    {
      name: "Ramesh B",
      job: "Marital Counseling Client",
      message:
        "The sessions transformed my life, especially my marriage. Dr. Kumar gave me a new perspective. Highly recommend!",
    },
  ];

  const oneTestimonialCard = (person) => {
    return (
      <div
        className="oneTestimonialCard"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div>
          <img src="/assets/Images/Marketing/profile-pic.png" alt="" />
          <span>
            <h4>{person.name}</h4>
            <p>{person.job}</p>
          </span>
        </div>
        <h4>{person.message}</h4>
      </div>
    );
  };

  return (
    <div className="NewTestimonials">
      <h1>Client Testimonials</h1>
      <div className={`alltestmonials ${isHovered ? "hovered" : ""}`}>
        <div className="one-row">
          {testimonialData.map((person) => {
            return oneTestimonialCard(person);
          })}
          {testimonialData.map((person) => {
            return oneTestimonialCard(person);
          })}
        </div>
      </div>
    </div>
  );
}

export default NewTestimonials;
