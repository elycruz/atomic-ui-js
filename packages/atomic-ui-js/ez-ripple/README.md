# ez-ripple

Ripple effect element resembling the Material Design ripple effect - Use it
when you want a ripple effect within an element, or as ripple effect surrounding
an element.

## Example

```
<!-- Within element - Effect is constrained within
     wrapping element's boundaries
-->
<button type="button" class="ez-btn ez-theme-primary">
  <ez-ripple></ez-ripple>
  Hello
</button>

<!-- Around element - Effect is unconstrained --
     uses `ez-ripple:empty` selector to know
     which mode the element is running in and 
     expands the ripple circle to two times 
-->
<label for="checkbox" class="ez-theme-success">
  <ez-ripple>
    <input class="ez-checkbox" type="checkbox" id="checkbox" name="checkbox"/>
  </ez-ripple>
  <span>Checkbox</span>
</label>
```

## Properties

| Property       | Attribute      | Type      | Default    |
|----------------|----------------|-----------|------------|
| `localName`    |                | `string`  | "ez-ripple" |
| `pauseUpdates` |                | `boolean` | false      |
| `rippleActive` | `rippleActive` | `boolean` |            |
