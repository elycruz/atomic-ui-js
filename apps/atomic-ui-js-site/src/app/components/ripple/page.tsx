import React from 'react';
import XRippleComponent from 'atomic-ui-js-next/x-ripple';
import styles from './page.module.css';

export default function RipplePage() {
  return <section>
    <header>
      <span className="x-h2">Ripple Element</span>
    </header>
    <div>
      <p>An element that provides the material-design ripple effect, for user interactions, within/on UI components.</p>
      <p>The element operates in two modes:</p>
      <ul>
        <li>With children (e.g., with a checkbox input), and</li>
        <li>As an &quot;empty&quot; child element (within a button element, etc.).</li>
      </ul>

      <h3 className="x-h3">Caveats</h3>
      <ul>
        <li>When the elements is used as an empty element, within an interactive element, the interactive element should
          contain
          a <code>position</code> value; E.g., <code>position: relative;</code> etc.
        </li>
      </ul>
      <dl>
        <dt>Non-interactive element with empty ripple element</dt>
        <dd>
          <p>With <code>position: relative;</code>:</p>
          <div className={`${styles['standalone-ripple']} x-theme-neutral`} style={{position: 'relative'}}>
            <XRippleComponent></XRippleComponent>
          </div>
        </dd>
        <dt>Interactive element with empty ripple element</dt>
        <dd>
          <button type="button" className="x-filled x-theme-neutral">
            <XRippleComponent></XRippleComponent>
            <span>Button</span>
          </button>
        </dd>
        <dt>Ripple with child element</dt>
        <dd>
          <label htmlFor="checkbox" className="x-theme-success">
            <XRippleComponent>
              <input className="x-checkbox" type="checkbox" id="checkbox" name="checkbox"/>
            </XRippleComponent>
            <span>Checkbox</span>
          </label>

          <label htmlFor="checkbox2" className="x-theme-primary">
            <XRippleComponent>
              <input className="x-checkbox" type="checkbox" id="checkbox2" name="checkbox"/>
            </XRippleComponent>
            <span>Checkbox 2</span>
          </label>

          <div>
            <label htmlFor="radio-1">
              <XRippleComponent className="x-theme-primary">
                <input className="x-radio" type="radio" name="radios" id="radio-1"/>
              </XRippleComponent>
              <span>Radio 1</span>
            </label>

            <label htmlFor="radio-2">
              <XRippleComponent className="x-theme-primary">
                <input className="x-radio" type="radio" name="radios" id="radio-2"/>
              </XRippleComponent>
              <span>Radio 1</span>
            </label>
          </div>
        </dd>
      </dl>
    </div>
  </section>;
}
