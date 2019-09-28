interface IAdaptedStorageItem {
  type: 'primitive' | 'object' | 'date' | 'null' | 'undefined' | 'NOT_FOUND'
  value: any
}


/**
 * @description
 *   partial storeState localization adapter
 *   localStorage api adapter
 *   able to save
 *     - date
 *     - undefined
 *     - null
 *     - other serializable
 *   unable to save
 *     - function: will be saved as undefined
 * @todo
 *   TODO: sync/reflect/merge to redux storeState
 *   TODO: connect to redux store and infer strict types
 */
export class LS {
  private static HOST = localStorage

  private static typeof (value: A) {
    if (Object.prototype.toString.call(value) === '[object Date]') return 'date'
    if (value === null) return 'null'
    return typeof value
  }

  private static STORAGE_PREFIX = '@@redux/LS/'

  private static PREFIXED (key: string) {
    return this.STORAGE_PREFIX + key
  }

  public static SET (key: S, value: A) {
    const item: IAdaptedStorageItem = {
      type: 'primitive',
      value,
    }

    const valueType = this.typeof(value)
    if (valueType === 'function') {
      item.type = 'undefined'
      item.value = 'undefined'
    }

    this.HOST.setItem(this.PREFIXED(key), JSON.stringify(item))
  }

  public static GET <T = A, T2 = undefined> (key: S, fallback?: T2, strict = false): T | T2 {
    const item: IAdaptedStorageItem = JSON.parse(this.HOST.getItem(this.PREFIXED(key))!)

    if (item === null) {
      if (strict) throw new Error('Trying to get ')
      return fallback  as unknown as T2
    }

    if (item.type === 'date') return new Date(item.value) as unknown as T
    // tslint:disable-next-line: no-null-keyword
    if (item.type === 'null') return null as unknown as T
    if (item.type === 'undefined') return undefined as unknown as T
    return item.value
  }

  public static REMOVE (key: S) {
    this.HOST.removeItem(this.PREFIXED(key))
  }

  public static CLEAR () {
    for (const key in this.HOST) {
      if (!key.startsWith(this.STORAGE_PREFIX)) continue
      this.HOST.removeItem(key)
    }
  }
}
