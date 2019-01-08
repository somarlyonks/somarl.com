# Coding style guide

First, confront to the linters. `eslintrc` and `tslint.json` can't be edit except trying to make them stricter or more specific.

Second, learn from existing files. Sometimes consistency is more important than rules.

## TSX

### component name & filename

**All** `.tsx` files' names are supposed to have only **one** word. If you can't explain it in one word, it means you need a folder whose names are also limited to one word.

Even you can explain the component in one word, it can't be placed directly under `src/components`, wrap it into a folder with the same name or placed together with files having similar functions.

Minimal Example files:

```tsx
/** @file src/components/panel/main.tsx */
import * as React from 'react'


export default class PanelMain extends React.Component<IComponentAProps, {}> {}
```

```tsx
/** @file src/components/hoverable/hoverable.tsx */
import * as React from 'react'


export default class Hoverable extends React.Component<IComponentAProps, {}> {}
```

or

```tsx
/** @file src/components/interactives/hoverable.tsx */
import * as React from 'react'


export default class Hoverable extends React.Component<IComponentAProps, {}> {}
```

### import/export

Two blanklines after imports.

Public libs imported first followed by helpers/utils and then other local components.

Every `.tsx` file is supposed to have a default exported component whose interface of props is also supposed to be exported.

Don't export together, directly export things when declared.

Minimal Example file:

```tsx
import * as React from 'react'
import * as ReactDOM from 'react-dom' // public libs imported first

import ComponentX from './componentX'


export interface IComponentAProps {} // export the interface of component exported

// default export a component
export default class ComponentA extends React.Component<IComponentAProps, {}> {}

export const ComponentB = () => ()

const ComponentC = () => ()

```

### declarations

Put all declarations together at the top of file splited by one single blank line and leave two blank lines after them.

Interfaces __must__ starts with `I`.

Export the interface of the props of the component exported as default.

One space after function name when declaring. And try to place functions at the end of the file.

Minimal Example file:

```tsx
import * as React from 'react'


export interface IComponentAProps {} // interface name must startsWith I
// splited by one single blank line
interface IComponentBProps {} // Put all declarations together at the top of file


export default class ComponentA extends React.Component<IComponentAProps, {}> {}

class ComponentB extends React.Component<IComponentAProps, {}> {}

function helper () {} // One space after function name when declaring

```

### blank lines

Minimal Example file:

```tsx
import * as React from 'react'
import * as ReactDOM from 'react-dom'
// one line or no line between import groups
import ComponentX from './componentX'
// two blank lines after import

export interface IComponentAProps {}
// two blank lines after declarations

export default class ComponentA extends React.Component<IComponentAProps, {}> {}
// one line between components
export const ComponentB = () => ()

const ComponentC = () => ()
// one line EOF
```

### comma/semicolon

No semicolon except `for` statements.

No comma in interface/type/enum.

Rules about trailing comma see `tslint.json`.

Example:

```ts
interface IA {
  a: string // no comma
  b: string
}

const o = {
  a,
  b,
  c: d,
  e, // keep the trailing comma
} // no semicolon
```

### jsDoc

Only add informations can't be inferred from typescript intellies(e.g. setState). Compressing one line comments into a single line is accepted.

Example:

```tsx
export default class ComponentA extends React.Component<IComponentAProps, {}> {
  /** @setState */
  private readonly afterProcess (v: string) {
    // operations
    this.setState({isClean: false})
  }
}
```

## SCSS

### filename

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

### BEM

Take `_terminal.scss` as an example for how to reuse css rules within component without intrigued _scoped_ concept.

### Order

Outter -> Inner: margin -> border -> padding

Back -> Front: background-color -> color

### Unit

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

### space

One space after every ',' and `:`

### number

`0.1` is preferred to `.1`

`#ccc` is preferred to `#CCC` and `#cccccc`. `#CcC` is not accepted.

## Pipe

All other packages can import from `pipe` but `pipe` are not supposed to have any dependencies. Interfaces shared both backend and frontend are recommanded to be defined in `pipe`.

## Git

### commit log

`[title](subject): [info]`

titles: chore/feat/fix/refactor/perf/style

subject: pkg/page/component/...

Specially, revert commits should be logged like: `revert [title](subject): [info]` and specify the reverted commit in details.

### Pull requests

No commits directly committed at master branch.

Pull requests should be compressed to one word description except there is only one commit to merge, like:

```git
feat(page): add a simulated terminal input component
refact(component): improve terminal component callback props
chore(pkg): reorganize scss structures
fix(component): fix terminal position
feat(page): reorganize main structure
feat(pkg): update tslint and add coding style guide
feat(sysh): introduce the sysh terminal parser and interaction logic
feat(component): terminal auto focus
feat(page): add fake background image for deving
feat(pkg): makeup reset css
```

merged as

```git
Merge pull request #1 from somarlyonks/dev

feat
```

but

```git
feat(pkg): add CircleCI
```

merged as

```git
Merge pull request #3 from somarlyonks/dev

feat(pkg): add CircleCI
```
