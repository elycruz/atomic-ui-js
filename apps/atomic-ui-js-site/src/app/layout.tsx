import {Metadata} from 'next';
import React from 'react';
import {AppNav} from '@/features/app-nav';
import {AppNavToggle} from '@/components/app-nav-toggle';

import '../css/index.scss';

export const metadata = {
  title: 'Atomic UI Js'
} as Metadata;

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
        <div className="ez-app-wrapper">
          <header className="ez-appbar">
            <div className=" ez-flex ez-flex-row ez-align-items-center">
              <AppNavToggle />

              <hgroup className="ez-appbar__start">
                <a href="/atomic-ui-js"><h1 className="ez-appbar__title">Atomic UI Js</h1></a>
              </hgroup>
            </div>
          </header>

          <div className="ez-flex-row ez-app-content">
            <AppNav />

            <main className="ez-app-main">
              <div>
                {children}
              </div>
            </main>
          </div>

          <footer className="ez-app-footer">
            <div>
              <p>&copy;</p>
            </div>
          </footer>
        </div>
        {/* end of .ez-app-wrapper */}

      </body>
    </html>
  );
}
