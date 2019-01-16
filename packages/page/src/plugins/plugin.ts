/**
 * @file the plugin manager, also works like example
 * @alias spm
 * @example
 *   plugin help
 *   plugin show --name plugin
 */

import { PluginManager, Plugin, PluginAction, PluginActionOption } from './draft'


/**
 * the proxy plugin of pluginManager
 */
export default class PluginPlugin extends Plugin {
  public constructor (
    public manager: PluginManager
  ) {
    super('plugin', 'The basic plugin manager')
    this.register(new PluginActionHelp(this))
    this.register(new PluginActionShow(this))
  }
}


class PluginActionShow extends PluginAction {
  public constructor (plugin: PluginPlugin) {
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
        const plugin = (this.plugin as PluginPlugin).manager.getPlugin(option.value)
        ret = plugin ? plugin.toString() : ''
      }
    }

    return ret
  }
}


class PluginActionHelp extends PluginAction {
  public constructor (plugin: PluginPlugin) {
    super(plugin, 'help', 'The plugin manager')
    this.register('--plugin', 'specify the plugin')
    this.alias('--plugin', '-p')
  }

  public exec (options: L<PluginActionOption>) {
    const ret = `Usage:
  <plugin> <action> [option value]

Available plugins:
  ${(this.plugin as PluginPlugin).manager.getPluginNames().join(', ')}

All plugins are supposed to have a help action, get help for a specific plugin like:
  <plugin> help

Plugin Help:
${this.plugin.getActionsDescriptions()}

Help params:
${this.getActionOptionsDescriptions()}
    `

    return ret
  }
}
