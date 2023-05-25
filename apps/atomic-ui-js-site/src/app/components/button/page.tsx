import {xThemes, xVariants, classNames} from 'atomic-ui-js/utils';
import XRippleComponent from 'atomic-ui-js-next/x-ripple';

let _uuid = 0;

const allBaseVariantClasses = 'x-ripple x-filled x-raised x-outlined x-ripple-upgraded';

export default function ButtonPage() {
  return <>
    <section className="buttons-section">
      <header>
        <h2>Button</h2>
      </header>
      <div className="x-section-body">
        <h3>Button Varieties</h3>

        <dl>
          {['x-btn', 'x-button'].map(classNameSuffix => <>
            <dt className="x-h4">{!classNameSuffix ? 'Default' : classNameSuffix}</dt>

            <dd>
              {Object.keys(xThemes).map((k1, j) =>
                <dl key={`${_uuid++}-${j}`}>
                  <dt className="x-h5">{k1} theme</dt>

                  <dd>
                    {Object.keys(xVariants).map((k2, k) =>
                      <button
                        key={`${_uuid++}-${k}`}
                        className={
                          classNames(
                            classNameSuffix,
                            `x-theme-${xThemes[k1]}`,
                            `x-${xVariants[k2]}`
                          )}
                      >{k2}</button>
                    )}

                    <button
                      className={
                        classNames(
                          classNameSuffix,
                          `x-theme-${xThemes[k1]}`
                        )}
                      disabled
                    >Disabled
                    </button>
                  </dd>
                </dl>
              )}
            </dd>
          </>
          )}
        </dl>
        <dl>
          {Object.keys(xThemes).map(k1 => <>
            <dt>{k1}</dt>

            {Object.keys(xVariants).map(k2 =>
              <dd key={`dd-2.${k2}`}>
                <dl>
                  <dt>{k2}</dt>
                  <dd className="x-button-group">
                    {k2 !== 'Dense' && k2 !== 'Small' && k2 !== 'Large' ?
                      <button className={`x-btn x-theme-${xThemes[k1]} x-dense x-${xVariants[k2]}`} type="button">
                        <XRippleComponent></XRippleComponent>
                        <span>Dense and {k2[0].toUpperCase().concat(k2.slice(1))}</span>
                      </button> : null}
                    <button className={`x-btn x-theme-${xThemes[k1]} x-${xVariants[k2]}`} type="button" disabled>
                      <XRippleComponent></XRippleComponent>
                      <span>{k2} and Disabled</span>
                    </button>
                    <button className={`x-btn x-theme-${xThemes[k1]} x-${xVariants[k2]}`} type="button">
                      <XRippleComponent></XRippleComponent>
                      <span>$</span><span>With multiple children</span>
                    </button>
                    <button className={`x-btn x-theme-${xThemes[k1]} x-${xVariants[k2]}`} type="button">
                      <XRippleComponent></XRippleComponent>
                      <span>With long {'text '.repeat(10)}</span>
                    </button>
                  </dd>
                </dl>
              </dd>
            )}
            <dd>
              <dl>
                <dt>All</dt>
                <dd className="x-button-group">
                  <button className={`x-btn x-theme-${xThemes[k1]} ${allBaseVariantClasses}`}
                    type="button">
                    <XRippleComponent></XRippleComponent>
                    Button
                  </button>
                  <button className={`x-btn x-theme-${xThemes[k1]} x-dense ${allBaseVariantClasses}`}
                    type="button">
                    <XRippleComponent></XRippleComponent>
                    Dense
                  </button>
                  <button className={`x-btn x-theme-${xThemes[k1]} ${allBaseVariantClasses}`}
                    type="button" disabled>
                    <XRippleComponent></XRippleComponent>
                    Disabled
                  </button>
                  <button className={`x-btn x-theme-${xThemes[k1]} ${allBaseVariantClasses}`}
                    type="button">
                    <XRippleComponent></XRippleComponent>
                    <span>$</span><span>With multiple children</span></button>
                  <button className={`x-btn x-theme-${xThemes[k1]} ${allBaseVariantClasses}`}
                    type="button">
                    <XRippleComponent></XRippleComponent>
                    With long {'text '.repeat(10)}
                  </button>
                </dd>
              </dl>
            </dd>
          </>)}
        </dl>
      </div>
    </section>
  </>;
}
