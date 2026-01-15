import { xThemes, xVariants } from '../utils';
import { html } from 'lit';

export default {
  title: 'CSS Components/Button',
};

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
  [filteredVariants, sizeVariants] = partitionedVariants,
  sizeVariantKeys = Object.keys(sizeVariants);

export const Variations = {
  render: () => html`
    <section class="buttons-section">
      <header>
        <h2>Button</h2>
      </header>

      <div class="ez-section-body">
        <dl>
          <dt>Pure Buttons</dt>
          <dd class="ez-btn-group">
            ${sizeVariantKeys.map(
              k3 =>
                html` <button class="${`ez-${sizeVariants[k3]}`}" type="button">
                  ${k3}
                </button>`
            )}
          </dd>
          <dt>Button Sizes</dt>
          <dd class="ez-btn-group">
            <button class="ez-btn ez-theme-primary ez-outlined" type="button">
              <ez-ripple></ez-ripple>
              <span>Default</span>
            </button>
            ${sizeVariantKeys.map(k3 =>
              k3 === 'Normal'
                ? ''
                : html` <button
                    class="${`ez-btn ez-${sizeVariants[k3]} ez-theme-primary ez-outlined`}"
                    type="button"
                  >
                    <ez-ripple></ez-ripple>
                    <span>${k3}</span>
                  </button>`
            )}
          </dd>
        </dl>
      </div>

      <div class="ez-section-body">
        <h3>Button Varieties</h3>

        <dl>${Variaties()}</dl>
      </div>
    </section>
  `,
};

const Variaties = () =>
  Object.keys(xThemes).map(k1 => {
    const themeClassSuffix = xThemes[k1];

    return html`
      <dt>${k1}</dt>
      ${Object.keys(filteredVariants).map(k2 => {
        const variantClassSuffix = xVariants[k2],
          variantClassName = variantClassSuffix
            ? ` ez-${variantClassSuffix}`
            : '';

        return html`<dd>
          <dl>
            <dt>${k2}</dt>
            <dd class="ez-btn-group">
              ${k2 !== 'Small' && k2 !== 'Large'
                ? html` <button
                    class="${`ez-btn ez-theme-${themeClassSuffix}${variantClassName}`}"
                    type="button"
                  >
                    <ez-ripple></ez-ripple>
                    <span>Default</span>
                  </button>`
                : ''}
              <button
                class="${`ez-btn ez-theme-${themeClassSuffix}${variantClassName}`}"
                type="button"
                disabled
              >
                <ez-ripple></ez-ripple>
                <span>Disabled</span>
              </button>
              <button
                class="${`ez-btn ez-theme-${themeClassSuffix}${variantClassName}`}"
                type="button"
              >
                <ez-ripple></ez-ripple>
                <span>$</span><span>With multiple children</span>
              </button>
              ${Object.keys(sizeVariants).map(k3 =>
                k3 === 'Normal'
                  ? ''
                  : html` <button
                      class="${`ez-btn ez-theme-${themeClassSuffix}${variantClassName} ez-${sizeVariants[k3]}`}"
                      type="button"
                    >
                      <ez-ripple></ez-ripple>
                      <span>${k3}</span>
                    </button>`
              )}
            </dd>
          </dl>
        </dd>`;
      })}
    `;
  });
