import React from 'react';
import {xThemes} from 'atomic-ui-js/utils/constants.js';

export default function CheckboxPage() {
  return <section>
    <header>Checkbox</header>
    <div>
      <dl>
        {Object.keys(xThemes).map((k1, i) =>
          <>
            <dt>{k1}</dt>

            <dd>
              <form>
                <fieldset className={'x-fieldset x-layout-horizontal'}>
                  <label htmlFor={`checkbox-${i}`}>
                    <x-ripple className={`x-theme-${xThemes[k1]}`}>
                      <input type="checkbox" id={`checkbox-${i}`} name={`checkbox-${i}`}
                        className={'x-checkbox'}/>
                    </x-ripple>

                    <span>Checkbox {i}</span>
                  </label>

                  {/* Use of \`inert\` here is temporary - disabled state should be handled via css */}
                  <label htmlFor={`checkbox-disabled-${i}`}
                    className={`x-theme-${xThemes[k1]}`}>
                    <x-ripple className={`x-theme-${xThemes[k1]}`}>
                      <input type="checkbox"
                        id={`checkbox-disabled-${i}`}
                        name={`checkbox-disabled-${i}`}
                        className={'x-checkbox'}
                        disabled/>
                    </x-ripple>

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
