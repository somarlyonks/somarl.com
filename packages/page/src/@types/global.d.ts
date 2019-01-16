import { PluginManager } from '../plugins/draft'

declare global {
  interface Window {
    SPM: PluginManager
  }
}
