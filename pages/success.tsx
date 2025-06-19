// pages/success.js
import Head from 'next/head';

export default function Success() {
  return (
    <>
      <Head>
        <title>Success - ClearCut</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="container py-5 text-center">
        <img src="/logo.png" alt="ClearCut Logo" width="80" className="mb-4" />
        <h1 className="display-6 fw-bold text-success">You're on the list!</h1>
        <p className="lead">Thank you for signing up. We'll notify you when ClearCut launches.</p>
        <a href="/ClearCut-Detox-Guide.pdf" className="btn btn-outline-primary mt-3" download>
          Download Free Detox Guide
        </a>
      </div>
    </>
  );
}
