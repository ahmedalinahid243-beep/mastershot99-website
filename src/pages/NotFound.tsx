import { PrimaryButton } from "../components/ui/Primitives";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <p className="font-mono-num text-6xl text-gold-dim">404</p>
      <h1 className="mt-4 font-display text-2xl text-ink">Page Not Found</h1>
      <p className="mt-2 text-ink-dim">The page you're looking for doesn't exist or has been moved.</p>
      <div className="mt-8">
        <PrimaryButton href="/">Back to Home</PrimaryButton>
      </div>
    </div>
  );
}
