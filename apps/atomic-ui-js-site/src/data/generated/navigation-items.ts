import {NavItem} from '../types';

export const navigationItems: NavItem[] = [{
  'label': 'App',
  'uri': '/',
  'alias': 'app',
  'items': [
    {
      'label': 'Components',
      'uri': '/components/',
      'alias': 'components',
      'items': [
        {
          'label': 'App-bar',
          'uri': '/components/app-bar/',
          'alias': 'app-bar'
        },
        {
          'label': 'Button',
          'uri': '/components/button/',
          'alias': 'button'
        },
        {
          'label': 'Card',
          'uri': '/components/card/',
          'alias': 'card'
        },
        {
          'label': 'Checkbox',
          'uri': '/components/checkbox/',
          'alias': 'checkbox'
        },
        {
          'label': 'Colors',
          'uri': '/components/colors/',
          'alias': 'colors'
        },
        {
          'label': 'Copy',
          'uri': '/components/copy/',
          'alias': 'copy'
        },
        {
          'label': 'Field',
          'uri': '/components/field/',
          'alias': 'field'
        },
        {
          'label': 'Input',
          'uri': '/components/input/',
          'alias': 'input'
        },
        {
          'label': 'Menu',
          'uri': '/components/menu/',
          'alias': 'menu'
        },
        {
          'label': 'Radio',
          'uri': '/components/radio/',
          'alias': 'radio'
        },
        {
          'label': 'Ripple',
          'uri': '/components/ripple/',
          'alias': 'ripple'
        },
        {
          'label': 'Spacing',
          'uri': '/components/spacing/',
          'alias': 'spacing'
        },
        {
          'label': 'X-appbar',
          'uri': '/components/x-appbar/',
          'alias': 'x-appbar'
        },
        {
          'label': 'X-back-to-top-btn',
          'uri': '/components/x-back-to-top-btn/',
          'alias': 'x-back-to-top-btn'
        },
        {
          'label': 'X-toggleonscroll',
          'uri': '/components/x-toggleonscroll/',
          'alias': 'x-toggleonscroll'
        }
      ]
    },
    {
      'label': 'Playground',
      'uri': '/playground/',
      'alias': 'playground',
      'items': [
        {
          'label': 'Details-element',
          'uri': '/playground/details-element/',
          'alias': 'details-element'
        },
        {
          'label': 'Example-font-size-sequences',
          'uri': '/playground/example-font-size-sequences/',
          'alias': 'example-font-size-sequences'
        }
      ]
    }
  ]
}];
