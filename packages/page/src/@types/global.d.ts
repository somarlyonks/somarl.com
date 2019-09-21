import { PluginManager } from '../plugins/draft'
import Api from '../helpers/Api'

declare global {
  interface Window {
    SPM: PluginManager
    /**
     * somarl.com statics
     * Technically, the states are all mapped from store.state.global, it's synced to
     * window just for debug.
     */
    SS: {
      Api: typeof Api
      qiniuToken?: S
      qiniuSyncToken?: S
    }
  }
}
