import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Layout from '@/components/Layout';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your inbox for further instructions');
    } catch (error) {
      setError('Failed to reset password');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Layout title="Reset Password - ClearCut">
      <NavBar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card border-0 shadow rounded-3">
              <div className="card-body p-4">
                <h3 className="text-center mb-4">Password Reset</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                {message && <div className="alert alert-success">{message}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    disabled={loading}
                    className="btn btn-primary w-100 mb-3 text-white"
                    type="submit"
                  >
                    {loading ? 'Sending...' : 'Reset Password'}
                  </button>
                </form>

                <div className="text-center mt-3">
                  <Link href="/login" className="text-decoration-none">
                    Back to Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
