# Atomic UI Js

An atomic, CSS first, user interface library.

## CSS Components

- [ ] `.x-alert`
- [ ] `.x-app-bar`
- [ ] `.x-badge`
- [x] `.x-btn`
- [ ] `.x-card`
- [x] `.x-checkbox` - Available also via `.x-input`.
- [ ] `.x-field`
- [ ] `.x-fieldset`
- [ ] `.x-input`
- [ ] `.x-mds-icon`
- [ ] `.x-menu`
- [x] `.x-radio`
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

### SPA (custom/vanillajs)

### Todos

- Can we perform custom "dropdown" menu animation with `details` element?
- [ ] Move story styles into './apps/atomic-ui-js-site'.
