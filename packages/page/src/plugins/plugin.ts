/**
 * @file the plugin manager, also works like example
 * @alias spm
 * @example
 *   plugin help
 *   plugin show --name plugin
 */

import { PluginManager, Plugin, PluginAction, PluginActionOption } from './draft'


export default class PluginPlugin extends Plugin {
  public constructor (pluginManager?: PluginManager) {
    super('plugin', 'The basic plugin manager', pluginManager)
    this.register(new PluginActionShow(this))
  }
}


class PluginActionShow extends PluginAction {
  public constructor (plugin: Plugin) {
    super(
      plugin,
      'show',
      'show the source code of a plugin(compiled)'
    )
    this.register('--name', 'the name of plugin', 'plugin')
    this.alias('--name', '-n')
  }

  public exec (options: L<PluginActionOption>) {
    let ret = ''
    for (const option of options) {
      if (option.name === '--name') {
        const plugin = this.plugin.manager.getPlugin(option.value)
        ret = plugin ? plugin.toString() : ''
      }
    }

    return ret
  }
}
