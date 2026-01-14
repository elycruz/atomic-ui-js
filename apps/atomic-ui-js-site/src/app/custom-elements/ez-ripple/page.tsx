import React from 'react';
import EzRippleComponent from 'atomic-ui-js-next/ez-ripple';
import styles from './page.module.css';

export default function RipplePage() {
  return <section>
    <header>
      <h2>Ripple Element</h2>
    </header>
    <div>
      <p>An element that provides the material-design ripple effect, for user interactions, within/on UI components.</p>
      <p>The element operates in two modes:</p>
      <ul>
        <li>With children (e.g., with a checkbox input), and</li>
        <li>As an &quot;empty&quot; child element (within a button element, etc.).</li>
      </ul>

      <h3 className="ez-h3">Caveats</h3>
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
          <div className={`${styles['standalone-ripple']} ez-theme-neutral`} style={{position: 'relative'}}>
            <EzRippleComponent></EzRippleComponent>
          </div>
        </dd>
        <dt>Interactive element with empty ripple element</dt>
        <dd>
          <button type="button" className="ez-filled ez-theme-neutral">
            <EzRippleComponent></EzRippleComponent>
            <span>Button</span>
          </button>
        </dd>
        <dt>Ripple with child element</dt>
        <dd>
          <label htmlFor="checkbox" className="ez-theme-success">
            <EzRippleComponent>
              <input className="ez-checkbox" type="checkbox" id="checkbox" name="checkbox"/>
            </EzRippleComponent>
            <span>Checkbox</span>
          </label>

          <label htmlFor="checkbox2" className="ez-theme-primary">
            <EzRippleComponent>
              <input className="ez-checkbox" type="checkbox" id="checkbox2" name="checkbox"/>
            </EzRippleComponent>
            <span>Checkbox 2</span>
          </label>

          <div>
            <label htmlFor="radio-1">
              <EzRippleComponent className="ez-theme-primary">
                <input className="ez-radio" type="radio" name="radios" id="radio-1"/>
              </EzRippleComponent>
              <span>Radio 1</span>
            </label>

            <label htmlFor="radio-2">
              <EzRippleComponent className="ez-theme-primary">
                <input className="ez-radio" type="radio" name="radios" id="radio-2"/>
              </EzRippleComponent>
              <span>Radio 1</span>
            </label>
          </div>
        </dd>
      </dl>
    </div>
  </section>;
}
