
import { useState, useEffect } from 'preact/hooks'


const eventPopstate = 'popstate'
const eventPushState = 'pushState'
const eventReplaceState = 'replaceState'
const events = [eventPopstate, eventPushState, eventReplaceState]

const getValue = (search: S, param: S) => new URLSearchParams(search).get(param)

export const useSearchParam = (param: S) => {
  const location = window.location
  const [value, setValue] = useState<S | null>(() => getValue(location.search, param))

  useEffect(() => {
    const onChange = () => {
      setValue(getValue(location.search, param))
    }

    events.forEach(e => window.addEventListener(e, onChange))

    return () => events.forEach(e => window.removeEventListener(e, onChange))
  }, [])

  return value
}
