import { NavItem } from '../types';

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
          'label': 'Input',
          'uri': '/css-components/input/',
          'alias': 'input'
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
          'label': 'Ez-appbar',
          'uri': '/custom-elements/ez-appbar/',
          'alias': 'ez-appbar'
        },
        {
          'label': 'Ez-field',
          'uri': '/custom-elements/ez-field/',
          'alias': 'ez-field'
        },
        {
          'label': 'Ez-input',
          'uri': '/custom-elements/ez-input/',
          'alias': 'ez-input',
          'items': [
            {
              'label': 'Alignment',
              'uri': '/custom-elements/ez-input/alignment/',
              'alias': 'alignment'
            }
          ]
        },
        {
          'label': 'Ez-menu',
          'uri': '/custom-elements/ez-menu/',
          'alias': 'ez-menu'
        },
        {
          'label': 'Ez-ripple',
          'uri': '/custom-elements/ez-ripple/',
          'alias': 'ez-ripple'
        },
        {
          'label': 'Ez-toggleonscroll',
          'uri': '/custom-elements/ez-toggleonscroll/',
          'alias': 'ez-toggleonscroll'
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
