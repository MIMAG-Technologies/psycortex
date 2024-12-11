import { Quote } from "lucide-react";
import React from "react";

export default function WhoThisFor() {
  const whoThis = [
    {
      title: "Relationship Struggles",
      description:
        "Feeling stuck in your relationship or struggling to communicate with your partner.",
      imgSrc: "",
    },
    {
      title: "Constant Anxiety",
      description:
        "Experiencing constant worry, anxiety, or fear affecting your daily life.",
      imgSrc: "",
    },
    {
      title: "Battling Depression",
      description:
        "Battling feelings of sadness, hopelessness, or lack of motivation.",
      imgSrc: "",
    },
    {
      title: "Emotional Overload",
      description:
        "Having thoughts of self-harm or struggling with overwhelming emotions.",
      imgSrc: "",
    },
    {
      title: "Career Uncertainty",
      description:
        "Feeling uncertain about your career or seeking clarity in life decisions.",
      imgSrc: "",
    },
  ];

  return (
    <div className="WhoThisFor">
      <h1>
        Who Is This
        <span> For?</span>
      </h1>
      <p>
        <Quote className="quote" />
        Wondering if therapy is right for you? 
        <span>

        Here’s how to know:
        </span>
        <Quote className="quote" />
        </p>
      <div>
        {whoThis.map((item, index) => (
            <div key={index} className="who-this-item">
            <img
              src={`${process.env.PUBLIC_URL}/assets/Images/Marketing/${item.title}.jpg`}
              alt={item.title}
              />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <p>
<Quote className="quote" />
        If any of this resonates, you’re not alone – 
        <span>

        we’re here to help.
        </span>
<Quote className="quote" />
        </p>
    </div>
  );
}
