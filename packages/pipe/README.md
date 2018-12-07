# Pipe

## What's the /pipe

It's a pipeline module both for backend and frontend, which makes monorepos worth trying. Some Api schema defined at backend can't be shared in frontend. Pipe makes it possible without dependencies between them. It makes mapping api response to dataframes much easier.

```bash
.
└── packages
     ├── page
     │    └── src
     │         └── helpers
     │              └── Adapter.ts
     ├── pipe
     │    └── src
     │         └── Adapter.ts
     └── server
          └── src
               └── helpers
                    └── Adapter.ts
```

## Forbiddens

see `STYLE.md`

## Usage

**Important**: This package should be compiled first to support the server and page.

To make the changes in `pipe` lintable, you have to run `npm run pipe`(at rootDir or pipe) after editing files in `packages/pipe`
