import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mt-2">
        The page you are looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-md hover:bg-blue-700 transition-all"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
