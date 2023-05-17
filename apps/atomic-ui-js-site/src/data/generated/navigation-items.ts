import {NavItem} from '../types';

export const navigationItems: NavItem[] = [{
  'label': 'App',
  'uri': '/',
  'alias': 'app',
  'items': [
    {
      'label': 'Components',
      'uri': 'components/',
      'alias': 'components',
      'items': [
        {
          'label': 'Button',
          'uri': 'components/button/',
          'alias': 'button'
        },
        {
          'label': 'Checkbox',
          'uri': 'components/checkbox/',
          'alias': 'checkbox'
        },
        {
          'label': 'Field',
          'uri': 'components/field/',
          'alias': 'field'
        },
        {
          'label': 'Input',
          'uri': 'components/input/',
          'alias': 'input'
        },
        {
          'label': 'Radio',
          'uri': 'components/radio/',
          'alias': 'radio'
        },
        {
          'label': 'Ripple',
          'uri': 'components/ripple/',
          'alias': 'ripple'
        }
      ]
    }
  ]
}];
