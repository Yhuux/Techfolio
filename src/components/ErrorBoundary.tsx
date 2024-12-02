import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div 
          className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-slate-800 rounded-xl border-2 border-red-500/20"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-white mb-2">Something went wrong</h2>
          <p className="text-gray-400 text-center mb-6">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={this.handleReload}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            aria-label="Refresh page"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}