import React from 'react';
import '../css/index.css';
import {AppNav} from "../features/app-nav";

export const metadata = {
  title: 'Atomic UI Js'
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
          <AppNav />

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
