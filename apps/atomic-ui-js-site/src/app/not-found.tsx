import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <section>
      <header>
        <h2 className="h2">Not Found</h2>
      </header>
      <div>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    </section>
  );
}
