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
        <div className="x-app-wrapper">
          <header className="x-appbar">
            <div className=" x-flex x-flex-row x-align-items-center">
              <AppNavToggle />

              <hgroup className="x-appbar__start">
                <a href="/atomic-ui-js"><h1 className="x-appbar__title">Atomic UI Js</h1></a>
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
