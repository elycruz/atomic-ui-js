# x-typeahead

Component description.

## Use cases

```tsx
import { XTypeaheadComponent } from 'atomic-ui-js-react';

const useMyData = () => ({ data: null, loading: true, error: null });
export default function MyComponent () {
  const { data, loading, error } = useMyData();
  
  return <XTypeaheadComponent>
    <input name="my-typeahead-input" />
    <datalist>
      {loading ? 
        <option disabled>...Loading</option> :
        <>
          <option>-- Choose an option --</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </>
      }
    </datalist>
  </XTypeaheadComponent>;
}
```
