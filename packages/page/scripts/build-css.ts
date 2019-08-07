import * as fs from 'fs-extra'
import chalk from 'chalk'
import sass from 'node-sass'

process.env.NODE_ENV = process.env.NODE_ENV || 'production'
// @ts-ignore
import '../config/env'
// @ts-ignore
import paths from '../config/paths'


// node-sass-chokidar --include-path ./node_modules ./src/scss -o ./src/css

const sassEnv = (name: string, value: string) => `$${name}: ${value};`
const sassEnvs = (envs: object) => Object.keys(envs).map(_var => sassEnv(_var, envs[_var])).join('\n')
// const sassEntry = entry => `@import '${entry}';`
const chalkErr = (err: Error) => console.info(chalk.red(String(err)))


function loader (entry: any, envs: object, resolve: any, reject: any) {
  // const data = sassEnvs(envs) + sassEntry(entry)
  const data = sassEnvs(envs)
  const options = Object.assign({}, {
    file: paths.appScss,
    includePaths: [
      paths.appNodeModules,
    ],
    outFile: paths.appCss,
  }, {
    // data
  })

  fs.createFile(paths.appScssEnv, err =>
    err ? chalkErr(err) : fs.writeFile(paths.appScssEnv, data, err2 =>
      err2 ? chalkErr(err2) : sass.render(options, (err3, r) =>
        err3 ? reject(err3) : resolve(r)
      )
    )
  )
}

loader(
  paths.appScss,
  {
    REACT_APP_API_SERVER: `'${process.env.REACT_APP_API_SERVER}'`,
  },
  (r: sass.Result) => fs.createFile(paths.appCss, err =>
    err ? chalkErr(err) : fs.writeFile(paths.appCss, r.css, err2 =>
      err2 ? chalkErr(err2) : console.info(chalk.green(`Wrote file ${paths.appCss}`))
    )
  ),
  chalkErr
)
