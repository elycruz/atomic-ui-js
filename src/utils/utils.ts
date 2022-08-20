import {noop, isset} from 'fjl';

let _uuid = 0;

export * from './classNameFromProps';
export * from './debounce';
export * from './dom/dom';

export {noop};

export const

  uuid = (prefix = 'components-') => prefix + _uuid++,

  preventDefaultHandling = () => e => e.preventDefault(),

  extractNamesToAttribsStr = (ctx, names = []) => names
    .filter(x => isset(ctx[x]))
    .map(x => `${x}="${ctx[x]}"`)
    .join(' ')
    .trim(),

  throwNoOverrideError = () => {
    throw new Error(`Should override method from extending class.`);
  },

  waitFor = async (timeout: number): Promise<any> => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout || 0);
    });
  };
