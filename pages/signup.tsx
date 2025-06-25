import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import { FaGoogle } from 'react-icons/fa';
import NavBar from '@/components/NavBar';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      await signup(email, password, displayName);
      // Redirect to onboarding after successful signup
      window.location.href = '/onboarding';
    } catch (error) {
      setError('Failed to create an account. ' + (error as Error).message);
      console.error(error);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      // The AuthStateHandler will handle the redirect to /onboarding
      // since we've added it to public paths
    } catch (error) {
      setError('Failed to sign up with Google: ' + (error as Error).message);
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Layout title="Sign Up - ClearCut">
       <NavBar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card border-0 shadow rounded-3">
              <div className="card-body p-4">
                <h3 className="text-center mb-4">Create Account</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="displayName" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="displayName"
                      className="form-control"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required
                    />
                  </div>
                  
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
                  
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <button 
                    disabled={loading}
                    className="btn btn-primary w-100 mb-3 text-white"
                    type="submit"
                  >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="btn btn-outline-dark w-100 mb-3 d-flex align-items-center justify-content-center"
                  >
                    <FaGoogle size={18} className='me-2' />
                    Continue with Google
                  </button>
                </form>
                
                <div className="text-center mt-3">
                  Already have an account?{' '}
                  <Link href="/login" className="text-decoration-none">
                    Log In
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
