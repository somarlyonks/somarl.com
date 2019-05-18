# page

## HELPER

Though migrated to preact, [Create React App](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) still provides solutions for building issues.

## Redux

Data control with self implemented redux.js and redux-saga.

```bash
.
└── src
     ├── redux
     │    ├── framework
     │    │    └── index.ts
     │    ├── middleware
     │    │    └── saga.ts
     │    └── store
     │         └── index.ts
     └...
```

Implemented in src/redux/framework, a little bit different from the official redux.js API.

- It doesn't have to support "observable" since I don't use Cycle.js or RxJS.
- It uses static type check instead of "typeof" at runtime to test the arguments.
- It supports native stricter type checking in constrained actions.
- You have to edit the definition of the action before creating store, which makes sense.

Bussiness code in src/redux/impl. Redux-saga locates at src/redux/middleware/saga.ts.

## References

Some of the code in this repo come from:

- @chokcoco: [Weather animaions](http://chokcoco.github.io/magicCss/html/index.html)
- @Dark Sky: [Dark Sky API](https://darksky.net/dev)
- @fontawesome: [Font Awesome](https://fontawesome.com/icons)

Some of the design paradigm come from:

- @Google: [Material Design](https://material.io/design/#)
- @Microsoft: [Fluent Design](https://docs.microsoft.com/en-us/windows/uwp/design/style/)

Fonts LICENSES:

- Acherus Grotesque: [Fontspring Webfont EULA 1.7](https://www.fontspring.com/lic/zwpbi0u3jq)
- CamingoCode: [Creative Commons Attribution-No Derivative Works v3.00](https://www.fontsquirrel.com/license/camingocode)
- DejaVu Sans: [DejaVu Fonts License v1.00](https://www.fontsquirrel.com/license/dejavu-sans)
- EB Garamond: [SIL Open Font License v1.10](https://www.fontsquirrel.com/license/eb-garamond)
- Metropolis: [SIL Open Font License v1.10](https://www.fontsquirrel.com/license/metropolis)
