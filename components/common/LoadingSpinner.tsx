import { Spinner } from 'react-bootstrap';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: '',
    md: 'spinner-border-md',
    lg: 'spinner-border-lg'
  };

  return (
    <div className={`d-flex justify-content-center align-items-center ${className}`}>
      <Spinner 
        animation="border" 
        role="status"
        className={sizeMap[size]}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
