# x-base

Base classes for creating custom elements.

## Spec

### Todos

#### x-atomic-element

##### Reactive properties support

General idea:

Control should contain a mechanism for tracking updates coming from property
setters, and/or, attribute setters.

Pseudo workflow diagram:

Control connected -> check states -> update -> render -> listen for state
updates
