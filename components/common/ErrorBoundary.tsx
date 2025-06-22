import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorPage from '@/components/common/ErrorPage';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <ErrorPage
          title="Something went wrong"
          message={this.state.error?.message || 'An unexpected error occurred'}
        />
      );
    }

    return this.props.children;
  }
}
