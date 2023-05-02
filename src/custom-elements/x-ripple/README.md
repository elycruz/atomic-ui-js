# Ripple

Ripple effect element.

## Approaches

### Self contained element

In this approach the element would be able to operate in two configrations: 

1.  With `children` elements.
2.  As a child element.

In the first configuration the element would apply the effect to it's first child.

In the second, it would apply the effect to itself.

#### Requirements

- Css styles that could be applied to itself, and/or, it's children.
- Ability to apply effect as either an 'bounded', and/or, 'un-bounded', ripple.
- Ripple effect origins should originate from the user's triggered pointer/mouse event.
