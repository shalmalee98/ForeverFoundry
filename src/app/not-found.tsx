import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 bg-background">
      <h1 className="font-display text-3xl text-foreground">Page not found</h1>
      <p className="text-muted-foreground text-center max-w-md">
        This page doesn’t exist. Head back to the builder or home.
      </p>
      <div className="flex gap-4">
        <Link href="/" className="text-primary font-medium underline underline-offset-4">
          Home
        </Link>
        <Link href="/builder" className="text-primary font-medium underline underline-offset-4">
          Builder
        </Link>
      </div>
    </div>
  );
}
