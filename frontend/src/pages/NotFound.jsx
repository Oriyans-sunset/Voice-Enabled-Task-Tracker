import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="space-y-4 text-center py-16">
      <p className="eyebrow text-primary/80">404</p>
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="text-base-content/70 max-w-xl mx-auto">
        The page you were looking for does not exist. Choose another path and keep shipping.
      </p>
      <Link to="/" className="btn btn-outline btn-primary">
        Go back home
      </Link>
    </section>
  );
}

export default NotFound;
