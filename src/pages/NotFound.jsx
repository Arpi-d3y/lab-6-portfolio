import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center py-5">
      <h1>404 - Page Not Found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/" className="btn btn-primary">Return Home</Link>
    </div>
  );
}

export default NotFound;