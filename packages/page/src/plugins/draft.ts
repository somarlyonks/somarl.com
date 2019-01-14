/**
 * @file draft and specs for plugins
 */

export class Plugin {
  private actions: L<PluginAction> = []

  public constructor (
    public name: S,
    public description: S
  ) {
    this.register('help', '', undefined, '-h')
  }

  public register (plugin: PluginAction): void
  public register (name: S, description?: S, options?: L<PluginAction>, alias?: S): void
  public register (
    nameOrPlugin: S | PluginAction,
    description?: S,
    options?: L<PluginActionOption>,
    alias?: S
  ) {
    if (typeof nameOrPlugin === 'string') {
      this.actions.push(new PluginAction(nameOrPlugin, description, options, alias))
    } else {
      this.actions.push(nameOrPlugin)
    }
  }

  public exec (actionName: S, options?: S) {
    const action = this.actions.find(act => act.name === actionName || act.alias === actionName)
    this.assert(action, `action ${actionName} not registered`)

    return this[actionName](this.parseOptions(action!, options))
  }

  /**
   * the implemention of plugins should specify the way to parse options
   */
  public parseOptions (action: PluginAction, optionIn?: S): L<PluginActionOption> | void {
    if (optionIn === undefined) return optionIn

    const segments = optionIn.trim().split(' ')
    this.assert(segments.length % 2 === 0, 'options error')

    const groups: L<PluginActionOption> = []
    for (let i = 0; i < segments.length; ) {
      const option = new PluginActionOption(segments[i++])
      option.value = segments[i++]
      groups.push(option)
    }

    const options = [...action.options]
    options.forEach(option => {
      const found = groups.find(group => group.name === option.name || group.name === option.alias)
      option.value = found ? found.value : option.defaultValue
    })

    return options
  }

  public assert (maybe: A, message?: S) {
    if (!maybe) this.onError(message)
  }

  public onError (message: S = 'not specified') {
    throw new Error(`[Plugin Error]: ${this.name}, ${message}.`)
  }

  public help () {
    this.onError('help not implmented')
  }
}


export class PluginAction {
  public constructor (
    public name: S,
    public description: S = 'plugin action',
    public options: L<PluginActionOption> = [],
    public alias?: S
  ) {}

  public register (name: S, description: S, defaultValue: A, alias?: S) {
    this.options.push(new PluginActionOption(name, description, defaultValue, alias))
  }
}


export class PluginActionOption <T = A> {
  public value?: T
  public constructor (
    public name: S,
    public description?: S,
    public defaultValue?: T,
    public alias ?: S
  ) {}
}
