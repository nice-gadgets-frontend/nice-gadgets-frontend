import { Link } from 'react-router-dom';

export const ErrorPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
    <div className="max-w-md w-full">
      <img
        src="/gadgets/img/page-not-found.png"
        alt="404 Error - Page Not Found"
        className="w-full h-auto mb-8"
      />

      <h1 className="text-2xl font-[Mont-Bold] text-[var(--color-primary)] mb-4">
        Oops! Something went wrong
      </h1>

      <p className="text-secondary mb-6 font-[Mont-Regular]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        to="/home"
        className="rounded-md shadow-xl inline-block bg-[var(--color-primary)] hover:bg-[#7E4FE0] text-[var(--color-surface-1)] dark:bg-[var(--color-accent)] dark:text-[var(--color=primary)] px-6 py-3 font-[Mont-SemiBold] transition-colors duration-200"
      >
        Go back to Homepage
      </Link>
    </div>
  </div>
);
