import React from "react";
import DashboardSidebarMenu from "./DashboardSidebarMenu";

function DashboardOffCanvas({ page }: { page: string }) {
  return (
    <div
      className="offcanvas offcanvas-start"
      data-bs-backdrop="static"
      tab-index="-1"
      id="Id2"
      aria-labelledby="staticBackdropLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="staticBackdropLabel">
          Offcanvas
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <DashboardSidebarMenu page={page} />
      </div>
    </div>
  );
}

export default DashboardOffCanvas;
