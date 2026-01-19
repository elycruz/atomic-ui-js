import { xThemes, xVariants } from 'atomic-ui-js/utils';
import EzRippleComponent from 'atomic-ui-js-next/ez-ripple';

const partitionedVariants = Object.entries(xVariants).reduce(
    (agg, [k, v]) => {
      if (/large|small|normal|medium/.test(v + '')) {
        agg[1][k] = v;
      }
      agg[0][k] = v;
      return agg;
    },
    [{}, {}]
  ),
  [filteredVariants, sizeVariants] = partitionedVariants;

export default function ButtonPage() {
  return (
    <>
      <section className="buttons-section">
        <header>
          <h2>Button</h2>
        </header>

        <div className="ez-section-body">
          <dl>
            <dt>Pure Buttons</dt>
            <dd className="ez-btn-group">
              {Object.keys(sizeVariants).map(k3 => (
                <button
                  key={`pure-sized-button-${k3}`}
                  className={`ez-${sizeVariants[k3]}`}
                  type="button"
                >
                  {k3}
                </button>
              ))}
            </dd>
            <dt>Button Sizes</dt>
            <dd className="ez-btn-group">
              <button
                className="ez-btn ez-theme-primary ez-outlined"
                type="button"
              >
                <EzRippleComponent></EzRippleComponent>
                <span>Default</span>
              </button>
              {Object.keys(sizeVariants).map(k3 =>
                k3 === 'Normal' ? null : (
                  <button
                    key={`sized-button-${k3}`}
                    className={`ez-btn ez-${sizeVariants[k3]} ez-theme-primary ez-outlined`}
                    type="button"
                  >
                    <EzRippleComponent></EzRippleComponent>
                    <span>{k3}</span>
                  </button>
                )
              )}
            </dd>
          </dl>
        </div>

        <div className="ez-section-body">
          <h3>Button Varieties</h3>

          <dl>
            {Object.keys(xThemes).map(k1 => {
              const themeClassSuffix = xThemes[k1];

              return (
                <>
                  <dt>{k1}</dt>

                  {Object.keys(filteredVariants).map(k2 => {
                    const variantClassSuffix = xVariants[k2],
                      variantClassName = variantClassSuffix
                        ? ` ez-${variantClassSuffix}`
                        : '';

                    return (
                      <dd key={`dd-2.${k2}`}>
                        <dl>
                          <dt>{k2}</dt>
                          <dd className="ez-btn-group">
                            {k2 !== 'Small' && k2 !== 'Large' ? (
                              <button
                                className={`ez-btn ez-theme-${themeClassSuffix}${variantClassName}`}
                                type="button"
                              >
                                <EzRippleComponent></EzRippleComponent>
                                <span>Default</span>
                              </button>
                            ) : null}
                            <button
                              className={`ez-btn ez-theme-${themeClassSuffix}${variantClassName}`}
                              type="button"
                              disabled
                            >
                              <EzRippleComponent></EzRippleComponent>
                              <span>Disabled</span>
                            </button>
                            <button
                              className={`ez-btn ez-theme-${themeClassSuffix}${variantClassName}`}
                              type="button"
                            >
                              <EzRippleComponent></EzRippleComponent>
                              <span>$</span>
                              <span>With multiple children</span>
                            </button>
                            {Object.keys(sizeVariants).map(k3 =>
                              k3 === 'Normal' ? null : (
                                <button
                                  key={`${k1}-${k2}-${k3}`}
                                  className={`ez-btn ez-theme-${themeClassSuffix}${variantClassName} ez-${sizeVariants[k3]}`}
                                  type="button"
                                >
                                  <EzRippleComponent></EzRippleComponent>
                                  <span>{k3}</span>
                                </button>
                              )
                            )}
                          </dd>
                        </dl>
                      </dd>
                    );
                  })}
                </>
              );
            })}
          </dl>
        </div>
      </section>
    </>
  );
}
