import { Link } from "react-router-dom";

const NotFound = () : JSX.Element => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 opacity-70">Page not found.</p>
      <Link to="/" className="btn btn-primary btn-sm mt-4">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;