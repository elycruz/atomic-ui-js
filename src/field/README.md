## Field Element

An element that encapsulates form control handling (error messaging, help text, et al.) in one element.

### Usage:

```html
<form>
    <fieldset>
        <x-field input="#control">
            <label for="control">Control</label>
            <input type="text" id="control" name="control" required />
        </x-field>
    </fieldset>
</form>
```
