# the Redux Dialect Usage

## How to wrap actions?

Preferred:

```ts
const pColor = Api.getBinksColor()
const setColor = async (color: R<typeof Api.getBinksColor>) => `rgb(${(await color).join(', ')})`

actor({
  type: actor.types.global.SET_THEMECOLOR,
  payload: setColor(pColor),
})
```

Deprecated:

```ts
const pColor = Api.getBinksColor()
const act = async (color: R<typeof Api.getBinksColor>) => actor({
  type: actor.types.global.SET_THEMECOLOR,
  payload: `rgb(${(await color).join(', ')})`,
})

act(pColor)
```

Rationale:

Do not mix other logic with redux dispatching.
