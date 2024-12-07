import React, { useState } from "react";

const OneFAQ = ({ faq, index, toggleFAQ }) => {
  return (
    <div
      className={"faq " + (faq.open ? "open" : "")}
      key={index}
      onClick={() => toggleFAQ(index)}
    >
      <div className="faq-question">{faq.question}</div>
      <div className="faq-answer">{faq.answer}</div>
    </div>
  );
};

export default function FAQ() {
  const [faqs, setFaqs] = useState([
    {
      question: "How do I know if the psychologist is right for me?",
      answer:
        "Our team of licensed professionals specializes in a variety of challenges, ensuring personalized and effective care.",
      open: false,
    },
    {
      question: "Can I choose between online and offline sessions?",
      answer:
        "Yes, we offer both options so you can choose what’s most comfortable and convenient for you.",
      open: false,
    },
    {
      question: "How soon will I see results?",
      answer:
        "Many clients feel an improvement within the first few sessions, though results may vary based on individual needs.",
      open: false,
    },
    {
      question: "How do I know therapy will work for me?",
      answer:
        "Therapy is a collaborative process tailored to your unique needs. Our experts use proven techniques to help you achieve your goals.",
      open: false,
    },
    {
      question: "What can I expect in my first session?",
      answer:
        "Your first session focuses on understanding your concerns, setting goals, and creating a personalized plan for your journey.",
      open: false,
    },
    {
      question: "Are sessions confidential?",
      answer:
        "Absolutely! We prioritize your privacy, ensuring all conversations remain strictly confidential.",
      open: false,
    },

    {
      question: "How long does a typical session last?",
      answer:
        "Each session typically lasts 50-60 minutes, allowing enough time to explore your concerns.",
      open: false,
    },
    {
      question: "What kind of issues can I bring to therapy?",
      answer:
        "We address a range of challenges, including anxiety, depression, relationship issues, career dilemmas, and more.",
      open: false,
    },
    {
      question: "How many sessions will I need?",
      answer:
        "The number of sessions varies based on individual goals and progress. Your therapist will discuss this with you during your journey.",
      open: false,
    },
    {
      question: "What makes your services different?",
      answer:
        "Our approach combines expert care, affordability, and personalized strategies to ensure you feel supported and valued.",
      open: false,
    },
    {
      question: "What qualifications do your psychologists have?",
      answer:
        "All our psychologists are highly qualified with certifications in clinical psychology and years of experience helping clients.",
      open: false,
    },
    {
      question: "Can I reschedule my session?",
      answer:
        "Yes, we offer flexible scheduling. Simply notify us 24 hours in advance to reschedule.",
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      })
    );
  };

  return (
    <div>
      <h1>
        Need Help? We've Got You
        <span> Fully Covered</span>
      </h1>
      <div className="faqs">
        {faqs.map((faq, index) => (
          <OneFAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
        ))}
      </div>
    </div>
  );
}
