import * as fs from 'fs-extra'
import chalk from 'chalk'
import sass from 'node-sass'

process.env.NODE_ENV = process.env.NODE_ENV || 'production'
// @ts-ignore
import '../config/env'
// @ts-ignore
import paths from '../config/paths'


function getArg (tag: string, fallback: string = ''): string {
  const { argv } = process
  const index = argv.findIndex(arg => arg === tag)
  if (index !== -1 && argv.length > index + 1) return argv[index + 1]
  return fallback
}

// node-sass-chokidar --include-path ./node_modules ./src/scss -o ./src/css
const sassEnv = (name: string, value: string) => `$${name}: ${value};`
const sassEnvs = (envs: object) => Object.keys(envs).map(_var => sassEnv(_var, envs[_var])).join('\n')
const chalkErr = (err: Error) => console.info(chalk.red(String(err)))


const isStory = getArg('--story') === 'true'
const inputFile = isStory ? paths.appStoryScss : paths.appScss
const outputFile = isStory ? paths.appStoryCss : paths.appCss

function loader (
  entry: string,
  envs: object,
  resolve: (r: sass.Result) => void,
  reject: (err: Error) => void
) {
  const data = sassEnvs(envs)
  const options = Object.assign({}, {
    file: entry,
    includePaths: [
      paths.appNodeModules,
    ],
    outFile: outputFile,
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
  inputFile,
  {
    REACT_APP_API_SERVER: `'${process.env.REACT_APP_API_SERVER}'`,
  },
  (r: sass.Result) => fs.createFile(outputFile, err =>
    err ? chalkErr(err) : fs.writeFile(outputFile, r.css, err2 =>
      err2 ? chalkErr(err2) : console.info(chalk.green(`Wrote file ${outputFile}`))
    )
  ),
  chalkErr
)
