import {css} from 'lit';

export default css`:host {
  display: inline-block;
}

:host .error-message {
  color: var(--x-danger-color-5);
  margin-top: 0.5rem;
}

:host .error-message:empty {
  display: none;
}

:host [name="help"] {
  font-size: smaller;
}

:host > .flex-container {
  display: flex;
  flex-flow: row wrap;
}
`;
