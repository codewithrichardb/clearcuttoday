import "@/styles/styles.scss";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import RouteTransition from "@/components/common/RouteTransition";
import ErrorPage from "@/components/common/ErrorPage";

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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Redirect to login if not authenticated and not on a public page
      const publicPaths = ['/login', '/signup', '/forgot-password'];
      const isPublicPath = publicPaths.some(path => 
        router.pathname.startsWith(path)
      );

      if (!user && !isPublicPath) {
        router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
      } else if (user && isPublicPath) {
        // If user is logged in and tries to access auth pages, redirect to dashboard
        router.push('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
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
  );
}
