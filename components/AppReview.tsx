import Image from "next/image";
import React from "react";
import { FaLock } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { GiProgression } from "react-icons/gi";

const reviews = [
  {
    name: "Healing Insights",
    content:
      "Track your emotional patterns and growth with compassionate, judgment-free analytics",
    icon: <GiProgression className="text-primary" size={14} />,
    color: "primary",
  },
  {
    name: "Personalized Support",
    content: "Custom reminders and prompts that adapt to your unique healing journey",
    icon: <FiBell className="text-info" size={14} />,
    color: "info",
  },
  {
    name: "Safe Space",
    content: "Your private sanctuary for processing emotions and rebuilding your life",
    icon: <FaLock className="text-success" size={14} />,
    color: "success",
  },
];

function AppReview() {
  return (
    <section className="bg-light bg-opacity-50 py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center align-items-center d-none d-lg-flex">
            <Image
              src="/img/journal page.png"
              alt="screenshot"
              width={305}
              height={300}
              style={{ objectFit: "contain" }}
              className="img-responsive shadow rounded-3 hero-img"
            />
          </div>
          <div className="col-md-6">
            <span className="badge bg-info bg-opacity-50 rounded-5 p-2 px-3 my-3">
              YOUR SAFE SPACE
            </span>
            <h2 className="my-3 fw-semibold">Healing on Your Terms</h2>
            <p>
              Whether you&apos;re recovering from heartbreak, family estrangement, or emotional wounds,
              ClearCut provides the tools and support you need to heal at your own pace.
              Your journey is unique, and so is your path to emotional freedom.
            </p>

            <ul className="my-3 list-unstyled">
              {reviews?.map((review) => (
                <React.Fragment key={review.name}>
                  <li className="list-item d-flex align-items-top">
                    <div className="me-2">
                      <div
                        className={`reviews-card-icons rounded-4 mb-4 d-flex justify-content-center align-items-center bg-opacity-10 shadow me-1`}
                      >
                        {review.icon}
                      </div>
                    </div>
                    <div>
                      <h6 className="mb-1 fw-semibold">{review.name}</h6>
                      <p className="fw-normal">{review.content}</p>
                    </div>
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppReview;
