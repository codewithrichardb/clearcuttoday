import "@/styles/styles.scss";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import { User } from 'firebase/auth';
import ErrorBoundary from "@/components/common/ErrorBoundary";
import RouteTransition from "@/components/common/RouteTransition";
import ErrorPage from "@/components/common/ErrorPage";
import { Inter } from 'next/font/google';

// Load Inter font with latin subset
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Component to handle auth state changes and redirects
function AuthStateHandler({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Track if the component is mounted
    let isMounted = true;

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!isMounted) return;
      
      setCurrentUser(user);
      
      // Skip redirect logic on initial load until we have the auth state
      if (!isReady) {
        setIsReady(true);
        return;
      }

      // Define public paths
      const publicPaths = ['/login', '/signup', '/forgot-password', '/', '/onboarding'];
      const isPublicPath = publicPaths.some(path => 
        router.pathname === path || router.pathname.startsWith(`${path}/`)
      );

      // Debug logging
      console.log('Auth state changed:', { 
        user: user ? 'authenticated' : 'not authenticated',
        currentPath: router.pathname,
        isPublicPath
      });

      // Handle redirects based on auth state
      if (!user) {
        // If not logged in and trying to access protected route
        if (!isPublicPath) {
          const redirectPath = router.pathname === '/' ? '' : `?redirect=${encodeURIComponent(router.asPath)}`;
          console.log('Redirecting to login');
          router.push(`/login${redirectPath}`);
        }
      } else {
        // If logged in and trying to access auth pages
        const authPages = ['/login', '/signup', '/forgot-password'];
        if (authPages.includes(router.pathname)) {
          console.log('Redirecting to dashboard');
          router.push('/dashboard');
        }
      }
    });

    // Cleanup function
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [router, isReady]);

  // Show loading state until we know the auth state
  if (!isReady) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} font-sans`}>
      <ErrorBoundary
        fallback={
          <ErrorPage
            title="Something went wrong"
            message="We're sorry, but an unexpected error occurred."
          />
        }
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AuthStateHandler>
              <RouteTransition>
                <Component {...pageProps} />
              </RouteTransition>
            </AuthStateHandler>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </div>
  );
}
