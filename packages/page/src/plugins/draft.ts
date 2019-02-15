/**
 * @file draft and specs for plugins
 */

import { revertObject, format } from '../helpers/transformers'

class AliasAbastract <T> {
  public sourceMap: { [key: string]: T } = {}
  public aliasMap: { [key: string]: S } = {}

  public constructor (
    public sourceType: S
  ) {}

  public alias (sourceName: S, aliasName: S) {
    this.aliasMap[aliasName] = sourceName
  }

  public getSource (name: S) {
    if (this.sourceMap[name]) return this.sourceMap[name]

    const aliased = this.aliasMap[name]
    if (this.sourceMap[aliased]) return this.sourceMap[aliased]

    this.onError(`${this.sourceType} "${name}" not found`)
    return undefined
  }

  public onError (message: S = 'Not specified') {
    throw Error(message)
  }
}


export class PluginManager extends AliasAbastract<Plugin> {
  public reciver?: (content: S) => void

  public constructor () {
    super('plugin')
  }

  public register (name: S, plugin: Plugin) {
    this.sourceMap[name] = plugin
    plugin.manager = this
  }

  public getPlugin (name: S) {
    return this.getSource(name)
  }

  public getPluginNames () {
    return Object.keys(this.sourceMap)
  }

  public onError (message: S = 'not specified') {
    throw new Error(`[Plugin Error]: pluginManager, ${message}.`)
  }

  public emit (content: S) {
    if (this.reciver) this.reciver(content)
  }
}


const pluginManager = new PluginManager()

export default pluginManager


export class Plugin extends AliasAbastract<PluginAction> {
  public manager!: PluginManager

  public constructor (
    public name: S,
    public description: S
  ) {
    super('action')
    // this.register('help', '', undefined, '-h')
  }

  /**
   * register an action by action or constructor
   * registering an registered action will be rejected
   * but registering an new action with the same name of an alias will just override
   * the alias when searching the action by that name
   *
   * @todo add hooks like onRegister
   */
  public register (action: PluginAction): void
  public register (name: S, description?: S, options?: L<PluginActionOption>): void
  public register (
    nameOrAction: S | PluginAction,
    description?: S,
    options?: L<PluginActionOption>
  ) {
    const action = typeof nameOrAction === 'string'
      ? new PluginAction(this, nameOrAction, description, options)
      : nameOrAction

    this.sourceMap[action.name] = action
  }

  public getAction (name: S) {
    return this.getSource(name)
  }

  public exec (actionName: S, options?: S) {
    const action = this.getAction(actionName)
    if (!action) return this.onError(`action ${actionName} not found`)

    return action.exec(action.parse(options))
  }

  public emit (content: S ) {
    this.manager.emit(content)
  }

  public assert (maybe: A, message?: S) {
    if (!maybe) this.onError(message)
  }

  public onError (message: S = 'not specified') {
    throw new Error(`[Plugin Error]: ${this.name} - ${message}.`)
    return '' // keep this
  }

  public getActionsDescriptions () {
    const segmentWidth = 12
    return Object.values(this.sourceMap)
      .map(plugin => `  ${format(plugin.name, segmentWidth)}${plugin.description}`)
      .join('\n') || 'None'
  }
}


export class PluginAction extends AliasAbastract<PluginActionOption> {
  public constructor (
    public plugin: Plugin,
    public name: S,
    public description: S = 'plugin action',
    options: L<PluginActionOption> = []
  ) {
    super('option')
    options.forEach(option => this.register(option))
  }

  public register (option: PluginActionOption): void
  public register (name: S, description: S, defaultValue?: S): void
  public register (nameOrOption: S | PluginActionOption, description?: S, defaultValue: S = '') {
    const option = typeof nameOrOption === 'string'
      ? new PluginActionOption(nameOrOption, description, defaultValue)
      : nameOrOption
    this.sourceMap[option.name] = option
  }

  public async exec (options?: L<PluginActionOption>): Promise<S> {
    this.plugin.onError(`action ${this.name} not implemented`)
    return ''
  }

  public emit (content: S) {
    this.plugin.emit(content)
  }

  // TODO: more flexible option params
  public parse (optionIn: S = '') {
    const segments = optionIn.trim().split(' ').filter(Boolean)
    this.plugin.assert(segments.length % 2 === 0, `action ${this.name} options error`)

    const groups: L<PluginActionOption> = []
    for (let i = 0; i < segments.length; ) {
      const option = new PluginActionOption(segments[i++])
      option.value = segments[i++]
      groups.push(option)
    }

    const options = this.getOptions()
    options.forEach(option => {
      const found = groups.find(group => group.name === option.name || this.aliasMap[group.name] === option.name)
      option.value = found ? found.value : option.defaultValue
    })

    return options
  }

  public getOptions () {
    return Object.values(this.sourceMap)
  }

  public getActionOptionsDescriptions () {
    const options = this.getOptions()
    const reflectAlias = revertObject(this.aliasMap)
    let ret = ''
    options.forEach(option => {
      const segmentWidth = 12
      ret += `  ${format(option.name, segmentWidth)}${option.description}\n`
      ret += (reflectAlias[option.name] || []).map(alias => `  ${alias}\n`).join('')
      ret += '\n'
    })

    return ret
  }
}


export class PluginActionOption <T = A> {
  public value?: T

  public constructor (
    public name: S,
    public description?: S,
    public defaultValue?: T
  ) {}
}
