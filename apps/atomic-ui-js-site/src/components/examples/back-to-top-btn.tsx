'use client';

import { PropsWithChildren } from 'react';
import EzToggleOnScrollComponent from 'atomic-ui-js-next/ez-toggleonscroll';
import EzRippleComponent from 'atomic-ui-js-next/ez-ripple';

import styles from './back-to-top-btn.module.scss';

export interface BackToTopBtnProps extends PropsWithChildren<any> {
  //<JSX.IntrinsicElements['a']> {
  anchorTarget?: string;
  root?: string | null;
  rootMargin?: string;
  threshold?: number | number[];
  reverse?: boolean;
  toggleTarget?: string;
  className?: string;
  intersectingTarget?: string;
  classNameToToggle?: string;
}

let _uuid = 0;

const defaultClassName = styles['back-to-top-btn-container'],
  defaultClassNameToToggle = styles['back-to-top-btn-container--visible'];

export function BackToTopBtn({
  anchorTarget = '#site-top',
  root,
  rootMargin,
  threshold,
  reverse,
  toggleTarget,
  className: inClassName,
  intersectingTarget = '#site-top',
  classNameToToggle = defaultClassNameToToggle,
  children,
}: BackToTopBtnProps) {
  const id = `back-to-top-btn-${_uuid++}`;

  return (
    <EzToggleOnScrollComponent
      id={id}
      className={[defaultClassName, inClassName ?? ''].join(' ')}
      classNameToToggle={classNameToToggle}
      classNameToToggleTargetSelector={toggleTarget ?? `#${id}`}
      intersectingTargetSelector={intersectingTarget}
      reverse={reverse}
      rootMargin={rootMargin}
      rootSelector={root as string | undefined}
      threshold={threshold}
    >
      <a
        href={anchorTarget}
        className="back-to-top-btn ez-btn ez-filled ez-raised ez-theme-primary"
      >
        <EzRippleComponent></EzRippleComponent>
        {children ?? <span>Back to top</span>}
      </a>
    </EzToggleOnScrollComponent>
  );
}
