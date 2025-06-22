import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

function New() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="container my-3">
        <div className="d-flex justify-content-around">
          <div>
            <Link href="/dashboard">
              <FaArrowLeft /> Back to dashboard
            </Link>
          </div>
          <div>
            <h5>New Journal Entry</h5>
          </div>
        </div>
        <div className="my-3">
          <div className="card">
            <div className="card"></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default New;
