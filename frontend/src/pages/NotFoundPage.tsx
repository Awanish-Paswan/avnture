import { Link } from "react-router-dom";
export function NotFoundPage() {
  return (
    <main className="container-shell grid min-h-[70vh] place-items-center py-20 text-center">
      <div>
        <p className="text-8xl font-black tracking-[-.08em] text-brand">404</p>
        <h1 className="mt-5 text-4xl font-bold">
          Looks like this page doesn’t exist.
        </h1>
        <p className="mt-4 text-slate-600">
          The link may have moved, or the address may be incomplete.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className="button-primary" to="/">
            Go Home
          </Link>
          <Link className="button-secondary" to="/services">
            Explore Services
          </Link>
        </div>
      </div>
    </main>
  );
}
