'use client';

import React from 'react';

export function AppNavToggle() {
  const onClick = e => {
    e.preventDefault();
    e.currentTarget.ownerDocument.documentElement.classList.toggle('with-app-nav-hidden');
  };

  return (
    <button className="x-hamburger-btn x-btn"
      onClick={onClick}><i className="mds-icon">menu</i></button>
  );
}
