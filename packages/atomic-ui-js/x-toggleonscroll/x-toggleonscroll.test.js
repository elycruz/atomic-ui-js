import {expect, fixture} from '@open-wc/testing';

import {XToggleOnScrollElement} from './';

const {describe, it} = window;

describe(`${XToggleOnScrollElement.localName}`, () => {
  it('should be instantiable', async () => {
    const el = await fixture('<x-toggleonscroll></x-toggleonscroll>');
    expect(el).to.be.instanceof(XToggleOnScrollElement);
  });
});
