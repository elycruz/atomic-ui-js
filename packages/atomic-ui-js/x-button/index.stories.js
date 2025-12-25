import {xThemes, xVariants} from '../utils';
import {html} from 'lit';

export default {
  title: 'CSS Components/Button'
};

const partitionedVariants = Object.entries(xVariants).reduce((agg, [k, v]) => {
    if (/large|small|normal|medium/.test(v + '')) {
      agg[1][k] = v;
    }
    agg[0][k] = v;
    return agg;
  }, [{}, {}]),

  [filteredVariants, sizeVariants] = partitionedVariants;

const sizeVariantKeys = Object.keys(sizeVariants);

export const Variations = {
  render: () => html`
    <section class="buttons-section">
      <header>
        <h2>Button</h2>
      </header>

      <div class="x-section-body">
        <dl>
          <dt>Pure Buttons</dt>
          <dd class="x-btn-group">
            ${sizeVariantKeys.map(k3 => html`
              <button class="${`x-${sizeVariants[k3]}`}"
                      type="button">
                ${k3}
              </button>`)}
          </dd>
          <dt>Button Sizes</dt>
          <dd class="x-btn-group">
            <button class="x-btn x-theme-primary x-outlined" type="button">
              <x-ripple></x-ripple>
              <span>Default</span>
            </button>
            ${sizeVariantKeys.map(k3 => k3 === 'Normal' ? '' : html`
              <button class="${`x-btn x-${sizeVariants[k3]} x-theme-primary x-outlined`}"
                      type="button">
                <x-ripple></x-ripple>
                <span>${k3}</span>
              </button>`)}
          </dd>
        </dl>
      </div>

      <div class="x-section-body">
        <h3>Button Varieties</h3>

        <dl>
          ${Variaties()}
        </dl>
      </div>
    </section>
  `
};

const Variaties = () => Object.keys(xThemes).map(k1 => {
  const themeClassSuffix = xThemes[k1];

  return html`
    <dt>${k1}</dt>
      ${Object.keys(filteredVariants).map((k2) => {
    const variantClassSuffix = xVariants[k2],
      variantClassName = variantClassSuffix ? ` x-${variantClassSuffix}` : '';

    return html`<dd>
      <dl>
        <dt>${k2}</dt>
        <dd class="x-btn-group">
          ${k2 !== 'Small' && k2 !== 'Large' ? html`
            <button class="${`x-btn x-theme-${themeClassSuffix}${variantClassName}`}" type="button">
              <x-ripple></x-ripple>
              <span>Default</span>
            </button>` : ''}
          <button class="${`x-btn x-theme-${themeClassSuffix}${variantClassName}`}" type="button" disabled>
            <x-ripple></x-ripple>
            <span>Disabled</span>
          </button>
          <button class="${`x-btn x-theme-${themeClassSuffix}${variantClassName}`}" type="button">
            <x-ripple></x-ripple>
            <span>$</span><span>With multiple children</span>
          </button>
          ${Object.keys(sizeVariants).map(k3 => k3 === 'Normal' ? '' : html`
            <button class="${`x-btn x-theme-${themeClassSuffix}${variantClassName} x-${sizeVariants[k3]}`}"
                    type="button">
              <x-ripple></x-ripple>
              <span>${k3}</span>
            </button>`)}
        </dd>
      </dl>
    </dd>`;
  })}
  `;
});
