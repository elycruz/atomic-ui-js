import {xThemes, xVariants} from 'atomic-ui-js/utils';
import XRippleComponent from 'atomic-ui-js-next/x-ripple';

const partitionedVariants = Object.entries(xVariants).reduce((agg, [k, v]) => {
    if (/large|small|normal|medium/.test(v + '')) {
      agg[1][k] = v;
    } if (v.toLowerCase() === 'dense') {
      return agg;
    } else {
      agg[0][k] = v;
    }
    return agg;
  }, [{}, {}]),

  [filteredVariants, sizeVariants] = partitionedVariants;

export default function ButtonPage() {
  return <>
    <section className="buttons-section">
      <header>
        <h2>Button</h2>
      </header>

      <div className="x-section-body">
        <dl>
          <dt>Pure Buttons</dt>
          <dd className="x-btn-group">
            {Object.keys(sizeVariants).map(k3 => k3 === 'Dense' ? null :
              <button key={`pure-sized-button-${k3}`}
                className={`x-${sizeVariants[k3]}`}
                type="button">
                {k3}
              </button>)}
          </dd>
          <dt>Button Sizes</dt>
          <dd className="x-btn-group">
            <button className="x-btn x-theme-primary x-outlined" type="button">
              <XRippleComponent></XRippleComponent>
              <span>Default</span>
            </button>
            {Object.keys(sizeVariants).map(k3 => k3 === 'Normal' ? null :
              <button key={`sized-button-${k3}`}
                className={`x-btn x-${sizeVariants[k3]} x-theme-primary x-outlined`}
                type="button">
                <XRippleComponent></XRippleComponent>
                <span>{k3}</span>
              </button>)}
          </dd>
        </dl>
      </div>

      <div className="x-section-body">
        <h3>Button Varieties</h3>

        <dl>
          {Object.keys(xThemes).map(k1 => {
            const themeClassSuffix = xThemes[k1];
            return <>
              <dt>{k1}</dt>

              {Object.keys(filteredVariants).map(k2 => {
                const variantClassSuffix = xVariants[k2],
                  variantClassName = variantClassSuffix ? ` x-${variantClassSuffix}` : '';

                return <dd key={`dd-2.${k2}`}>
                  <dl>
                    <dt>{k2}</dt>
                    <dd className="x-btn-group">
                      {k2 !== 'Dense' && k2 !== 'Small' && k2 !== 'Large' ?
                        <button className={`x-btn x-theme-${themeClassSuffix}${variantClassName}`} type="button">
                          <XRippleComponent></XRippleComponent>
                          <span>Default</span>
                        </button> : null}
                      <button className={`x-btn x-theme-${themeClassSuffix}${variantClassName}`} type="button" disabled>
                        <XRippleComponent></XRippleComponent>
                        <span>Disabled</span>
                      </button>
                      <button className={`x-btn x-theme-${themeClassSuffix}${variantClassName}`} type="button">
                        <XRippleComponent></XRippleComponent>
                        <span>$</span><span>With multiple children</span>
                      </button>
                      {Object.keys(sizeVariants).map(k3=> k3 === 'Normal' ? null :
                        <button key={`${k1}-${k2}-${k3}`} className={`x-btn x-theme-${themeClassSuffix}${variantClassName} x-${sizeVariants[k3]}`}
                          type="button">
                          <XRippleComponent></XRippleComponent>
                          <span>{k3}</span>
                        </button>)}
                    </dd>
                  </dl>
                </dd>;
              })}
            </>;
          })}
        </dl>
      </div>
    </section>
  </>;
}
