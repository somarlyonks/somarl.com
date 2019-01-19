/**
 * @file draft and specs for plugins
 */

class AliasAbastract <T> {
  public sourceMap: { [key: string]: T } = {}
  public aliasMap: { [key: string]: S } = {}

  public constructor (
    public sourceType: S
  ) {}

  // public register (name: S, source: T) {}

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
  public constructor () {
    super('plugin')
  }

  public register (name: S, plugin: Plugin) {
    this.sourceMap[name] = plugin
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
}


const pluginManager = new PluginManager()

export default pluginManager


export class Plugin extends AliasAbastract<PluginAction> {
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

  public assert (maybe: A, message?: S) {
    if (!maybe) this.onError(message)
  }

  public onError (message: S = 'not specified') {
    throw new Error(`[Plugin Error]: ${this.name} - ${message}.`)
    return '' // keep this
  }

  public getActionsDescriptions () {
    return Object.values(this.sourceMap)
      .map(plugin => `  ${plugin.name}    ${plugin.description}`)
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

  public exec (options?: L<PluginActionOption>): S {
    this.plugin.onError(`action ${this.name} not implemented`)
    return ''
  }

  // TODO: more flexible option params
  public parse (optionIn: S = '') {
    const segments = optionIn.trim().split(' ').filter(seg => seg !== '')
    this.plugin.assert(segments.length % 2 === 0, `action ${this.name} options error`)

    const groups: L<PluginActionOption> = []
    for (let i = 0; i < segments.length; ) {
      const option = new PluginActionOption(segments[i++])
      option.value = segments[i++]
      groups.push(option)
    }

    const options = Object.values(this.sourceMap)
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
    // TODO: standardlize spaces
    // TODO: alias detecting
    return this.getOptions()
      .map(option => `  ${option.name}    ${option.description}`)
      .join('\n') || 'None'
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
