import { PluginManager } from '../plugins/draft'
import Api from '../helpers/Api'

declare global {
  interface Window {
    SPM: PluginManager
    Api: typeof Api
  }
}
