import XTypeaheadComponent from 'atomic-ui-js-next/x-typeahead';

export default function XTypeaheadPage() {
  return <section>
    <header>Typeahead Examples</header>
    <article>
      <div>
        <XTypeaheadComponent>
          <input className="x-input" type="search" placeholder="please select an option" />
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
        </XTypeaheadComponent>
      </div>
    </article>
  </section>;
}
