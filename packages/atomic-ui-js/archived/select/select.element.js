import { AtomicElement } from "../lib/dom/ez-atomic.js";
import styles from "./select.element.css";

const mutObserverConfig = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["selected"],
  },
  mutObserver = new MutationObserver(() => {
  }),
  // In "*.js" styles
  styles = ``,
  styleSheet = new CSSStyleSheet();

// Auto initialize the styles
styleSheet.replace(styles).then(() => null, console.error);

const xSelectLocalName = "ez-select",
  xOptionSelectedClassName = `${xSelectLocalName}-option--selected`;

class EzSelect extends AtomicElement {
  static localName = xSelectLocalName;
  static shadowRootOptions = { mode: "open", delegatedFocus: true };

  get localName() {
    return this.constructor.localName;
  }

  get selectedIndex() {
    return this.#_select?.selectedIndex;
  }

  #_select;
  #_selectDirty;

  #_valueDisplay;
  #_valueDisplayDirty;

  #_buttons;
  #_buttonsDirty;

  #_dirty = true;

  get dirty() {
    return this.#_dirty;
  }

  set dirty(x) {
    this.#_dirty = x;
    if (x) {
      this.update();
    }
  }

  // Element references
  get select() {
    if (!this.#_select || this.#_selectDirty) {
      this.#_select = this.querySelector("select");
      this.#_selectDirty = false;
    }
    return this.#_select;
  }

  get valueDisplay() {
    if (!this.#_valueDisplay || this.#_valueDisplayDirty) {
      this.#_valueDisplay = this.shadowRoot.querySelector("_value-display");
      this.#_valueDisplayDirty = false;
    }
    return this.#_valueDisplay;
  }

  get buttons() {
    if (!this.#_buttons || this.#_buttonsDirty) {
      this.#_buttons = this.shadowRoot.querySelectorAll("button");
      this.#_buttonsDirty = false;
    }
    return this.#_buttons;
  }

  #_xSelectInitialized = false;

  onClick = (e) => {
    const button = e.target.closest("button.ez-select-option");
    if (!button) return;
    let index = -1;
    if (button.dataset.index) {
      index = parseInt(button.dataset.index, 10);
    } else {
      const limit = this.select.length;
      for (let i = 0; i < limit; i += 1) {
        const item = this.select.options.item(i);
        if (item.isSameNode(button)) {
          index = i;
          break;
        }
      }
    }

    this.select.selectedIndex = index;
    this.select.dispatchEvent(
      new Event("change", { bubbles: true, composed: true, cancelable: true }),
    );
  };

  onChange = (e) => {
    const select = e.target.closest("select");
    if (!select) return;
    this.updateValueDisplay();
  };

  constructor() {
    super();
    this.shadowRoot.addEventListener("click", this.onClick);
    this.shadowRoot.addEventListener("change", this.onChange);
    this.shadowRoot.adoptedStyleSheets = [styleSheet];

    this.#_select = null;
    this.#_selectDirty = true;

    this.#_valueDisplay = null;
    this.#_valueDisplayDirty = true;
  }

  connectedCallback() {
    if (this.isConnected && !this.#_xSelectInitialized) {
      this.render();
      this.updateValueDisplay();
      mutObserver.observe(this, mutObserverConfig);
    }
  }

  updateValueDisplay() {
    const { select, select: { length } } = this;
    const { selectedIndex } = this;
    let displayValue = "";

    if (!length) {
      displayValue = "";
    } else if (selectedIndex === -1) {
      displayValue = select.options.item(0).label;
    } else {
      displayValue = select.options.item(selectedIndex).label;
      this.buttons.forEach((b, i) => {
        b.classList.toggle(xOptionSelectedClassName, i === selectedIndex);
        b.ariaSelected = i === selectedIndex;
      });
    }
    this.valueDisplay.innerHTML = displayValue;
  }

  renderOptions() {
    const { select: { selectedIndex } } = this;
    return Array.from(this.select.options).map((x, i) => {
      return `<button class="ez-select-option${
        i === selectedIndex ? ` ${xOptionSelectedClassName}` : ""
      }"
                        type="button" value="${x.value}" data-index="${i}"
                        tabindex="-1">${x.label}</button>`;
    }).join("\n");
  }

  render() {
    this.shadowRoot.innerHTML = `
<link rel="stylesheet" href="select.element.css" />
<button type="button" id="value-display">&nbsp;</button>
<div id="options">${this.renderOptions()}</div>
<slot></slot>
    `;
  }
}

// Register element
if (!customElements.get(xSelectLocalName)) {
  customElements.define(xSelectLocalName, EzSelect);
}
