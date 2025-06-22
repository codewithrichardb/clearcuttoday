import WaitingListForm from "@/modules/WaitingListForm";
import Image from "next/image";
import React from "react";

function HeroSection() {
  return (
    <section className="bg-primary bg-opacity-10">
      <div className="container">
        <div className="row vh-100">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="my-5 my-md-0">
              <h1 className="fw-semibold">
                You&apos;re Not Broken. <br /> You&apos;re <span className="text-primary">Healing</span>.
              </h1>
              <p className="my-4">
                Find clarity and strength after heartbreak, toxic relationships, family estrangement, and emotional abuse. Your journey to emotional freedom starts here.
              </p>
              <div className="my-3 col-lg-10">
                <div className="card shadow border-0 rounded-4">
                  <div className="card-body">
                    <WaitingListForm
                      label="Join the waiting list + Receive your free 7-Day Emotional Reset guide"
                      align="start"
                      buttonColor={"primary"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center d-none d-lg-flex">
            <Image
              src="/img/clearcut-dashboard.png"
              alt="screenshot"
              width={550}
              height={260}
              style={{ objectFit: "contain" }}
              className="img-responsive shadow rounded-3 hero-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
