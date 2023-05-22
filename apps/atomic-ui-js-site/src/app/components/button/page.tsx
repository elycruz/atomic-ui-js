import {xThemes, xVariants, classNames} from 'atomic-ui-js/utils';

let _uuid = 0;

export default function ButtonPage() {
  return <>
    <section className="buttons-section">
      <header>
        <h2>Button</h2>
      </header>
      <div className="x-section-body">
        <h3>Button Varieties</h3>

        <dl>
          {['x-btn', 'x-button', ''].map(classNameSuffix => <>
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
      </div>
    </section>
  </>;
}
