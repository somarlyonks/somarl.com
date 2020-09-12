/**
 * History API docs @see https://developer.mozilla.org/en-US/docs/Web/API/History
 */

import { useEffect, useRef, useState, useCallback } from 'preact/hooks'
import { once } from 'src/helpers'


const eventPopstate = 'popstate'
const eventPushState = 'pushState'
const eventReplaceState = 'replaceState'
const events = [eventPopstate, eventPushState, eventReplaceState]

export const useLocation: F1<{base?: S}, [S, (to: S, options?: {replace?: boolean}) => void]> = ({ base = '' } = {}) => {
  const [path, update] = useState(currentPathname(base))
  const prevPath = useRef(path)

  useEffect(() => {
    patchHistoryEvents()

    const checkForUpdates = () => {
      const pathname = currentPathname(base)
      if (prevPath.current !== pathname) update((prevPath.current = pathname))
    }

    events.map(e => addEventListener(e, checkForUpdates))

    // it's possible that an update has occurred between render and the effect handler,
    // so we run additional check on mount to catch these updates. Based on:
    // https://gist.github.com/bvaughn/e25397f70e8c65b0ae0d7c90b731b189
    checkForUpdates()

    return () => events.map(e => removeEventListener(e, checkForUpdates))
  }, [base])

  const navigate = useCallback(
    (to: S, { replace = false } = {}) => history[replace ? eventReplaceState : eventPushState]({
      url: base + to,
      options: {replace},
    }, '', base + to),
    [base]
  )

  return [path, navigate]
}

/** @see https://stackoverflow.com/a/4585031 */
const patchHistoryEvents = once(() => {
  [eventPushState, eventReplaceState].map(type => {
    const original = history[type]

    history[type] = function () {
      // tslint:disable-next-line: no-invalid-this
      const result = original.apply(this, arguments)
      const event: A = new Event(type)
      event.arguments = arguments

      dispatchEvent(event)
      return result
    }
  })
})

const currentPathname = (base: S, path = location.pathname) =>
  !path.indexOf(base) ? path.slice(base.length) || '/' : path
