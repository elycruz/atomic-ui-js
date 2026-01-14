import EzTypeaheadComponent from 'atomic-ui-js-next/ez-typeahead';

export default function EzTypeaheadPage() {
  return <section>
    <header>Typeahead Examples</header>
    <article>
      <div>
        <EzTypeaheadComponent>
          <input className="ez-input" type="search" placeholder="please select an option" />
          <datalist>
            <option>-- Choose an option --</option>
            {Array.from({length: 500}, (_, i) =>
              <option key={`generated-option-${i + 1}`}>{i + 1}</option>
            )}
            <optgroup label="odd">
              <option>1</option>
              <option>3</option>
              <option>5</option>
            </optgroup>
            <optgroup label="even">
              <option>2</option>
              <option>4</option>
              <option>6</option>
            </optgroup>
          </datalist>
        </EzTypeaheadComponent>
      </div>
    </article>
  </section>;
}
