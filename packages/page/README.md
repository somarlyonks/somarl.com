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
- It doesn't have to check every reducer to combine and ask them to behave in specific ways.
- It uses static type check instead of "typeof" at runtime to test the arguments.
- It supports native stricter type checking in constrained actions.
- You have to define the type of the state and action before creating store.
- Actions are bound under the corresponding-domain state.
- It's definitely typed, including ways to obtain strictly typed bound actions/payloads.

In short, you should specify all the things before the programme runs instead of mix things up and try it and pray at runtime.

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

## Tests

DOM tests only runs to check whether it renders without breaking workflows.

To run a specific test, go to the test file and chagne one of the `it` to `it.only` and `npm t` then change the file in watch mode and remove the `.only` to run all tests in the file and press key `w` to exit and run all test files with key `a`.
