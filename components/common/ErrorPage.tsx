import Link from 'next/link';

interface ErrorPageProps {
  title: string;
  message: string;
  showHomeLink?: boolean;
  statusCode?: number;
}

export default function ErrorPage({
  title,
  message,
  showHomeLink = true,
  statusCode,
}: ErrorPageProps) {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          {statusCode && <div className="display-1 fw-bold text-muted mb-2">{statusCode}</div>}
          <h1 className="h2 mb-3">{title}</h1>
          <p className="lead text-muted mb-4">{message}</p>
          {showHomeLink && (
            <Link href="/" className="btn btn-primary">
              Return to Home
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
