# Atomic UI Js

An atomic, CSS first, user interface library.

## CSS Components

- [ ] `.x-alert`
- [ ] `.x-appbar`
- [ ] `.x-badge`
- [x] `.x-btn`
- [ ] `.x-card`
- [x] `.x-checkbox` - Available also via `.x-input`.
- [ ] `.x-field`
- [ ] `.x-fieldset`
- [ ] `.x-input`
- [ ] `.x-mds-icon`
- [ ] `.x-menu`
- [x] `.x-radio` - Available also via `.x-input`.
- [ ] `.x-section`
- [ ] `.x-select`
- [ ] `.x-table`
- [ ] `.x-textarea`
- [ ] `.x-elevation-*` (drop-shadows)

### Copy

- `.x-h1` - `.x-h6` - Heading size, and line-height, styles.

### Variant classes

- `.x-round` - Used for icon buttons/buttons that are completely round.
- `.x-rounded` - Applies rounded border-radius.
- `.x-outlined`
- `.x-filled`
- `.x-raised` - With elevation/box-shadow
- `.x-small`
- `.x-dense`
- `.x-large`
- `.x-horizontal` - Horizontal layout.
- `.x-vertical` - Vertical layout.

#### Tentative

- ~~`.x-collapsible`~~ superseded by, natively built-in, `details` element.
- ~~`.x-with-collapsible`~~ "".
- [ ] `.x-dropdown` - Class for turning `details` elements into togglable dropdowns, dropups, popovers, etc.
- `.x-typography` - Applies default styles for contained `p`, `blockquote`, `caption`, `a`, and `button` elements.

## CSS Properties

### Spacing properties

- `--x-{x}px` Where `{x}` is any factor of 144 or any fibonacci number upto 4181, and represents a `rem` unit value that is the equivalent of it's pixel number (`{x}`) counterpart.

### Colors

Default color variants:

- Primary
- Secondary
- Success
- Info
- Warning
- Danger
- Neutral - Grayscale.

- `.x-{color-name}-{index}` where `{color-name}` is one of the default defined color variants (in lowercase) and `{index}` is the lightness index of the color (each index increments the colors lightness by 10%). 

- `.x-theme-color-{index}` This class set is controlled by apply the above class (`.x-{color-name}-index}`) to an element;  E.g.
```html
<style>
  button {
    background: var(--x-theme-color-4);
    color: var(--x-theme-color-9);
  }
</style>

<!-- Secondary theme themed button -->
<button class="x-theme-secondary">...</button>

<!-- Danger theme themed button -->
<button class="x-theme-danger">...</button>

<!-- Etc. -->
```

### Form Control related

@todo

## Custom Elements

- `x-ripple`
- `x-field`
- `x-toggleonscroll`

### Tentative/For future development

- `x-with-overlay` - Used for dropdown menus etc.
- `x-overlay`
- x-date-textfield
- x-date-input
- x-date-range-input
- x-date-calendar
- x-password-input
- x-collapsible
- x-with-collapsible
- x-tooltip
- x-with-tooltip
- x-overlay
- x-with-overlay

## Site Approaches

General:

- static site.
- SPA (nextjs/react).
- SPA (custom 'vanilla js' approach).

### SPA (custom/vanilla-js)

### Todos

- Can we perform custom "dropdown" menu animation with `details` element?
- [ ] Move story styles into './apps/atomic-ui-js-site'.

## Font Icons

Solution here is similar to SVG Icons solution:

1.  If possible export icons, to a given page, to an font-icon - If not possible an overall application font-icon file would suffice.
2.  Load font icon file in application and allow icon component to load/set icons, where required.

### From the icon component side

Use ligatures, etc., to render the given font-icon variant (see [material icons ligature examples](https://developers.google.com/fonts/docs/material_icons))

## SVG Icons

The way svg icons are included in a project can sometimes cause degradation to the overall user experience, and inconsistent language in application sources when different icon sets are included from different libraries (material, clarity, and/or font-awesome, icons etc.) - Examples:

- Flashes of un-styled content (FOUC) sometimes happen while icons are loading.
- Icon libraries/files are some times not tree-shaken, causing large number of assets to be minified/included in project build artifacts.
- Repetition of icons (when using only SVG) contributes to artifact bloat, which can also cause FOUCs.

What solution can we implement to allow icons to be easily used in all UI project contexts, that improve performance (over traditional methods), and improves code agility for developers working on apps.

### Solutions:

- Use SVG sprites per application page.
- Use SVG body imports - Methods that return the SVG icon body contents, which could be referenced via an `iconsMap: Map<string, callback>` from a web-component implementation.
- Font icons - This solution works great if icons are not multi-colored, are not many in one file (font file bloat can occur when too many icons are included/required), and/or contain dynamic functionality (see badges in [clarity icons](https://clarity.design/documentation/icons)) 

#### SVG Body Callback Imports

@todo

#### SVG Sprites per App Page

@todo

### FAQs

- Can we reference svg sprites, from an `svg` element that contains a `hidden` attribute?  
- Do empty spaces come up as `TextNode` in html? They are listed as child nodes but will not show up when querying an element's `children` prop.. 

### References:

- [Clarity Icons] (https://clarity.design/documentation/icons/shapes)
- [Font Awesome Icons] (https://fontawesome.com/icons)
- [Material Symbols] (https://fonts.google.com/icons)
