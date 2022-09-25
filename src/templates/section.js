import {html} from 'lit';

export const section = (title, content) => html`
  <section>
    <header>${title}</header>
    <article>
      ${content}
    </article>
  </section>
`;
