# SCSS

## filename

Confront to both tsx file specs and scss naming specs.

Example:

```bash
.
└── src
     ├── components
     │    ├── main.tsx
     │    └── panel
     │         └── left.tsx
     └── scss
          └── components
               ├── _main.scss
               ├── _panel.scss
               └── panel
                    └── _left.scss
```

in `src/scss/components/_main.scss`

```scss
@import 'panel';
```

in `src/scss/components/_panel.scss`

```scss
@import 'panel/left'
```

in `src/scss/components/panel/_left.scss`

```scss
a {
  color: red;
}
```

## BEM

Take `_terminal.scss` as an example for how to reuse css rules within component without intrigued _scoped_ concept.

## Order

Outter -> Inner: margin -> border -> padding

Back -> Front: background-color -> color

## Unit

0 is always preferred than `0px`/`0rem`/`0em`/`0vh`.

When it's about `font-size`, use `rem/em`, otherwise use `px`. In common, `rem/em` is preferred.

Example:

```scss
.terminal-out {
  margin: 50px 0 100px;
  padding: 2rem;
}
```

Specify the `margin` as `50px 0 100px` becasue if I want to get responsibilities, I may have to respecify the margin, but I probably keep the padding as `2rem` as the font size will shrink.

## space

One space after every ',' and `:`

## number

`0.1` is preferred to `.1`

`#ccc` is preferred to `#CCC` and `#cccccc`. `#CcC` is not accepted.

## z-index

Components should not use plain number as z-index but variable listed in `scss/helpers/_variables.scss`
