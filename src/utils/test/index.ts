import {render, TemplateResult} from 'lit';
import {FormControl} from "../../ecms-base";

export const bootstrapElement = <T extends HTMLElement>(
  testName: string,
  tmplRslt: TemplateResult,
  props: any,
  selector: string,
  elmToAppendTo?: HTMLElement
  ): Promise<[HTMLElement, T]> => {
    const container = document.createElement('div') as HTMLElement,
      p = document.createElement('p');
    (elmToAppendTo || document.body).appendChild(container);
    render(tmplRslt, container);
    container.prepend(p);
    p.textContent = testName;
    const element = container.querySelector(selector) as T;
    if (props) {
      Object.assign(element, props);
    }
    return Promise.resolve([container, element]);
  },

  dispatchesEvent = async <T extends HTMLElement>(elm: T, triggerFn: () => Promise<any>, evName: string, timeout = 300): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      try {
        const listener = () => {
          elm.removeEventListener(evName, listener);
          resolve(true);
        };
        elm.addEventListener(evName, listener);
        triggerFn()
          .then(() => setTimeout(() => resolve(false), timeout))
      } catch (e) {
        reject(e);
      }
    });
  },

  assertDispatchesEvent = async <T extends HTMLElement>(
    elm: T,
    eventTriggerFn: () => Promise<any>,
    evName: string,
    expected = true,
    timeout = 300,
    errMessage = ''
  ) =>
    dispatchesEvent(elm, eventTriggerFn, evName, timeout)
      .then(rslt => expect(rslt).toEqual(expected, errMessage || `Expected "${evName}" to trigger after \`triggerFn\` call`)),

  /**
   * Tests disabled state - Tests that property is reflected to attribute, button is/is-not clickable,
   * tabindex matches expected, and compares property value against expected value.
   */
  assertDisabledState = async (eb: FormControl, disabled: boolean): Promise<any> => {
    const attribErrMsg = `should ${disabled ? 'not' : ''} contain "disabled" attribute`,
      propErrMsg = `should ${disabled ? 'not' : ''} contain \`disabled\` property`;
    expect(eb.disabled).toEqual(disabled, propErrMsg);
    expect(eb.hasAttribute('disabled')).toEqual(disabled, attribErrMsg);
    expect(eb.tabIndex).toEqual(disabled ? -1 : 0);
    return assertDispatchesEvent(eb, async () => eb.click(), 'click', !disabled);
  },

  /**
   * Asserts that property value has reflected to an attribute and that property has expected value.
   */
  assertReflectivePropValue = (eb: HTMLElement, propName: string, attribName: string, expected: any) => {
    const attribErrMsg = `${attribName} should equal "${expected}"`,
      propErrMsg = `${attribName} should equal "${expected}"`;
    expect(eb[propName]).toEqual(expected, propErrMsg);
    expect(eb.getAttribute(attribName)).toEqual(expected + '', attribErrMsg);
  },

  /**
   * Asserts that property value has reflected to an attribute and that property has expected value.
   */
  assertReflectiveBoolPropValue = (elm: HTMLElement, propName: string, attribName: string, expected: any) => {
    const attribErrMsg = `${attribName} should equal "${expected}"`,
      propErrMsg = `${attribName} should equal "${expected}"`;
    expect(elm[propName]).toEqual(expected, propErrMsg);
    expect(elm.hasAttribute(attribName)).toEqual(!!expected, attribErrMsg);
  };
