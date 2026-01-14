# Ez-Number-Input control

A number spinner control for only setting/fetching number values; Can be used in
`input[type="date"]` control's, and the like.

## Spec

## Todos

### Properties:

- [ ] `controls`
- [ ] `size`
- [ ] `defaultValue`.
- [ ] `disabled`.
- [ ] `max`
- [ ] `min`
- [ ] `step`.
- [ ] `valueAsNumber`.
- [ ] `value`.
- [ ] `list`
- [ ] `readOnly`
- [ ] `placeholder`
- [ ] `autocomplete`

### Methods:

- [x] `updateValidity()`
- [x] `stepUp()`
- [x] `stepDown()`
- [ ] `select()`

### Functionality

#### Editing

- [ ] Control should only format it's contents on 'change'/'focusout'/'blur' -
      This will allow the user to edit the control's contents without having the
      cursor move out from under them.

- [ ] When the flag that signals controls to display their validation inline, is
      set to `true` (TBD), and control's validity state is invalid, control
      should display it's errors `inline` (underneath it's 'help' slot).

## References:

- Whatwg's "parsing a floating number" spec:
  https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-floating-point-number
- MDN's "Additional Attribs.":
  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#additional_attributes
- WhatWG's spec:
  https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number)
