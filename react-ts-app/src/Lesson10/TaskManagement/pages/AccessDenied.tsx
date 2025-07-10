import { Link } from 'react-router';

export default function AccessDenied() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className=" text-lg text-center text-red-500">Access Denied</h1>
      <hr />
      <p className="mt-4 text-gray-600">You do not have permission to access this page. Please log in to continue.</p>
      <p className="mt-2 text-gray-600">If you believe this is an error, please contact support.</p>
      <hr className="my-6" />
      <p className="text-gray-600">Return to the login page:</p>
      <br />

      <Link className="text-blue-500 hover:underline" to="/login">
        Login
      </Link>
    </div>
  );
}
