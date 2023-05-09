# Atomic UI Js

An atomic, CSS first, user interface library.

## CSS Components

- `.z-alert`
- `.z-app-bar`
- `.z-badge`
- `.z-button`/`.z-btn`
- `.z-card`
- `.z-dropdown` - Class for turning `details` elements into togglable dropdowns, dropups, popovers, etc.
- `.z-field`
- `.z-fieldset`
- `.z-input`
- `.z-mds-icon`
- `.z-menu`
- `.z-section`
- `.z-select`
- `.z-table`
- `.z-textarea`
- `.z-elevation` (drop-shadows)

### Copy

- `.z-typography` - Applies default styles for contained `p`, `blockquote`, `caption`, `a`, and `button` elements.
- `.z-h1` - `.z-h6` - Heading size, and line-height, styles.

### Variant classes

- `.z-round` - Used for icon buttons/buttons that are completely round.
- `.z-rounded` - Applies rounded border-radius.
- `.z-outlined`
- `.z-filled`
- `.z-raised` - With elevation/boz-shadow
- `.z-small`
- `.z-medium` - Default.
- `.z-large`
- `.z-horizontal` - Horizontal layout.
- `.z-vertical` - Vertical layout.

#### Tentative

- ~~`.z-collapsible`~~ superseded by, natively built-in, `details` element.
- ~~`.z-with-collapsible`~~ "".

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

- `.z-{color-name}-{index}` where `{color-name}` is one of the default defined color variants (in lowercase) and `{index}` is the lightness index of the color (each index increments the colors lightness by 10%). 

- `.z-theme-color-{index}` This class set is controlled by apply the above class (`.z-{color-name}-index}`) to an element;  E.g.
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

### Todos

- Can we perform custom "dropdown" menu animation with `details` element?

- [ ] Move story styles into './apps/atomic-ui-js-site'.
- 
