import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
  }

  :host > .flex-container {
    display: flex;
    flex-flow: row wrap;
  }

  :host [part~='leading trailing error help']:empty {
    display: none;
  }

  :host [part='error'] {
    color: var(--ez-danger-color-5);
    margin-top: 0.5rem;
  }

  :host [part='help'] {
    font-size: smaller;
  }
`;
