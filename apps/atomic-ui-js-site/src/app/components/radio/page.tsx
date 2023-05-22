import React from 'react';
import {xThemes} from 'atomic-ui-js/utils/constants.js';
import XRippleComponent from 'atomic-ui-js-next/x-ripple';
import XFieldComponent from 'atomic-ui-js-next/x-field';

export default function RadioPage() {
  return <section>
    <header><h2>Radio Themes</h2></header>
    <div>
      <dl>
        {Object.keys(xThemes).map((k1, i) =>
          <>
            <dt key={`radio-page-dt-${i}`}>{k1}</dt>

            <dd key={`radio-page-dd-${i}`}>
              <form>
                <fieldset className="x-fieldset x-fieldset--grid-2">
                  <label htmlFor={`radio-set-${i}`}>Radio set {i + 1}:</label>

                  <XFieldComponent>
                    {Array(3).fill(null, 0, 2).map((_, j) =>
                      <label htmlFor={`radio-${i}-${j}`} key={`radio-page-label-${i}-${j}`}>
                        <XRippleComponent className={`x-theme-${xThemes[k1]}`}>
                          <input type="radio" id={`radio-${i}-${j}`} name={`radio-set-${i}`}
                            className="x-radio"/>
                        </XRippleComponent>

                        <span>Radio {i + 1}.{j + 1}</span>
                      </label>
                    )}

                    <label htmlFor={`radio-disabled-${i}`}>
                      <XRippleComponent className={`x-theme-${xThemes[k1]}`}>
                        <input type="radio" id={`radio-disabled-${i}`} name={`radio-disabled-${i}`}
                          className="x-radio" disabled/>
                      </XRippleComponent>

                      <span>Disabled {i + 1}</span>
                    </label>
                  </XFieldComponent>

                </fieldset>
              </form>
            </dd>
          </>
        )}
      </dl>
    </div>
  </section>;
}
