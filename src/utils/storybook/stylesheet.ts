// @ts-ignore
import styles from '../../scss/index.stories.scss';

export const createStyleSheet = str => {
    const s = document.createElement('style');
    s.appendChild(document.createTextNode(str));
    return s;
  },

  stylesheet = (() => {
    const s = createStyleSheet(styles);
    s.id = 'storybook-style-sheet';
    return s;
  })(),

  stylesAsString = styles
;
