import {NavItem} from '../types';

export const navigationItems: NavItem[] = [{
  'label': 'App',
  'uri': 'atomic-ui-js/',
  'alias': 'app',
  'items': [
    {
      'label': 'Components',
      'uri': 'atomic-ui-js/components/',
      'alias': 'components',
      'items': [
        {
          'label': 'Button',
          'uri': 'atomic-ui-js/components/button/',
          'alias': 'button'
        },
        {
          'label': 'Checkbox',
          'uri': 'atomic-ui-js/components/checkbox/',
          'alias': 'checkbox'
        },
        {
          'label': 'Colors',
          'uri': 'atomic-ui-js/components/colors/',
          'alias': 'colors'
        },
        {
          'label': 'Field',
          'uri': 'atomic-ui-js/components/field/',
          'alias': 'field'
        },
        {
          'label': 'Input',
          'uri': 'atomic-ui-js/components/input/',
          'alias': 'input'
        },
        {
          'label': 'Radio',
          'uri': 'atomic-ui-js/components/radio/',
          'alias': 'radio'
        },
        {
          'label': 'Ripple',
          'uri': 'atomic-ui-js/components/ripple/',
          'alias': 'ripple'
        }
      ]
    }
  ]
}];
