'use client';

import XRippleComponent from 'atomic-ui-js-next/x-ripple';
import styles from './index.module.scss';

export function FeedbackExample() {
  return <form action="#" className={`${styles['feedback-module']} x-theme-neutral`} onSubmit={e => e.preventDefault()}>
    <fieldset className="x-fieldset x-layout-vertical">
      <legend>
        <button type="button" className="x-btn x-theme-neutral x-outlined x-large">
          <XRippleComponent />
          Feedback
        </button>
      </legend>

      <div className="x-field x-field--vertical">
        <label htmlFor="what-to-make-better">What can we make better?</label>
        <textarea className="x-input"
          name="what-to-make-better"
          id="what-to-make-better"
          cols={30}
          rows={10}></textarea>
      </div>

      <button className="x-btn" type="reset">
        <XRippleComponent />
        Reset
      </button>
      <button className="x-btn x-filled" type="submit">
        <XRippleComponent />
        Submit
      </button>
    </fieldset>
  </form>;
}
