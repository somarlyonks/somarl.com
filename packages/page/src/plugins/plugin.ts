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
  }
}


class PluginActionHelp extends PluginAction {
  public constructor (plugin: PluginPlugin) {
    super(plugin, 'help', 'The plugin manager')
    this.register('--plugin', 'specify the plugin')
    this.alias('--plugin', '-p')
  }

  public async exec (options: L<PluginActionOption>) {
    const config = {}
    options.forEach(option => {
      config[option.name] = option.value
    })
    if (config['--plugin']) {
      const plugin = (this.plugin as PluginPlugin).manager.getPlugin(config['--plugin'])
      if (plugin) {
        return plugin.exec('help')
      } else {
        return `Plugin ${config['--plugin']} not found.`
      }
    }
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
