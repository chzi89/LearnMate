import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground">
      <p className="text-sm font-semibold uppercase tracking-wide">404</p>
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p>The learning page you requested does not exist.</p>
      <Link className="font-semibold underline underline-offset-4" href="/">
        Return to LearnMate
      </Link>
    </main>
  );
}
