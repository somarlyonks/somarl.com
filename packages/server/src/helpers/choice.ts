/**
 * @example
 *   const randomFile = choice(5)
 *   randomFile(fileNames, filename => fileName.endsWith('.json'))
 */
export default function choice (
  /**
   * the max retry times
   */
  limit: N = 5
) {
  return function impl <T> (
    options: L<T>,
    /**
     * Predicate like the callback function in Array.prototype.filter
     */
    accept: (option: T) => boolean = (option: T) => true,
    count: N = 0
  ): T | never {
    if (count++ > limit) throw Error("Might be swallowed...")

    const n = Math.random() * options.length | 0
    const option = options[n]
    return accept(option) ? option : impl(options, accept, count)
  }
}
