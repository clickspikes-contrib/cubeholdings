import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col justify-center px-6 py-24 lg:px-10">
      <p className="label">Error 404</p>
      <h1 className="display mt-6 max-w-2xl text-[clamp(2.5rem,7vw,5rem)]">
        This address does not exist.
      </h1>
      <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-[var(--muted)]">
        The page you are looking for may have moved, or the link may be out of
        date. Our projects are all listed below.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/projects"
          className="btn btn-dark"
        >
          View all projects
        </Link>
        <Link
          href="/"
          className="btn btn-ghost"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
