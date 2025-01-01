import React, { useState } from "react";
import arrow from "../../assets/images/home/arrow.svg";
function FAQ() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const faqs = [
    {
      question: "What is SportTrackr?",
      answer:
        "SportTrackr is an app designed for players, coaches, and organizers to stay connected, track progress, and enhance their sports experience.",
    },
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking on the 'Sign Up' button on the homepage and filling in the required details.This can be done through the mobile app or through our website.",
    },
    {
      question: "Is SportTrackr free to use?",
      answer:
        "Yes, SportTrackr is free to use. However, charges apply when creating a team, with the pricing set by the league organizers.",
    },
    {
      question: "Can I join multiple leagues?",
      answer:
        "Once a season begins and you’re part of a team, you’ll remain with that team for the duration of the season. However, you can join a different league once the season concludes.",
    },
    {
      question: "How does SportTrackr handle my data?",
      answer:
        "We take data privacy seriously and ensure all personal information is securely stored and used only as per our privacy policy.",
    },
  ];

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="faq-item"
            onClick={() => toggleQuestion(index)}
          >
            <div className="faq-question">
              <h4>{faq.question}</h4>
              <button
                className={`faq-arrow ${
                  activeQuestion === index ? "faq-up" : ""
                }`}
              >
                <img src={arrow} alt="arrow" />
              </button>
            </div>
            <div
              className={`faq-answer ${
                activeQuestion === index ? "selected" : ""
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
