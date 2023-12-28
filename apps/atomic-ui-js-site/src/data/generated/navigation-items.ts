import {NavItem} from '../types';

export const navigationItems: NavItem[] = [{
  'label': 'App',
  'uri': '/',
  'alias': 'app',
  'items': [
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
      'label': 'Custom-elements',
      'uri': '/custom-elements/',
      'alias': 'custom-elements',
      'items': [
        {
          'label': 'X-appbar',
          'uri': '/custom-elements/x-appbar/',
          'alias': 'x-appbar'
        },
        {
          'label': 'X-field',
          'uri': '/custom-elements/x-field/',
          'alias': 'x-field'
        },
        {
          'label': 'X-input',
          'uri': '/custom-elements/x-input/',
          'alias': 'x-input',
          'items': [
            {
              'label': 'Alignment',
              'uri': '/custom-elements/x-input/alignment/',
              'alias': 'alignment'
            }
          ]
        },
        {
          'label': 'X-menu',
          'uri': '/custom-elements/x-menu/',
          'alias': 'x-menu'
        },
        {
          'label': 'X-ripple',
          'uri': '/custom-elements/x-ripple/',
          'alias': 'x-ripple'
        },
        {
          'label': 'X-toggleonscroll',
          'uri': '/custom-elements/x-toggleonscroll/',
          'alias': 'x-toggleonscroll'
        }
      ]
    },
    {
      'label': 'Other',
      'uri': '/other/',
      'alias': 'other',
      'items': [
        {
          'label': 'Size-reference',
          'uri': '/other/size-reference/',
          'alias': 'size-reference'
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
