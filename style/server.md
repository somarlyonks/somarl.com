# Server

## Name

### folder

The folder name is supposed to be clear enough to identify itself, with which the files in it are supposed to be prefixed.

Bad:

```bash
app
├── app.module.ts
└── app.service.ts
```

Good:

```bash
app
├── module.ts
└── service.ts
```

If there are contents exported out of the folder, then it should be exported in `index.ts` and imported as `import {} from './module`

### filename

If only one default export, it should be named `[name].ts`, otherwise `[name]s.ts` is preferred. Take `module.ts` and `decorators.ts` as an example.
