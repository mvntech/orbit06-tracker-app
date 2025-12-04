import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Orbit06!</h1>
      <Link href="/login">Login</Link>
      <Link href="/signup">Sign Up</Link>
    </div>
  );
}
