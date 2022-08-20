import {registerCustomElement} from "../utils/dom";
import xMenuStyleSheet from './x-menu.css' assert {type: 'css'};
import {LitElement, html} from 'lit';

export const xMenuName = 'x-menu',

  xMenuTypes = {
    Select: 'select-one',
    SelectMultiple: 'select-multiple',
    Tabs: 'tabs',
    UnorderedList: 'ul',
  },

  xMenuEvNames = {
    Change: 'change',
    Collapse: 'collapse',
    Expand: 'expand',
    Toggle: 'toggle',
  };

const mutObserverInit = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'id']
  },

  mutObserver = new MutationObserver((mutations) => {

  });

class XMenu extends LitElement {
  static get styles() {
    return xMenuStyleSheet;
  }

  static get properties() {
    return {
      defaultValue: {type: String, attribute: 'value', reflect: true},
      value: {type: String, attribute: false},
    }
  }

  // @todo Add FormControl interface

  get localName() {
    return xMenuName;
  }

  #xMenuInitialized = false;

  connectedCallback() {
    super.connectedCallback();
    if (!this.#xMenuInitialized && this.isConnected) {
      mutObserver.observe(this, mutObserverInit);
      this.#xMenuInitialized = true;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#xMenuInitialized = false;
  }

  render() {
    return html`
      <slot></slot>`;
  }
}

registerCustomElement(xMenuName, XMenu);
