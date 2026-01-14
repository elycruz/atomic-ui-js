import styles from './page.module.css';
import EzRippleComponent from 'atomic-ui-js-next/ez-ripple';

const xDetailsCN = styles['ez-details'],
  xDetailsArrowCN = styles['ez-details-arrow'];

export default function DetailsElement() {
  return <section>
    <header>
      <h3>
        <code>details</code> element experiments
      </h3>
    </header>

    <article>
      <header>As <code>alert</code> element</header>

      <details open className={`ez-alert ${xDetailsCN} ez-theme-primary`}>
        <summary className="ez-btn">
          <EzRippleComponent></EzRippleComponent>
          <span>Message</span>
          <span className={xDetailsArrowCN}></span>
        </summary>

        <div className="ez-card">
          <section className="ez-card-section">
            <p>
              Content
            </p>
          </section>
          <footer className="ez-card-footer">
            <button className="ez-btn"></button>
          </footer>
        </div>

      </details>
    </article>
  </section>;
}
