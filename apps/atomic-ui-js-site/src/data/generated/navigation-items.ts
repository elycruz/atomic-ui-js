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
          'label': 'Ripple',
          'uri': '/components/ripple/',
          'alias': 'ripple'
        },
        {
          'label': 'X-appbar',
          'uri': '/components/x-appbar/',
          'alias': 'x-appbar'
        },
        {
          'label': 'X-toggleonscroll',
          'uri': '/components/x-toggleonscroll/',
          'alias': 'x-toggleonscroll'
        }
      ]
    },
    {
      'label': 'Css-components',
      'uri': '/css-components/',
      'alias': 'css-components',
      'items': [
        {
          'label': 'App-bar',
          'uri': '/css-components/app-bar/',
          'alias': 'app-bar'
        },
        {
          'label': 'Button',
          'uri': '/css-components/button/',
          'alias': 'button'
        },
        {
          'label': 'Card',
          'uri': '/css-components/card/',
          'alias': 'card'
        },
        {
          'label': 'Checkbox',
          'uri': '/css-components/checkbox/',
          'alias': 'checkbox'
        },
        {
          'label': 'Colors',
          'uri': '/css-components/colors/',
          'alias': 'colors'
        },
        {
          'label': 'Copy',
          'uri': '/css-components/copy/',
          'alias': 'copy'
        },
        {
          'label': 'Radio',
          'uri': '/css-components/radio/',
          'alias': 'radio'
        },
        {
          'label': 'Spacing',
          'uri': '/css-components/spacing/',
          'alias': 'spacing'
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
