import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';

// Dynamically import the OnboardingFlow component with SSR disabled
const OnboardingFlow = dynamic(
  () => import('@/components/onboarding/OnboardingFlow.new2'),
  { ssr: false }
);

export default function OnboardingPage() {
  const router = useRouter();

  // Check if user is logged in, if not redirect to home
  useEffect(() => {
    // TODO: Add authentication check
    // const isLoggedIn = checkAuth();
    // if (!isLoggedIn) {
    //   router.push('/');
    // }
  }, [router]);

  return (
    <Layout title="Start Your Journey - ClearCut">
      <OnboardingFlow />
    </Layout>
  );
}
