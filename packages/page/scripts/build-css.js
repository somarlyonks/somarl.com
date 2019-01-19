process.env.NODE_ENV = process.env.NODE_ENV || 'production'

require('../config/env')

const fs = require('fs-extra')
const paths = require('../config/paths')

const chalk = require('chalk')
const sass = require('node-sass')

// node-sass-chokidar --include-path ./node_modules ./src/scss -o ./src/css

// sass.render({
//   data: `$REACT_APP_API_SERVER: '${process.env.REACT_APP_API_SERVER}';`,
//   file: paths.appScss,
//   includePaths: [
//     paths.appNodeModules
//   ],
//   outFile: paths.appCss
// }, (err, r) => {
//   console.log('process.env.REACT_APP_API_SERVER', process.env.REACT_APP_API_SERVER)
//   if (err) console.error(chalk.red(err))
//   else fs.createFile(paths.appCss, err => {
//     if (err) console.error(chalk.red(err))
//     else fs.writeFile(paths.appCss, r.css, err => {
//       if (err) console.error(chalk.red(err))
//       else console.log(chalk.green(`Wrote file ${paths.appCss}`))
//     })
//   })
// })

const sassEnv = (name, value) => `$${name}: ${value};`
const sassEnvs = envs => Object.keys(envs).map(_var => sassEnv(_var, envs[_var])).join('\n')
// const sassEntry = entry => `@import '${entry}';`
const chalkErr = err => console.log(chalk.red(err))


function loader (entry, envs, resolve, reject) {
  // const data = sassEnvs(envs) + sassEntry(entry)
  const data = sassEnvs(envs)
  const options = Object.assign({}, {
    file: paths.appScss,
    includePaths: [
      paths.appNodeModules
    ],
    outFile: paths.appCss
  }, {
    // data
  })

  fs.createFile(paths.appScssEnv, err =>
    err ? chalkErr(err) : fs.writeFile(paths.appScssEnv, data, err =>
      err ? chalkErr(err) : sass.render(options, (err, r) => err ? reject(err) : resolve(r))
    )
  )
}

loader(
  paths.appScss,
  {
    'REACT_APP_API_SERVER': `'${process.env.REACT_APP_API_SERVER}'`
  },
  r => fs.createFile(paths.appCss, err =>
    err ? chalkErr(err) : fs.writeFile(paths.appCss, r.css, err =>
      err ? chalkErr(err) : console.log(chalk.green(`Wrote file ${paths.appCss}`))
    )
  ),
  chalkErr
)
