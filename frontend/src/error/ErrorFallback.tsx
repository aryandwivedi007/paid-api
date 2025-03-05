interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
  }
  
  export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
    return (
      <div>
        <h2>Something went wrong.</h2>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  };