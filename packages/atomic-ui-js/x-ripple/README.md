# x-ripple

Element for applying "material-design" like ripple effect to element interactions.

## Usage

```html
<!-- Within element - Effect is constrained within
     wrapping element's boundaries 
-->
<button type="button" class="x-btn x-theme-primary">
  <x-ripple></x-ripple>
  Hello
</button>

<!-- Around element - Effect is unconstrained -- 
     uses `x-ripple:empty` selector to know 
     which mode the element is running in.
-->
<label for="checkbox" class="x-theme-success">
  <x-ripple>
    <input class="x-checkbox" type="checkbox" id="checkbox" name="checkbox"/>
  </x-ripple>
  <span>Checkbox</span>
</label>
```
