'use client';

import EzRippleComponent from 'atomic-ui-js-next/ez-ripple';
import styles from './index.module.scss';

export function FeedbackExample() {
  return <form action="#" className={`${styles['feedback-module']} ez-theme-neutral`} onSubmit={e => e.preventDefault()}>
    <fieldset className="ez-fieldset ez-layout-vertical">
      <legend>
        <button type="button" className="ez-btn ez-theme-neutral ez-outlined ez-large">
          <EzRippleComponent />
          Feedback
        </button>
      </legend>

      <div className="ez-field ez-field--vertical">
        <label htmlFor="what-to-make-better">What can we make better?</label>
        <textarea className="ez-input"
          name="what-to-make-better"
          id="what-to-make-better"
          cols={30}
          rows={10}></textarea>
      </div>

      <button className="ez-btn" type="reset">
        <EzRippleComponent />
        Reset
      </button>
      <button className="ez-btn ez-filled" type="submit">
        <EzRippleComponent />
        Submit
      </button>
    </fieldset>
  </form>;
}
