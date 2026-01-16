import { inputTypes } from '@/data/controls-metadata';
import styles from './page.module.scss';
import { classNames } from 'atomic-ui-js/utils';
import { HTMLAttributes } from 'react';

let _uuid = 0;

const Select = (props: HTMLAttributes<HTMLSelectElement> = {}) => (
  <select
    id={`example-${_uuid++}-select-one`}
    name={`example-${_uuid++}-select-one`}
    {...props}
  >
    <option>-- Example select --</option>
    <option>1</option>
    <option>2</option>
  </select>
);

function ExampleSelect({ wrapped }: { wrapped?: boolean }) {
  return wrapped ? (
    <div className="ez-input">
      <Select />
    </div>
  ) : (
    <Select className="ez-input" />
  );
}

function Textarea(props: HTMLAttributes<HTMLTextAreaElement> = {}) {
  return (
    <textarea
      id={`example-${_uuid++}-textarea`}
      name={`example-${_uuid++}-textarea`}
      placeholder="Example textarea"
      {...props}
    ></textarea>
  );
}

function ExampleTextarea({
  wrapped,
  ...props
}: HTMLAttributes<HTMLTextAreaElement> & { wrapped?: boolean } = {}) {
  return wrapped ? (
    <div className="ez-input">
      <Textarea {...props} />
    </div>
  ) : (
    <Textarea className="ez-input" {...props}></Textarea>
  );
}

function ExampleSelectAndTextarea({ wrapped }: { wrapped?: boolean }) {
  return (
    <>
      <ExampleSelect wrapped={wrapped} />
      <ExampleTextarea wrapped={wrapped} />
    </>
  );
}

export default function EzInputAlignmentPage() {
  return (
    <section className={styles.topSection}>
      <header>
        <h2>Input Controls Alignment</h2>
      </header>
      <article>
        <header>
          <h3>Un-decorated</h3>
        </header>
        <form action="#">
          <fieldset className={'ez-flex ez-flex-row-wrap gap-16px'}>
            <legend>Horizontal alignment</legend>

            {inputTypes.map(inputType => {
              const id = `example-${_uuid++}-${inputType}`,
                isButton = /reset|submit|button$/i.test(inputType);

              if (inputType === 'hidden') return;

              return (
                <>
                  {!isButton ? (
                    <label htmlFor={id} key={`${id}-label`}>
                      {inputType}:
                    </label>
                  ) : null}
                  <input
                    type={inputType}
                    className={
                      inputType === 'button'
                        ? 'ez-btn ez-primary ez-filled'
                        : ''
                    }
                    defaultValue={
                      isButton
                        ? inputType[0].toUpperCase() + inputType.slice(1)
                        : ''
                    }
                    name={`example-${_uuid}-${inputType}`}
                    key={id}
                    id={id}
                  />
                </>
              );
            })}
          </fieldset>
        </form>
      </article>

      <article>
        <header>
          <h3>Decorated</h3>
        </header>
        <form action="#">
          <fieldset className={'ez-flex ez-flex-row-wrap gap-16px'}>
            <legend>Horizontal alignment</legend>

            {inputTypes.map(inputType => {
              const id = `example-${_uuid++}-${inputType}`,
                isButton = /reset|submit|button$/i.test(inputType);

              if (inputType === 'hidden') return;

              return (
                <>
                  {!isButton ? (
                    <label htmlFor={id} key={`${id}-label`}>
                      {inputType}:
                    </label>
                  ) : null}
                  <div className="ez-input">
                    <input
                      type={inputType}
                      className={
                        inputType === 'button'
                          ? 'ez-btn ez-primary ez-filled'
                          : ''
                      }
                      defaultValue={
                        isButton
                          ? inputType[0].toUpperCase() + inputType.slice(1)
                          : ''
                      }
                      name={`example-${_uuid}-${inputType}`}
                      key={id}
                      id={id}
                    />
                  </div>
                </>
              );
            })}
            <ExampleSelectAndTextarea wrapped={true} />
          </fieldset>
        </form>
      </article>

      <article>
        <header>
          <h3>Decorated (with classname only)</h3>
        </header>
        <form action="#">
          <fieldset className={'ez-flex ez-flex-row-wrap gap-16px'}>
            <legend>Horizontal alignment</legend>

            {inputTypes.map(inputType => {
              const id = `example-${_uuid++}-${inputType}`,
                isButton = /reset|submit|button$/i.test(inputType);

              if (inputType === 'hidden') return;

              return (
                <>
                  {!isButton ? (
                    <label htmlFor={id} key={`${id}-label`}>
                      {inputType}:
                    </label>
                  ) : null}
                  <input
                    type={inputType}
                    className={classNames(
                      { 'ez-btn ez-primary ez-filled': inputType === 'button' },
                      'ez-input'
                    )}
                    defaultValue={
                      isButton
                        ? inputType[0].toUpperCase() + inputType.slice(1)
                        : ''
                    }
                    name={`example-${_uuid}-${inputType}`}
                    key={id}
                    id={id}
                  />
                </>
              );
            })}
            <ExampleSelectAndTextarea />
          </fieldset>
        </form>
      </article>
    </section>
  );
}
