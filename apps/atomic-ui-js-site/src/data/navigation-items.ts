import {NavItem} from "./types";

export const navigationItems: NavItem[] = [{
  label: 'Components',
  uri: 'components',
  alias: 'components',
  className: 'app-nav',
  items: [
    {
      label: 'Input',
      uri: 'components/input',
      alias: 'input'
    },
    {
      label: 'Checkbox',
      uri: 'components/checkbox',
      alias: 'checkbox'
    },
  ]
}];

/*
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
            <h3>Custom Elements</h3>
            <ul className="x-menu">
              <li><a href="#x-field">X-Field</a></li>
              <li><a href="#x-ripple/index.html">X-Ripple</a></li>
            </ul>
            <h3>Experiments</h3>
            <ul className="x-menu">
              <li><a href="#example-font-size-sequences-for-inspection.html">Example Font-Size Sequences</a></li>
            </ul>
          </nav>
 */
