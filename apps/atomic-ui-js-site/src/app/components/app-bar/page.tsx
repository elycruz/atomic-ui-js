import {xVariants, classNames} from 'atomic-ui-js/utils';

export default function AppBarPage() {
  return <section>
    <header>
      <h2>AppBar</h2>
    </header>
    <article>
      <div>
        {Object.entries(xVariants)
          .map(([k, v], i) => {
            const className = classNames('x-app-bar',
              {
                [`x-${v}`]: !!v
              });

            return <header key={`app-header-${Date.now()}-${i}`}
              className={className}>
              <hgroup>
                <h3>AppHeader{v ? ` (${k})` : null}</h3>
              </hgroup>
            </header>;
          })}
      </div>
    </article>
  </section>;
}
