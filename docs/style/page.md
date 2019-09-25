# Page

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

Public libs imported first, followed by helpers/utils and then other local components.

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

## [SCSS](./scss.md)

## localize strategy

Depends on the duration of the things to save: if it lasts less than 1 day, localize it to `window.ss`, otherwise to `localStorage` or `ServiceWorker`.
