import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
    } catch (error) {
      setError('Failed to log in');
      console.error(error);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
    } catch (error) {
      setError('Failed to sign in with Google');
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Layout title="Log In - ClearCut">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-body p-4">
                <h2 className="text-center mb-4">Log In</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                
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
                  
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <button 
                    disabled={loading}
                    className="btn btn-primary w-100 mb-3"
                    type="submit"
                  >
                    {loading ? 'Logging in...' : 'Log In'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="btn btn-outline-dark w-100 mb-3 d-flex align-items-center justify-content-center"
                  >
                    <img 
                      src="/google-logo.svg" 
                      alt="Google" 
                      width="20" 
                      className="me-2"
                    />
                    Continue with Google
                  </button>
                </form>
                
                <div className="text-center mt-3">
                  <Link href="/forgot-password" className="text-decoration-none">
                    Forgot Password?
                  </Link>
                </div>
                
                <div className="text-center mt-3">
                  Need an account?{' '}
                  <Link href="/signup" className="text-decoration-none">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
