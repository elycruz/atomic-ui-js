import { xVariants, classNames } from 'atomic-ui-js/utils';

export default function AppBarPage() {
  return (
    <section>
      <header>
        <h2>AppBar</h2>
      </header>
      <article>
        <div className="ez-theme-primary">
          <p>Supplies the hide and show animation on user scroll.</p>
          {Object.entries(xVariants).map(([k, v], i) => {
            const className = classNames('ez-appbar', {
              [`ez-${v}`]: !!v,
            });

            return (
              <header
                key={`app-header-${Date.now()}-${i}`}
                className={className}
              >
                <hgroup>
                  <span className="ez-h3">Title{v ? ` (${k})` : null}</span>
                </hgroup>
              </header>
            );
          })}
        </div>
      </article>
    </section>
  );
}
