export default function CardComponent() {
  return (
    <section>
      <header>
        <h3>Card Component</h3>
      </header>
      <article>
        <div className="ez-card">
          <header>
            <span className="ez-h4">Card Title</span>
          </header>
          <section className="ez-card-body">
            <p>Card Body</p>
          </section>
          <footer className="ez-card-footer">
            <p>Card Footer</p>
          </footer>
        </div>
      </article>
    </section>
  );
}
