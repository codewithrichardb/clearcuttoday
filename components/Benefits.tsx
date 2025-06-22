import React from "react";
import {
  FaHandsHelping,
  FaHeartBroken,
  FaSeedling,
  FaShieldAlt,
} from "react-icons/fa";

const benefits = [
  {
    name: "Heal",
    icon: <FaHeartBroken size={20} className="text-warning" />,
    content:
      "Gentle, guided support for processing heartbreak, family estrangement, and emotional wounds in a safe space.",
    color: "warning",
  },
  {
    name: "Protect",
    icon: <FaShieldAlt size={20} className="text-secondary" />,
    content:
      "Tools to establish healthy boundaries and protect your emotional wellbeing from toxic dynamics.",
    color: "secondary",
  },
  {
    name: "Rebuild",
    icon: <FaSeedling size={20} className="text-primary" />,
    content:
      "Restore your self-worth and confidence with evidence-based healing practices.",
    color: "primary",
  },
  {
    name: "Thrive",
    icon: <FaHandsHelping size={20} className="text-success" />,
    content:
      "Develop resilience and emotional clarity to build healthier relationships and a brighter future.",
    color: "success",
  },
];

function Benefits() {
  return (
    <section className="bg-light py-5" id="benefits">
      <div className="container">
        <div className="text-center">
          <span className="badge bg-primary rounded-5 p-2 px-3 my-3">
            THE JOURNEY
          </span>
        </div>
        <h2 className="my-2 text-center fw-semibold">
          Your Healing Journey, Your Way
        </h2>
        <p className="my-3 mb-5 text-center">
          A compassionate system that supports you through every stage of emotional recovery, no matter your story
        </p>
        <div className="row my-4">
          {benefits?.map((benefit, index) => (
            <React.Fragment key={benefit.name}>
              <div className="col-md-3 mb-3">
                <div className="card shadow border-0 rounded-4 benefits-card">
                  <div className="card-body p-4">
                    <div
                      className={`benefits-card-icons rounded-4 mb-4 d-flex justify-content-center align-items-center bg-opacity-10 bg-${benefit.color}`}
                    >
                      {benefit.icon}
                    </div>
                    <h6 className="card-title my-3 fw-bold">
                      {index + 1}. {benefit.name}
                    </h6>
                    <p className="card-text text-muted fw-normal">
                      {benefit.content}
                    </p>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits;
