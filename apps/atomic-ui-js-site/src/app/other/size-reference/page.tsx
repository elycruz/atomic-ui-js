import {factorsOf, multiplesOf, commonFactorsOf, fib} from 'atomic-ui-js/utils/number.js';

export default function Page() {
  const factorsOf144 = factorsOf(144),
    multiplesOf4 = multiplesOf(4, Math.round(144 / 4)),
    multiplesOf6 = multiplesOf(6, Math.round(144 / 6)),
    multiplesOf8 = multiplesOf(8, Math.round(144 / 8)),
    fib144 = fib(144),
    commonNumbers = (() => {
      const counts = []
        .concat(factorsOf144, multiplesOf4, multiplesOf6, multiplesOf8, fib144)
        .reduce((acc, curr) => {
          if (acc[curr]) acc[curr] += 1;
          else acc[curr] = 1;
          return acc;
        }, {} as Record<number, number>)
      ;
      return Object.keys(counts).reduce((acc, curr) => {
        if (counts[curr] > 1) acc.push(parseInt(curr, 10));
        return acc;
      }, [] as number[])
        .sort((a, b) => a - b);
    })(),
    commonNumberFactors = commonFactorsOf(...new Set(commonNumbers));

  return (
    <section>
      <header>
        <h3>
          Size values in library
        </h3>
      </header>
      <article>
        <p>Note: The values here are all tentative (except the &ldquo;common&rdquo; set, below).</p>
        <dl>
          <dt>Factors of 144</dt>
          <dd>{factorsOf144.join(', ')}</dd>
          {([
            [4, multiplesOf4],
            [6, multiplesOf6],
            [8, multiplesOf8]
          ] as [number, number[]][]
          ).flatMap(([x, set], i) => <>
            <dt key={`dt-${x}-${i}`}>Multiples of {x} (up to 144)</dt>
            <dd key={`dt-${x}-${i}-2`}>
              {set.join(', ')}
            </dd>
          </>)
          }
          <dt>Fibonacci (up to 144)</dt>
          <dd>{fib144.join(', ')}</dd>
          <dt>Common (from above)</dt>
          <dd>
            <span>{commonNumbers.join(', ')}</span>
            <p>Strive to use this set aside from other numbers as the values here
            will pair up well with each other due to them having the common factors {commonNumberFactors.join(', ')}.</p>
          </dd>
        </dl>
      </article>
    </section>
  );
}
