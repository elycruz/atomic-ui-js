import styles from './page.module.scss';

export default function CopyPage() {
  return (
    <section className={styles.copySection}>
      <header>
        <h2>Copy</h2>
      </header>
      <article>
        <dl>
          <dt>Headings</dt>
          <dd>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
          </dd>
          <dt>Block text</dt>
          <dd>
            <p>Paragraph</p>
            <blockquote>Blockquote</blockquote>
            <figure>
              <figcaption>Caption</figcaption>
            </figure>
          </dd>
          <dt>Inline text</dt>
          <dd>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#">Anchor tag</a>
            <button type="button">Button</button>
          </dd>
        </dl>
      </article>
    </section>
  );
}
