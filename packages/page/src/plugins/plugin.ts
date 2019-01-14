/**
 * @file the plugin manager, also works like example
 * @alias spm
 * @example
 *   plugin help
 *   plugin show --name plugin
 */

import Constructor from '../helpers/constructor'
import { Plugin, PluginAction, PluginActionOption } from './draft'


export default class PluginManager extends Plugin {
  public pluginsMap: { [key: string]: Constructor<Plugin> } = {}

  public constructor () {
    super('plugin', 'The basic plugin manager')
    // register plugins
    this.registerPlugin('plugin', PluginManager)
    // register actions
    this.register(new PluginShow())
  }

  public registerPlugin (name: S, impl: A) {
    this.pluginsMap[name] = impl
  }

  public help () {
    return 'The basic plugin manager'
  }

  public show (options: L<PluginActionOption>) {
    let ret = ''
    for (const option of options) {
      if (option.name === '--name') {
        const plugin = this.pluginsMap[option.value]
        ret = plugin ? plugin.toString() : ''
      }
    }

    console.info(ret) // TODELETE

    return ret
  }
}


class PluginShow extends PluginAction {
  public constructor () {
    super(
      'show',
      'show the source code of a plugin(compiled)'
    )
    this.register('--name', 'the name of plugin', 'plugin', '-n')
  }
}
