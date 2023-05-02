import React from 'react';
import '../css/index.stories.css';

export const metadata = {
  charset: 'UTF-8',
  viewport: 'width=device-width,initial-scale=1',
  title: 'Atomic UI Js',
  base: {
    href: './'
  }
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="x-app-header">
          <div>
            <div className="x-app-header__title x-flex x-flex-row x-align-items-center">
              <button className="x-hamburger-btn x-btn"><i className="mds-icon">menu</i></button>
              <h1>Atomic UI Js</h1>
            </div>
          </div>
        </header>

        <div className="x-flex-row x-app-content">
          <nav className="x-app-nav">
            <h3>Css Components</h3>
            <ul className="x-menu">
              <li><a href="#button.html">Button</a></li>
              <li><a href="#checkbox.html">Checkbox</a></li>
              <li><a href="#copy.html">Copy</a></li>
              <li><a href="#colors.html">Colors</a></li>
              <li><a href="#form-controls.html">Form Controls</a></li>
              <li><a href="#form-controls-decorated.html">Form Controls - Decorated</a></li>
              <li><a href="#input.html">Input</a></li>
              <li><a href="#material/button.html">Material Design</a>
                <ul>
                  <li><a href="#material/button.html">Button</a></li>
                </ul>
              </li>
              <li><a href="#radio.html">Radio</a></li>
              <li><a href="#spacing.html">Spacing</a></li>
            </ul>
            <h3>Components</h3>
            <ul className="x-menu">
              <li><a href="#x-field">X-Field</a></li>
              <li><a href="#x-ripple/index.html">X-Ripple</a></li>
            </ul>
            <h3>Experiments</h3>
            <ul className="x-menu">
              <li><a href="#example-font-size-sequences-for-inspection.html">Example Font-Size Sequences</a></li>
            </ul>
          </nav>

          <main className="x-app-main">
            <div>
              {children}
            </div>
          </main>
        </div>

        <footer className="x-app-footer">
          <div>
            <p>&copy;</p>
          </div>
        </footer>

      </body>
    </html>
  );
}
