import Link from 'next/link';
import Layout from '@/components/Layout';

export default function NotFound() {
  return (
    <Layout title="Page Not Found">
      <div className="container text-center py-5">
        <h1 className="display-1 fw-bold">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="lead mb-4">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary">
          Go to Homepage
        </Link>
      </div>
    </Layout>
  );
}
