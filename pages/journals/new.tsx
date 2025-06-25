import DashboardNavBar from "@/components/DashboardNavBar";
import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";
import { FaArrowLeft, FaBook } from "react-icons/fa";
import dynamic from 'next/dynamic';

// Dynamically import the JournalForm component with no SSR
const JournalForm = dynamic(
  () => import('@/modules/journals/JournalForm'),
  { ssr: false }
);

function NewJournalPage() {
  return (
    <Layout title="New Journal Entry">
      <DashboardNavBar />
      <div className="container my-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link href="/dashboard" className="btn btn-outline-secondary btn-sm">
            <FaArrowLeft className="me-1" /> Back to dashboard
          </Link>
          <h1 className="h4 mb-0">
            <FaBook className="me-2" /> New Journal Entry
          </h1>
          <div style={{ width: '100px' }}></div> {/* For alignment */}
        </div>
        
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <JournalForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NewJournalPage;
