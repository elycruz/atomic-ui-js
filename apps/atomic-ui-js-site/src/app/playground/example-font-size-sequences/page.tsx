import { factorsOf, fib, multiplesOf } from 'atomic-ui-js/utils/index.js';

export default function ExampleFontSizeSequences() {
  const text = 'The quick brown fox jumped over the lazy dog.',
    renderFontSizeSubArticle = (title, numbers) => {
      return (
        <article>
          <header>
            <h3>{title}</h3>
          </header>
          {numbers.map(i => (
            <>
              <span key={`example-font-size-span-${i}`}>{i}px</span>
              <div
                key={`example-font-size-div-${i}`}
                style={{ fontSize: `${i / 16}rem` }}
              >
                {text}
              </div>
            </>
          ))}
        </article>
      );
    };

  return (
    <section>
      <header>
        <h2>Example Font-Size Sequences</h2>
      </header>
      <article>
        <dl>
          <dt>Objective</dt>
          <dd>
            <p>
              Layout content with variying font size increments to depict the
              effect of different font-size sequences; E.g., fibonacci sequence,
              factors-of-a-number sequence, etc.
            </p>
          </dd>
        </dl>
      </article>

      {renderFontSizeSubArticle('Factors of 144', factorsOf(144))}
      {renderFontSizeSubArticle('Multiples of 8', multiplesOf(16, 8))}
      {renderFontSizeSubArticle('Fibonacci numbers', fib(144))}
    </section>
  );
}
