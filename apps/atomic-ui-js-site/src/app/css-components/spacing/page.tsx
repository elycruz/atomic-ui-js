import {fib, factorsOf} from 'atomic-ui-js/utils';
import styles from './page.module.scss';

const boxCName = styles.box;

export default function SpacingPage () {
  const fibonacciNums = fib(5000),
    factorsOf144 = factorsOf(144),
    sizes = fibonacciNums
      .concat(factorsOf144.filter(x => !fibonacciNums.includes(x)))
      .sort((a, b) => {
        if (a < b) return -1;
        return a === b ? 0 : 1;
      }),

    sizesLen = sizes.length;

  return <section>
    <header>
      <div className="x-h2">Spacing</div>
    </header>
    <article>
      <div>
        <p>The library&lsquo;s spacing properties - factors of 144, and the fibonacci sequence,
          combined, in ordered sequence, represented as &grave;rem&grave; units (in source).</p>
      </div>

      <div>
        {sizes.flatMap((n, i) => {
          const lim = sizesLen - (i + 3);

          return <>
            <div key={`spacing-set-title-${i}`}
              className="x-display-block">
              <div>--x-{n}px</div>
            </div>
            <div key={`spacing-set-${i}`}>
              {Array(Math.max(lim, 1))
                .fill(null, 0, Math.max(lim, 1))
                .map((_, j) =>
                  <div
                    key={`box-${j}`}
                    className={boxCName}
                    style={{
                      width: `var(--x-${n}px)`,
                      height: `var(--x-${n}px)`
                    }}>&nbsp;
                  </div>
                )
              }
            </div>
          </>;
        })}
      </div>
    </article>
  </section>;
}
