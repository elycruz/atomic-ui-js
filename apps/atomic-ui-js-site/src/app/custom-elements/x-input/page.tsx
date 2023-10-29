import styles from './page.module.css';
import {inputTypes} from '@/data/controls-metadata';

let _uuid = Number.MIN_SAFE_INTEGER;

export default function InputPage() {
  const elementsConfig = inputTypes.map(type => {
    let options = null;

    switch (type) {
    case 'button':
    case 'image':
    case 'submit':
    case 'reset':
      return [type, {value: type[0].toUpperCase() + type.substring(1)}];
    case 'hidden':
      break;
    case 'date':
      options = {showReadonly: true, readonly2Value: '2023-05-01'};
      break;
    case 'datetime-local':
      options = {showReadonly: true, readonly2Value: '2023-05-10T11:59'};
      break;
    case 'time':
      options = {showReadonly: true, readonly2Value: '11:59'};
      break;
    case 'number':
      options = {showReadonly: true, readonly2Value: '1000'};
      break;
    case 'email':
      options = {showReadonly: true, readonly2Value: 'hello@hello.com'};
      break;
    case 'file':
      options = {showReadonly: true};
      break;
    default:
      options = {showReadonly: true, readonly2Value: 'Readonly'};
      break;
    }

    return [type, options];
  });

  return <section className="x-flex x-flex-row-wrap">
    <article className={styles['article']}>
      <header>
        <h2>Inputs controls with decorators</h2>
      </header>

      <form action="#">
        <fieldset className="x-grid x-fieldset x-fieldset--grid-2">
          {elementsConfig.map(([type, elementOptions]) => {

            const {showReadonly, readonly2Value, value} = elementOptions ?? {},
              isRadioOrCheckbox = type === 'radio' || type === 'checkbox',
              name = `${type}-2`,
              humanReadableName = type[0].toUpperCase() + type.substring(1);

            return <>
              <label htmlFor={name}>{humanReadableName}</label>
              <div className="x-input"><input type={type} name={name} id={name} defaultValue={value ?? ''}/></div>
              {isRadioOrCheckbox ? <>
                <label htmlFor={`${name}-checked`}>{humanReadableName} (checked)</label>
                <div className="x-input"><input type={type} name={`${name}-checked`} id={`${name}-checked`} defaultChecked={true}/></div>
              </> : null}
              {showReadonly || isRadioOrCheckbox ? <>
                <label htmlFor={`${name}-readonly`}>{humanReadableName} (readonly)</label>
                <div className="x-input"><input type={type} name={`${name}-readonly`} id={`${name}-readonly`}
                  defaultValue={value || readonly2Value} readOnly={true}
                  defaultChecked={isRadioOrCheckbox ? true : undefined}/></div>
              </> : null}
              <label htmlFor={`${name}-disabled`}>{humanReadableName} (disabled)</label>
              <div className="x-input"><input type={type} name={`${name}-disabled`} id={`${name}-disabled`}
                defaultValue={value ?? ''} disabled/></div>
            </>;
          })}
        </fieldset>
        <fieldset className="x-grid x-fieldset--grid-2">
          <label htmlFor="select-1">Select</label>
          <div className="x-input">
            <select name="select-1" id="select-1">
              <option value="NaN">-- Select an option --</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <label htmlFor="textarea">Textarea</label>
          <div className="x-input">
            <textarea name="textarea" id="textarea" cols={30} rows={10}></textarea>
          </div>
        </fieldset>
      </form>
    </article>

    <article className={styles['article']}>
      <header>
        <h3>Default (Text) Input Control</h3>
      </header>

      <form action="#">
        <fieldset className="x-grid x-fieldset--grid-2">
          <label htmlFor="text-input-1">Default</label>

          <div className="x-field">
            <input id="text-input-1" name="text-input-1" className="x-input"/>

            <div slot="help">(Optional)</div>
          </div>

          <label slot="leading" htmlFor="text-input-2">Disabled</label>

          <div className="x-field">
            <input id="text-input-2" name="text-input-2" className="x-input" disabled/>

            <div slot="help">(Optional)</div>
          </div>

          <label htmlFor="text-input-3">With leading content</label>

          <div className="x-field">
            <div className="x-input">
              <label htmlFor="text-input-3" className={`${styles['leading']} mds-icon`}>star</label>
              <input id="text-input-3" name="text-input-3" placeholder="Placeholder"/>
            </div>
          </div>

          <label htmlFor="text-input-4">With trailing content</label>

          <div className="x-field">
            <div className="x-input">
              <input id="text-input-4" name="text-input-4" placeholder="Placeholder"/>
              <label htmlFor="text-input-4" className={`${styles['trailing']} mds-icon`}>star</label>
            </div>
          </div>

          <label htmlFor="text-input-5">Required</label>

          <div className="x-field">
            <input id="text-input-5" name="text-input-5" required className="x-input"/>
          </div>
        </fieldset>

        <fieldset>
          <button type="reset">Reset</button>
          <button>Submit</button>
        </fieldset>
      </form>
    </article>

    <article className={styles['article']}>
      <header>
        <h3>Input controls without decorators</h3>
      </header>
      <form action="#">
        <fieldset className="x-grid x-fieldset x-fieldset--grid-2">
          {inputTypes.map(type => {
            const name = type,
              humanReadableName = type[0].toUpperCase() + type.substring(1);

            return <>
              <label htmlFor={name}>{humanReadableName}</label>
              <div><input type={type} name={name} id={name}/></div>
            </>;
          })}
        </fieldset>
      </form>
    </article>

    <article>
      <header>
        <h3>Input Controls Alignment</h3>
      </header>

      <form action="#">
        <fieldset className={`${styles.fieldset} x-flex x-flex-row-wrap`}>
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
