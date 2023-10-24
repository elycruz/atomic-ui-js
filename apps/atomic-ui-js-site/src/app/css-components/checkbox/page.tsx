import React from 'react';
import {xThemes} from 'atomic-ui-js/utils/constants.js';

import XRippleComponent from 'atomic-ui-js-next/x-ripple';

export default function CheckboxPage() {
  return <section>
    <header>
      <h2 className="h2">
        Checkbox
      </h2>
    </header>
    <div>
      <dl>
        {Object.keys(xThemes).map((k1, i) =>
          <>
            <dt>{k1}</dt>

            <dd>
              <form>
                <fieldset className={'x-fieldset x-layout-horizontal'}>
                  <label htmlFor={`checkbox-${i}`}
                    className={`x-theme-${xThemes[k1]}`}>
                    <XRippleComponent>
                      <input type="checkbox" id={`checkbox-${i}`} name={`checkbox-${i}`}
                        className={'x-checkbox'}/>
                    </XRippleComponent>

                    <span>Checkbox {i}</span>
                  </label>

                  {/* Use of \`inert\` here is temporary - disabled state should be handled via css */}
                  <label htmlFor={`checkbox-disabled-${i}`}
                    className={`x-theme-${xThemes[k1]}`}>
                    <XRippleComponent>
                      <input type="checkbox"
                        id={`checkbox-disabled-${i}`}
                        name={`checkbox-disabled-${i}`}
                        className={'x-checkbox'}
                        disabled/>
                    </XRippleComponent>

                    <span>Disabled {i}</span>
                  </label>
                </fieldset>
              </form>
            </dd>
          </>
        )}
      </dl>
    </div>
  </section>;
}
