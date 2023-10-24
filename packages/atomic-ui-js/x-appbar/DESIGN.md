# App Bar Design

## Objective

Create an appbar component that gives the user full control on what to do on the main, targeted, features: Positioning and browser scroll intersection.

## Definitions

Auxillary App Bar
:App Bar that is shown when the user is scrolling toward 'original' app bar's designated position, when the component's scrolling element is scrolled away from it.

App Bar
:Component that sits at the top of an html document, and/or element, and allows control of the document, and/or the application itself.

## Example Usage

```html
<!doctype>
<html lang="en">
<body>

<!-- Targets `document.scrollingElement` (the document element) as 
     it's parent scrolling-element. -->
<x-appbar class="my-app-header">
  <h1>My App</h1>
</x-appbar>

<!-- Targets '.example-scroll-pane' element as 
     it's 'parent scrolling-element' -->
<div class="example-scroll-pane">
    <x-appbar scrollingparent=".example-scroll-pane" class="my-app-header">
      <h1>My App</h1>
    </x-appbar>
</div>

<!-- Or -->

<!-- Footer App Bar (Naming is tentative) -->
<x-appbar orientation="bottom" class="my-app-footer">
  <p>&copy;</p>
</x-appbar>
```

Ensuring aux app bar mode persists (in re-render use cases) using react (without next.js):

```typescript jsx
import {useState, createRef} from 'react';
import XAppBarDecorator from 'atomic-ui-js-react/x-appbar';

export default function AppHeader() {
    const [isInAuxAppBarMode, setIsInAuxAppBarMode] = useState(false);
    const appBarRef = createRef();
    
    // ... `useEffect`, refs, and all that jazz here.
    
    return <XAppBarDecorator ref={appBarRef} auxAppBarMode={isInAuxAppBarMode} className="my-app-header">
      <h1>My App</h1>
    </XAppBarDecorator>;
}
```

Same example as above but also using next.js (only one import is different):

```typescript jsx
import {useState, createRef} from 'react';
import XAppBarDecorator from 'atomic-ui-js-next/x-appbar';

export default function AppHeader() {
    const [isInAuxAppBarMode, setIsInAuxAppBarMode] = useState(false);
    const appBarRef = createRef();
    
    // ... `useEffect`, refs, and all that jazz here.
    
    return <XAppBarDecorator ref={appBarRef} auxAppBarMode={isInAuxAppBarMode} className="x-appbar my-app-header">
      <h1>My App</h1>
    </XAppBarDecorator>;
}
```

In other frameworks ... etc.

## Properties

- `scrollingParent: string` - Selector to use to acquire the target's parent scrolling-element.
- `orientation: string` - 'top' or 'bottom';  Tentative
- `auxAppBarMode: boolean` - Indicates whether the original app bar is showing, at it's 'initial' (default) designated position.  Default `false`.

## Events

- 'xappbar-show' - When the appbar is operating in 'auxappbar' mode, and it should be shown.
- 'xappbar-hide' - When the appbar is operating in 'auxappbar' mode, and it should be hidden (when user scrolls away from the element).

## Approach

### Implementation Caveats

- ~~Component should function as a decorator which contains an appbar component (`div.x-appbar`, etc.).~~
- Component should create a `div` element, internally (marked as `inert`) which should contain the original header's dimensions on it (dimensions should be captured via a `ResizeObserver` object to ensure we always have the most upto date dimensions for our `div`). 
