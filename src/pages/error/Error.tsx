import React, { memo } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const ErrorPage: React.FC = memo(() => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full mx-auto px-4">
        <Card className="text-center">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
              404
            </h1>

            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Page Not Found
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Sorry, the page you are looking for doesn't exist or has been
              moved.
            </p>
          </div>

          <div className="space-y-4">
            <Link to={ROUTES.HOME}>
              <Button fullWidth size="large">
                Back to Home
              </Button>
            </Link>

            <Button
              variant="outline"
              fullWidth
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
});

ErrorPage.displayName = "ErrorPage";

export default ErrorPage;
