
export class AtomicElement extends HTMLElement {
    static styles = null;
    static properties = null;
    static localName = '';
    static shadowRootOptions = {mode: 'open'};

    get localName() {
        return this.constructor.localName;
    }

    constructor() {
        super();
        this.attachShadow(this.constructor.shadowRootOptions);
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    addEventListeners() {
    }

    removeEventListeners() {
    }

    requestUpdate() {
    }

    willUpdate() {
    }

    shouldUpdate() {
    }

    firstUpdated() {
    }

    update() {
    }

    updated() {
    }

    render() {
    }
}

