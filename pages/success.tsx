// pages/success.js

import Layout from "@/components/Layout";
import NavBar from "@/components/NavBar";

export default function Success() {
  return (
    <Layout title="Success - ClearCutToday">
      <NavBar />
      <div className="container py-5 text-center">
        <h1 className="display-6 fw-bold text-success">
          Welcome to ClearCutToday
        </h1>
        <p className="lead">
          {`You're`} officially on the list. Check your inbox for your free
          7-Day Detox Guide.
        </p>
        <p className="mb-4">
          This is just the beginning. ClearCutToday is more than a emotional
          detox tool, {`it's`} your full system for emotional clarity and
          confidence.
        </p>
      </div>
    </Layout>
  );
}
