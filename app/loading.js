export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading LearnMate"
      className="flex min-h-screen items-center justify-center bg-background text-foreground"
    >
      <div className="flex items-center gap-3" role="status">
        <span
          aria-hidden="true"
          className="size-5 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
        <span>Loading your learning space...</span>
      </div>
    </main>
  );
}
