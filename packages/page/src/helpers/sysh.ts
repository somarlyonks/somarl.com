/**
 * @file sysh realtime parser
 * @TODO local history with IndexDB
 *       Commands
 *       Sysh script language(communicate with deno)
 *         It supports ssh and parses inputs/stdin/script before sending to ssh port.
 *         Then parses stdout when responsed reveived.
 */

import PluginManager from '../plugins/plugin'

type StdIn = string

export type StdOut = string

const pluginManager = new PluginManager()

export default class SyshParser {
  private static configs = {
    hintLines: 5,
  }

  public static syshWelcome = 'Input things like: plugin list'

  /** real time parse for hints/history search */
  public static parse (command: string): StdOut {
    const segments = command.split(' ').map(seg => seg.trim())
    if (!segments[0]) return this.syshWelcome

    const pluginNames = Object.keys(pluginManager.pluginsMap)
      .filter(pluginName => pluginName.startsWith(segments[0]))
      .slice(0, this.configs.hintLines)

    if (!pluginNames.length) return this.syshWelcome
    // if (pluginNames.length === 1)
    return pluginNames.join('\n')
  }

  public static exec (command: string, stdIn?: StdIn): StdOut {
    const segments = command.split(' ').map(seg => seg.trim())
    const pluginName = segments[0]
    const Plugin = pluginManager.pluginsMap[pluginName]
    if (!Plugin) return ''
    const plugin = new Plugin()
    return plugin.exec(segments[1], segments.slice(2).join(' '))
  }
}
