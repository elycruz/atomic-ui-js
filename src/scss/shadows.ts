import {html} from 'lit';
import {stylesAsString} from "../utils/storybook/stylesheet";
// @ts-ignore
import shadowStyles from './base/_shadows.scss';

export const shadows = () => html`
<style>
${stylesAsString}

${shadowStyles}

.example-shadowed-box {
  background: #FFF;
  border-radius: 0.55rem;
  display: inline-block;
  margin: 1.3rem;
  height: 8rem;
  width: 8rem;
  transition: box-shadow 0.21s ease-in-out;
}
.example-shadowed-box:hover {
    box-shadow: 0 2.33rem 3.77rem rgba(0,0,0,0.34);
}
.example-shadowed-box:active {
    box-shadow: 0 1.44rem 2.33rem rgba(0,0,0,0.34);
}
</style>
<p>Example usage of '.ecms-box-shadow-0_00' classes:</p>
${(() => {
  return [8, 13, 21, 34, 55, 89, 144].map((x, i, xs) => {
    const d = document.createElement('div');
    d.classList.add(`example-shadowed-box`, `ecms-box-shadow-${((x * 0.01).toFixed(2) + '').replace('.', '_')}`);
    return d;
  });
})()}
`;
