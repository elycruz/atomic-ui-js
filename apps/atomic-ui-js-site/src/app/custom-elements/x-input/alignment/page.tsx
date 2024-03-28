import {inputTypes} from '@/data/controls-metadata';
import styles from './page.module.scss';

let _uuid = 0;

export default function XInputAlignmentPage() {
  return <section className={styles.topSection}>
    <header>
      <h2>Input Controls Alignment</h2>
    </header>
    <article>
      <form action="#">
        <fieldset className={'x-flex x-flex-row-wrap gap-16px'}>
          <legend>Horizontal alignment</legend>

          {inputTypes.map((inputType) => {
            const id = `example-${_uuid++}-${inputType}`;
            const isButton = /reset|submit|button$/i.test(inputType);

            if (inputType === 'hidden') return;

            return <>
              {!isButton ? <label htmlFor={id}>{inputType}:</label> : null}
              <input
                type={inputType}
                className={`${inputType === 'button' ? 'x-btn x-primary x-filled' : ''}`}
                defaultValue={isButton ? inputType[0].toUpperCase() + inputType.slice(1) : ''}
                name={`example-${_uuid}-${inputType}`}
                id={id}
              />
            </>;
          })}
        </fieldset>
      </form>
    </article>
  </section>;
}
