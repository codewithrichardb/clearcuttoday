// pages/index.js
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', { email });
      router.push('/success');
    } catch (error) {
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>ClearCut - Emotional Detox App</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container py-5 text-center">
        <img src="/logo.png" alt="ClearCut Logo" width="100" className="mb-4" /> <h1 className="display-5 fw-bold">Let Go. Get Clear. Rebuild Yourself.</h1> <p className="lead">A 7-day emotional detox for people healing from heartbreak and emotional confusion.</p> <p className="mb-4">No fluff. No pressure to 'just move on.' Just real steps to help you get your peace back — one day at a time.</p> <div className="row justify-content-center"> <div className="col-md-6"> <form onSubmit={handleSubmit}> <div className="mb-3"> <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> </div> <button type="submit" className="btn btn-primary w-100">Get Early Access + Free Guide</button> </form>
          {status && <div className="mt-3 text-center text-muted">{status}</div>} </div> </div>

        <hr className="my-5" />

        <h2 className="fw-bold mb-4">What You'll Get</h2>
        <div className="row text-start justify-content-center">
          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">7-Day Emotional Detox</h5>
                <p className="card-text">Daily tasks + journal prompts designed to reset your mind and release emotional baggage.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Mood & Progress Tracker</h5>
                <p className="card-text">Track your emotional state each day so you can see your growth clearly.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Free PDF Guide</h5>
                <p className="card-text">Start now with a beautifully written printable detox guide to help you regain clarity today.</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 text-muted">Built by someone who's been there. You're not broken — you're just healing.</p>
      </div>
    </>
  )
}
