# x-ripple

Ripple effect element resembling the Material Design ripple effect - Use it
when you want a ripple effect within an element, or as ripple effect surrounding
an element.

## Example

```
<!-- Within element - Effect is constrained within
     wrapping element's boundaries
-->
<button type="button" class="x-btn x-theme-primary">
  <x-ripple></x-ripple>
  Hello
</button>

<!-- Around element - Effect is unconstrained --
     uses `x-ripple:empty` selector to know
     which mode the element is running in and 
     expands the ripple circle to two times 
-->
<label for="checkbox" class="x-theme-success">
  <x-ripple>
    <input class="x-checkbox" type="checkbox" id="checkbox" name="checkbox"/>
  </x-ripple>
  <span>Checkbox</span>
</label>
```

## Properties

| Property       | Attribute      | Type      | Default    |
|----------------|----------------|-----------|------------|
| `localName`    |                | `string`  | "x-ripple" |
| `pauseUpdates` |                | `boolean` | false      |
| `rippleActive` | `rippleActive` | `boolean` |            |
