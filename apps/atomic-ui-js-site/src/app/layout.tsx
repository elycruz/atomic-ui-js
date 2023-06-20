import React from 'react';
import '../css/index.scss';
import {AppNav} from '../features/app-nav';
import {AppNavToggle} from '@/components/app-nav-toggle';

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
      <div className="x-app-wrapper">
        <header className="x-app-bar">
          <div className=" x-flex x-flex-row x-align-items-center">
            <AppNavToggle />

            <hgroup className="x-app-bar__start">
              <a href="/atomic-ui-js"><h1 className="x-app-bar__title">Atomic UI Js</h1></a>
            </hgroup>
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
      </div>
      {/* end of .x-app-wrapper */}

      </body>
    </html>
  );
}
