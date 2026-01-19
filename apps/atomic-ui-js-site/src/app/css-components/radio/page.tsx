import React from 'react';
import { xThemes } from 'atomic-ui-js/utils/constants.js';
import EzRippleComponent from 'atomic-ui-js-next/ez-ripple';
import EzFieldComponent from 'atomic-ui-js-next/ez-field';

export default function RadioPage() {
  return (
    <section>
      <header>
        <h2>Radio Themes</h2>
      </header>
      <div>
        <dl>
          {Object.keys(xThemes).map((k1, i) => (
            <>
              <dt key={`radio-page-dt-${i}`}>{k1}</dt>

              <dd key={`radio-page-dd-${i}`}>
                <form>
                  <fieldset className="ez-fieldset ez-fieldset--grid-2">
                    <label htmlFor={`radio-${i}-0`}>Radio set {i + 1}:</label>

                    <EzFieldComponent>
                      {Array(3)
                        .fill(null, 0, 2)
                        .map((_, j) => (
                          <label
                            htmlFor={`radio-${i}-${j}`}
                            key={`radio-page-label-${i}-${j}`}
                          >
                            <EzRippleComponent
                              className={`ez-theme-${xThemes[k1]}`}
                            >
                              <input
                                type="radio"
                                id={`radio-${i}-${j}`}
                                name={`radio-set-${i}`}
                                className="ez-radio"
                              />
                            </EzRippleComponent>

                            <span>
                              Radio {i + 1}.{j + 1}
                            </span>
                          </label>
                        ))}

                      <label htmlFor={`radio-disabled-${i}`}>
                        <EzRippleComponent
                          className={`ez-theme-${xThemes[k1]}`}
                        >
                          <input
                            type="radio"
                            id={`radio-disabled-${i}`}
                            name={`radio-disabled-${i}`}
                            className="ez-radio"
                            disabled
                          />
                        </EzRippleComponent>

                        <span>Disabled {i + 1}</span>
                      </label>
                    </EzFieldComponent>
                  </fieldset>
                </form>
              </dd>
            </>
          ))}
        </dl>
      </div>
    </section>
  );
}
