# Atomic UI Js

An atomic, CSS first, user interface library.

## CSS Components

- `.x-alert`
- `.x-app-bar`
- `.x-badge`
- `.x-button`/`.x-btn`
- `.x-card`
- `.x-dropdown` - Class for turning `details` elements into togglable dropdowns, dropups, popovers, etc.
- `.x-field`
- `.x-fieldset`
- `.x-input`
- `.x-mds-icon`
- `.x-menu`
- `.x-section`
- `.x-select`
- `.x-table`
- `.x-textarea`
- `.x-elevation` (drop-shadows)

### Copy

- `.x-typography` - Applies default styles for contained `p`, `blockquote`, `caption`, `a`, and `button` elements.
- `.x-h1` - `.x-h6` - Heading size, and line-height, styles.

### Variant classes

- `.x-round` - Used for icon buttons/buttons that are completely round.
- `.x-rounded` - Applies rounded border-radius.
- `.x-outlined`
- `.x-filled`
- `.x-raised` - With elevation/boz-shadow
- `.x-small`
- `.x-medium` - Default.
- `.x-large`
- `.x-horizontal` - Horizontal layout.
- `.x-vertical` - Vertical layout.

#### Tentative

- ~~`.x-collapsible`~~ superseded by, natively built-in, `details` element.
- ~~`.x-with-collapsible`~~ "".

## CSS Properties

### Spacing properties

- `--z-{x}px` Where `{x}` is any factor of 144 or any fibonacci number upto 4181, and represents a `rem` unit value that is the equivalent of it's pixel number (`{x}`) counterpart.

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
    background: var(--z-theme-color-4);
    color: var(--z-theme-color-9);
  }
</style>

<!-- Secondary theme themed button -->
<button class="z-theme-secondary">...</button>

<!-- Danger theme themed button -->
<button class="z-theme-danger">...</button>

<!-- Etc. -->
```

### Form Control related

@todo

## Custom Elements

- `z-ripple`
- `z-field`
- `z-with-overlay` - Used for dropdown menus etc.
- `z-overlay`

### Tentative/For future development

- z-date-textfield
- z-date-input
- z-date-range-input
- z-date-calendar
- z-password-input
- z-collapsible
- z-with-collapsible
- z-tooltip
- z-with-tooltip
- z-overlay
- z-with-overlay

## Site Approaches

General:

- static site.
- SPA (nextjs/react).
- SPA (custom 'vanilla js' approach).

### SPA (custom/vanillajs)

### Todos

- Can we perform custom "dropdown" menu animation with `details` element?
- [ ] Move story styles into './apps/atomic-ui-js-site'.
