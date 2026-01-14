import React from 'react';
import {xThemes} from 'atomic-ui-js/utils/constants.js';

import EzRippleComponent from 'atomic-ui-js-next/ez-ripple';

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
                <fieldset className={'ez-fieldset ez-layout-horizontal'}>
                  <label htmlFor={`checkbox-${i}`}
                    className={`ez-theme-${xThemes[k1]}`}>
                    <EzRippleComponent>
                      <input type="checkbox" id={`checkbox-${i}`} name={`checkbox-${i}`}
                        className={'ez-checkbox'}/>
                    </EzRippleComponent>

                    <span>Checkbox {i}</span>
                  </label>

                  {/* Use of \`inert\` here is temporary - disabled state should be handled via css */}
                  <label htmlFor={`checkbox-disabled-${i}`}
                    className={`ez-theme-${xThemes[k1]}`}>
                    <EzRippleComponent>
                      <input type="checkbox"
                        id={`checkbox-disabled-${i}`}
                        name={`checkbox-disabled-${i}`}
                        className={'ez-checkbox'}
                        disabled/>
                    </EzRippleComponent>

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
