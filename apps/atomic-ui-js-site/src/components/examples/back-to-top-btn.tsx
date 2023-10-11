'use client';

import {PropsWithChildren} from 'react';
import XToggleOnScrollComponent from 'atomic-ui-js-next/x-toggleonscroll';
import XRippleComponent from 'atomic-ui-js-next/x-ripple';

import styles from './back-to-top-btn.module.scss';

export interface BackToTopBtnProps extends PropsWithChildren<any> { //<JSX.IntrinsicElements['a']> {
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

const defaultClassName = styles['back-to-top-btn-container'],
  defaultClassNameToToggle = styles['back-to-top-btn-container--visible'];
export function BackToTopBtn({
  anchorTarget = '#site-top',
  root,
  rootMargin = '-200px 0px 0px 0px',
  threshold = [0.5, 1],
  reverse = true,
  toggleTarget = `.${defaultClassName}`,
  className: inClassName,
  intersectingTarget = '#site-top',
  classNameToToggle = defaultClassNameToToggle,
  children
}: BackToTopBtnProps) {
  return <XToggleOnScrollComponent
    className={[defaultClassName, inClassName ?? ''].join(' ')}
    classNameToToggle={classNameToToggle}
    classNameToToggleTargetSelector={toggleTarget}
    intersectingTargetSelector={intersectingTarget}
    reverse={reverse}
    rootMargin={rootMargin}
    rootSelector={root}
    threshold={threshold}
  >
    <a href={anchorTarget} className="back-to-top-btn x-btn x-filled x-raised x-theme-primary">
      <XRippleComponent></XRippleComponent>
      {!children ? <span>Back to top</span> : children}
    </a>
  </XToggleOnScrollComponent>;
}
