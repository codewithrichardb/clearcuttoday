import React from "react";
import { BsJournalText } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { RiUserCommunityFill } from "react-icons/ri";

const benefits = [
  {
    name: "Personalized Healing Journey",
    content:
      "Smart journaling with trauma-informed prompts that adapt to your unique healing process, helping you process emotions safely.",
    color: "warning",
    icon: <FaHeart />,
  },
  {
    name: "Expert-Designed Resources",
    content:
      "Therapeutic exercises based on cognitive behavioral therapy and mindfulness to rebuild self-esteem and set healthy boundaries.",
    color: "primary",
    icon: <BsJournalText />,
  },
  {
    name: "Safe Community Support",
    content:
      "Connect with others who understand your journey in a moderated, supportive environment with professional guidance.",
    color: "secondary",
    icon: <RiUserCommunityFill />,
  },
];

function Features() {
  return (
    <section className="bg-info bg-opacity-10 py-5" id="features">
      <div className="container">
        <div className="text-center">
          <span className="badge bg-success bg-opacity-50 rounded-5 p-2 px-3 my-3">
            YOUR HEALING JOURNEY STARTS HERE
          </span>
        </div>
        <h2 className="my-2 text-center fw-semibold">Your Path to Emotional Freedom</h2>
        <p className="my-3 mb-5 text-center">
          Whether you&apos;re healing from heartbreak, family estrangement, or emotional abuse, we provide the tools and support you need to rebuild and thrive.
        </p>
        <div className="d-flex justify-content-center">
          <div className="container">
            <div className="row my-4">
              {benefits?.map((benefit) => (
                <React.Fragment key={benefit.name}>
                  <div className="col-md-4 mb-3">
                    <div className="card shadow border-0 rounded-4 benefits-card">
                      <div className="card-body p-4 text-center">
                        <div className="d-flex justify-content-center">
                          <div
                            className={`benefits-card-icons rounded-4 mb-4 bg-opacity-10 d-flex justify-content-center align-items-center bg-${benefit.color}`}
                          >
                            {benefit.icon}
                          </div>
                        </div>
                        <h6 className="card-title my-3 fw-bold text-center">
                          {benefit.name}
                        </h6>
                        <p className="card-text text-muted fw-normal text-center">
                          {benefit.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
