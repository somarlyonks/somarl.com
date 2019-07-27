# Coding style guide

First, confront to the linters. `eslintrc` and `tslint.json` can't be edit except trying to make them stricter or more specific.

Second, learn from existing files. Sometimes consistency is more important than rules.

## TS

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

### Array/Union

Common style array is accepted:

```ts
const arr = [
  1,
  2,
  3, // keep the trailing comma
]
```

Leading comma like Haskell is also accepted is necessary:

```ts
const arr = [ 1
            , 2
            , 3 ]

// usually more useful in Unions
export type IGlobalAction = IAction<'INCREMENT', N>
                          | IAction<'DECREMENT', S>
                          | IAction<'RESOLVE_ERROR', S>
                          | IAction<'SET_THEMECOLOR', S>
                          | IAction<'SET_TERMINALSTATE', GTermianlState>
                          | IAction<'SET_RICHOUTPUT', S>
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

## LOG

### level

Every error in runtime could be handled should be a warning. Log as error if you are not sure about the cause and don't know how to prevent it. Other things are all infomations.

### analysis

Server logs should be synced to analysis tool(not concrete yet).

## Git

### commit log

Covered by commitlint and husky hooks. Just try.

### Pull requests

No commits directly committed at master branch.

Pull requests should be compressed to one word description or an explicit subject, like:

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

or

```git
Merge pull request #1 from somarlyonks/dev

feat(page): add terminal
```
