/**
 * @file sysh realtime parser
 * @TODO local history with IndexDB
 *       Commands
 *       Sysh script language(communicate with deno)
 *         It supports ssh and parses inputs/stdin/script before sending to ssh port.
 *         Then parses stdout when responsed reveived.
 */

import pluginManager from '../plugins/draft'
import BlogPlugin from '../plugins/blog'
import WeatherPlugin from '../plugins/weather'
import RSSPlugin from '../plugins/rss'
import PluginPlugin from 'src/plugins/plugin'


window.SPM = pluginManager
pluginManager.register('plugin', new PluginPlugin())
pluginManager.alias('plugin', 'spm')
pluginManager.register('blog', new BlogPlugin())
pluginManager.alias('blog', 'blogs')
pluginManager.register('rss', new RSSPlugin())
pluginManager.register('weather', new WeatherPlugin())


type StdIn = string

export type StdOut = string


export default class SyshParser {
  private static configs = {
    hintLines: 5,
  }
  public static reciver = (output: StdOut) => {}

  public static syshWelcome = 'Input things like: plugin'

  /** real time parse for hints/history search */
  public static async parse (command: string): Promise<StdOut> {
    const segments = command.split(' ').map(seg => seg.trim())
    if (!segments[0]) return this.syshWelcome

    const pluginNames = pluginManager.getPluginNames()
      .filter(pluginName => pluginName.startsWith(segments[0]))
      .slice(0, this.configs.hintLines)

    // no optional plugins found
    if (!pluginNames.length) return this.syshWelcome
    // only one plugin matches, print the help info
    if (pluginNames.length === 1) {
      const help = await this.exec(`${pluginNames[0]} help`)
      return help.startsWith('[Plugin Error]') ? this.syshWelcome : help
    }
    // list the optional plugins
    return pluginNames.join('\n')
  }

  public static async exec (command: string, stdIn?: StdIn): Promise<StdOut> {
    const segments = command.split(' ').map(seg => seg.trim())
    const pluginName = segments[0]

    try {
      const plugin = pluginManager.getPlugin(pluginName)
      return await plugin!.exec(segments[1], segments.slice(2).join(' '))
    } catch (err) {
      console.warn(err.message)
      return err.message
    }
  }

  public static register (reciver: (output: StdOut) => void) {
    console.info('registerrrrrr') // TODELETE
    pluginManager.reciver = reciver
  }
}
