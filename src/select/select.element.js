import {AtomicElement} from "../lib/dom/AtomicElement.js";
import styles from './select.element.css';

const mutObserverConfig = {childList: true, subtree: true, attributes: true, attributeFilter: ['selected']},
    mutObserver = new MutationObserver(records => {
    }),

    // In "*.js" styles
    styles = ``,
    styleSheet = new CSSStyleSheet();

// Auto initialize the styles
styleSheet.replace(styles).then(() => null, console.error);

const xSelectLocalName = 'x-select',
    xOptionSelectedClassName = `${xSelectLocalName}-option--selected`
;

class XSelect extends AtomicElement {
    static localName = xSelectLocalName;
    static shadowRootOptions = {mode: 'open', delegatedFocus: true};

    get localName() {
        return this.constructor.localName;
    }

    get selectedIndex() {
        return this.__select?.selectedIndex;
    }

    __select;
    __selectDirty;

    __valueDisplay;
    __valueDisplayDirty;

    __buttons;
    __buttonsDirty;

    __dirty = true;

    get dirty() {
        return this.__dirty;
    }

    set dirty(x) {
        this.__dirty = x;
        if (x) {
            this.update();
        }
    }

    // Element references
    get select() {
        if (!this.__select || this.__selectDirty) {
            this.__select = this.querySelector('select');
            this.__selectDirty = false;
        }
        return this.__select;
    }

    get valueDisplay() {
        if (!this.__valueDisplay || this.__valueDisplayDirty) {
            this.__valueDisplay = this.shadowRoot.querySelector('_value-display');
            this.__valueDisplayDirty = false;
        }
        return this.__valueDisplay;
    }

    get buttons() {
        if (!this.__buttons || this.__buttonsDirty) {
            this.__buttons = this.shadowRoot.querySelectorAll('button');
            this.__buttonsDirty = false;
        }
        return this.__buttons;
    }

    __xSelectInitialized = false;

    onClick = e => {
        const button = e.target.closest('button.x-select-option');
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
        this.select.dispatchEvent(new Event('change', {bubbles: true, composed: true, cancelable: true,}));
    };

    onChange = e => {
        const select = e.target.closest('select');
        if (!select) return;
        this.updateValueDisplay();
    };

    constructor() {
        super();
        this.shadowRoot.addEventListener('click', this.onClick);
        this.shadowRoot.addEventListener('change', this.onChange);
        this.shadowRoot.adoptedStyleSheets = [styleSheet];

        this.__select = null;
        this.__selectDirty = true;

        this.__valueDisplay = null;
        this.__valueDisplayDirty = true;
    }

    connectedCallback() {
        if (this.isConnected && !this.__xSelectInitialized) {
            this.render();
            this.updateValueDisplay();
            mutObserver.observe(this, mutObserverConfig);
        }
    }

    updateValueDisplay() {
        const {select, select: {length}} = this;
        let {selectedIndex} = this;
        let displayValue = '';

        if (!length) {
            displayValue = '';
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
        const {select, select: {selectedIndex}} = this;
        return Array.from(this.select.options).map((x, i) => {
            return `<button class="x-select-option${i === selectedIndex ? ` ${xOptionSelectedClassName}` : ''}"
                        type="button" value="${x.value}" data-index="${i}"
                        tabindex="-1">${x.label}</button>`;
        }).join('\n');
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
    customElements.define(xSelectLocalName, XSelect);
}

