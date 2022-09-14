import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <h2 className="text-9xl">404</h2>
      <h3 className="text-3xl font-semibold">This page does not exist</h3>
      <button
        type="button"
        className="flex items-center rounded-lg bg-green-700 px-4 py-2 text-white"
        disabled
      >
        <svg
          className="mr-3 h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="font-medium">Redirecting to homepage</p>
      </button>
    </div>
  );
};
