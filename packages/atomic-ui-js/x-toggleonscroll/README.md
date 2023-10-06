# x-toggleonscroll

Toggles a classname on an element (itself by default) when ever target 'trigger' element is scrolled in, and/or out, from the 'container' element (default element used by `IntersectionObserver` (body/html element), by default).

## Potential Alternate Names

- `x-with-intersection-observer`.
- `x-intersection-observer`.

## Design

### Initially Identified Use Cases

- To show a "back to top" button which only slides into view when a target element is taking a specific percent of a view pane's visible space, or vice-versa.
- To show a "Feedback" tab (on the side of browser screen) "".
- For any effect "".

### Properties. 

- `rootSelector: string` - Scrollable ancestor element to observe intersections on;  Documents scroll/view pane, by default.
- `root(): Element | Document` - Scroll element getter;  Default `Document`.
- `rootMargin: string` - Padding to add to the root bounds view pane (see MDN Intersection Observer docs for more).
- `targetSelector: string` - Element to observe for intersections on `root`
- `target(): Element` - Target element getter;  Default `self`.
- `threshold: number | number[]` - Intersection threshold(s) on which to trigger observer callback.
- `axis: 'x' | 'y' | 'xy'` - Axis we're allowing user-land callback to be triggered on. 
- `classNameToToggle: string` - Optional classname to toggle on toggle target
- `classNameToToggleTargetSelector: string` - Used in conjunction with `classNameToToggle` -
- `classNameToToggleTarget(): string` - Getter.
- `onintersection: (event: CustomEvent<{records: IntersectionObserverEntry}>) => void` - Intersection event handling prop.

### Alternate API:

- `get root: Element | Document`
- `rootSelector: string`
- `rootMargin: string`
- `get intersectingTarget: Element`
- `intersectingTargetSelector: string`
- `threshold: number | number[]`
- `axis: 'x' | 'y' | 'xy'`
- `toggleClassName: string`
- `get toggleClassNameTarget: Element | Document`
- `toggleClassNameTargetSelector: string`
- `intersectionCallback: (records: IntersectionObserverEntry, observer: IntersectionObserver) => void`

### Events

- `'x-toggleonscroll-intersection': CustomEvent<{records: IntersectionObserverEntry}>`  - Custom intersection event.

### Basic Use Case Example

In this example component should toggle `.some-css-class`, on itself. whenever the `header` element scrolls in/out of the ('default') scrollpane view.

```html
<!doctype>
<html lang="en">
<title>Example</title>
<head>
  <!-- Setup styles -->
  <style>
    .back-to-top-container {
      display: inline-flex;
      justify-content: flex-end;
      flex-flow: row nowrap;
      position: sticky;
      left: 100%;
      bottom: 1.5rem;
    }

    .back-to-top-btn {
      transition: transform 0.21s ease-in-out, opacity 0.21s;
      transform: translateX(0);
      opacity: 1;
    }

    .back-to-top-btn--visible {
      transform: translateX(100%);
      opacity: 0;
    }
  </style>
  <title>Example</title>
</head>
<body>
<header>
  <h1>Header</h1>
</header>

<main>
  <p>Lorem Ipsum ...</p>

  <p>...</p>
</main>

<x-toggleonscroll
  classNameToToggle="back-to-top-btn--visible"
  classNameToToggleTarget="back-to-top-btn"
  class="back-to-top-container"
  target="header"
  threshold="[0.5, 1]"
  rootMargin="16% 0% 0% 0%">
  <a href="#" class="back-to-top-btn x-btn x-filled x-theme-primary">
    <x-ripple></x-ripple>
    <span>Back to top</span>
  </a>
</x-toggleonscroll>

<script type="module">
  import {XToggleOnScrollElement} from "atomic-ui-js/x-toggleonscroll";

  const {localName: xToggleOnScrollName} = XToggleOnScrollElement;
  
  window.addEventListener('DOMContentLoaded', () => {
      document.querySelector(xToggleOnScrollName)
              .addEventListener(`${xToggleOnScrollName}-intersection`, e => {
                  const {currentTarget, detail: {records}} = e;
                  // Handle intersection observer callback result (records)
                  records.forEach(r => {
                      // In this scenario, toggle DOM rendering of our '.back-to-top-container' 
                      (currentTarget.classNameToToggleTarget ?? r.target).hidden = r.isIntersecting;
                  });
              });
  }, {once: true});
</script>
</body>
</html>
```

## Notes:

- `#IntersectionObserverEntry.intersectionRatio` is the ratio for the entire element (along both axis).

## References:

- IntersectionObserver API: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
