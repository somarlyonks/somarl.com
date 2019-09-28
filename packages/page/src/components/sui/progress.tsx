import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useCallback } from 'preact/hooks'

import store, { IImplState, useMappedState, ActionTypes, actionProxy } from '../../redux'

import { clamp } from '../../helpers/Adapter'


// function makeQueue () {
//   const pending: L<F<F0>> = []

//   function next () {
//     const fn = pending.shift()
//     if (fn) fn(next)
//   }

//   return (fn: F) => {
//     pending.push(fn)
//     if (pending.length === 1) next()
//   }
// }
// const queue = makeQueue()

// tslint:disable: no-magic-numbers
const THRESHOLD = [10, 95]
const THRESHOLDS = [
  [20, 10],
  [50, 5],
  [80, 2],
  [99, 1],
  [+Infinity, 0],
]
const TRICKLE_SPEED = 200

const setProgress = actionProxy(
  ActionTypes.fetch.SET_PROGRESS,
  (n?: N) => n && clamp(n, 0, 100)
)

export const progressActors = {
  start () {
    if (store.getState()!.fetch.progress === undefined) return progressActors.set(0)

    const work = () => setTimeout(() => {
      if (!store.getState()!.fetch.progress) return
      progressActors.inc()
      work()
    }, TRICKLE_SPEED)

    work()
  },

  inc (increment?: N) {
    const n = store.getState()!.fetch.progress

    if (!n) return progressActors.start()
    if (n > 100) return

    if (increment === undefined) {
      increment = THRESHOLDS.find(t => t[0] >= n)![1]
    }

    store.dispatch(setProgress(clamp(n + increment, THRESHOLD[0], THRESHOLD[1])))
  },

  done () {
    const n = store.getState()!.fetch.progress
    if (n === undefined) return

    progressActors.inc(30 + 50 * Math.random())
    setTimeout(() => progressActors.set(100), TRICKLE_SPEED)
  },

  set (target: N) {
    store.dispatch(setProgress(clamp(target, THRESHOLD[0], 100)))
  },
}
// tslint:enable: no-magic-numbers

/**
 * @todo
 *   TODO: multi task queue
 */
const Progress = () => {
  // const $el = useRef<HTMLElement>()
  const state = useMappedState(useCallback((_state: IImplState) => _state, []))
  const { progress } = state.fetch
  const { themeColor: color } = state.global

  if (progress === undefined) return (<span style="display: none;">NONE</span>)

  return (
    <div
      class="progress-bar fixed tl-0"
      role="bar"
      style={{
        transition: `all ${TRICKLE_SPEED}ms linear`,
        transform: `translate3d(${progress - 100}%, 0, 0)`,
        opacity: progress === 100 ? 0 : 1,
        background: color,
      }}
    >
      <div
        class="progress-peg absolute"
        style={{
          'box-shadow': `0 0 2px ${color}, 0 0 1px ${color}`,
        }}
      />
    </div>
  )
}

export default Progress
