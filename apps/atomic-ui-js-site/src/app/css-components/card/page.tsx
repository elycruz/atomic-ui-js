export default function CardComponent () {
  return <section>
    <header>
      <h3>Card Component</h3>
    </header>
    <article>
      <div className="x-card">
        <header><span className="x-h4">Card Title</span></header>
        <section className="x-card-body">
          <p>Card Body</p>
        </section>
        <footer className="x-card-footer">
          <p>Card Footer</p>
        </footer>
      </div>
    </article>
  </section>;
}
