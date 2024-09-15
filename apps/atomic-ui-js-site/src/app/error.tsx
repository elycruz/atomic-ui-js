'use client'; // Error boundaries must be Client Components

import {useEffect} from 'react';
import {noop} from 'fjl';

export default function Error({
  error,
  reset = noop,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section>
      <header>
        <h2 className="h2">Something went wrong!</h2>
      </header>
      <div>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </section>
  );
}
