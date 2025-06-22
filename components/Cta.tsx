import WaitingListForm from "@/modules/WaitingListForm";
import React from "react";

function Cta() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="my-3">
          <div className="card shadow border-0 rounded-4 bg-primary">
            <div className="card-body text-center p-4">
              <div className="d-flex justify-content-center">
                <div className="col-md-6 text-white mb-3">
                  <h3 className="fw-semibold my-3">
                    Begin your clarity journey today
                  </h3>
                  <WaitingListForm
                    buttonColor={"white"}
                    label="Join the waiting list + Receive your free 7-Day Emotional Reset guide"
                    align="center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
