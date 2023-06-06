import styles from './page.module.css';
import XRippleComponent from 'atomic-ui-js-next/x-ripple';

const xDetailsCN = styles['x-details'],
  xDetailsArrowCN = styles['x-details-arrow'];

export default function DetailsElement() {
  return <section>
    <header>
      <h3>
        <code>details</code> element experiments
      </h3>
    </header>

    <article>
      <header>As <code>alert</code> element</header>

      <details open className={`x-alert ${xDetailsCN} x-theme-primary`}>
        <summary className="x-btn">
          <XRippleComponent></XRippleComponent>
          <span>Message</span>
          <span className={xDetailsArrowCN}></span>
        </summary>

        <div className="x-card">
          <section className="x-card-section">
            <p>
              Content
            </p>
          </section>
          <footer className="x-card-footer">
            <button className="x-btn"></button>
          </footer>
        </div>

      </details>
    </article>
  </section>;
}
