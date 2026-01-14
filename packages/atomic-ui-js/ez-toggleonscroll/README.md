# ez-toggleonscroll

Allows triggering an action when an observed element's intersection occurs;  E.g., a `root` element's container boundary has (or hasn't) been intersected. Additionally, allows a classname to be easily toggled on/off when the intersection, or a lack thereof (via `reverse` prop./attrib.), has occurred (via `classNameToToggle`, `toggleTarget*`.

## How it works

Internally the element manages an `IntersectionObserver` instance and updates it whenever component props./attribs. have changed.

## Potential Alternate Names

- `ez-with-intersection-observer`.
- `ez-intersection-observer`.

## Design

### Initially Identified Use Cases

- To show a "back to top" button which only slides into view when a target element is taking a specific percent of a view pane's visible space, or vice-versa.
- To show a "Feedback" tab (on the side of browser screen) "".
- For any effect "".

### Properties. 

- `rootSelector: string` - Scrollable ancestor element to observe intersections on;  Documents scroll/view pane, by default.
- `root(): Element | Document` - Scroll element getter;  Default `Document`.
- `rootMargin: string` - Padding to add to the root bounds view pane (see MDN Intersection Observer docs for more).
- `intersectingTargetSelector: string` - Element to observe for intersections on `root`
- `intersectingTarget(): Element` - Target element getter;  Default `self`.
- `threshold: number | number[]` - Intersection threshold(s) on which to trigger observer callback.
- `classNameToToggle: string` - Optional classname to toggle on toggle target
- `classNameToToggleTargetSelector: string` - Used in conjunction with `classNameToToggle` -
- `classNameToToggleTarget(): string` - Getter.
- `observerCallback: (records: IntersectionObserverEntry, observer: IntersectionObserver) => void` - Gets called from internal intersection observer callback, on 'intersection'.

### Events

- `'ez-toggleonscroll-intersection': CustomEvent<{records: IntersectionObserverEntry}>`  - Triggered when an intersection occurs.

### Basic Use Case Example

In this example component should toggle `.some-css-class`, on itself. whenever the `header` element scrolls in/out of the ('default') scrollpane view.

**Note:** Selector attributes don't have the '*Selector' text appended to their names, but their property counterparts do - This is relevant to `React` app contexts where things are usually set via properties (an not html attributes) in popular versions of react (later versions may have corrected this).

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

<ez-toggleonscroll
  classNameToToggle="back-to-top-btn--visible"
  classNameToToggleTarget="back-to-top-btn"
  class="back-to-top-container"
  target="header"
  threshold="[0.5, 1]"
  rootMargin="16% 0% 0% 0%">
  <a href="#" class="back-to-top-btn ez-btn ez-filled ez-theme-primary">
    <ez-ripple></ez-ripple>
    <span>Back to top</span>
  </a>
</ez-toggleonscroll>

<script type="module">
  import {EzToggleOnScrollElement} from "atomic-ui-js/ez-toggleonscroll";

  const {localName: xToggleOnScrollName} = EzToggleOnScrollElement;
  
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
