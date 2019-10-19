import { h } from 'preact' // lgtm [js/unused-local-variable]

import store, { ActionTypes, useRedux } from 'src/redux'
import { clamp, Threads, Thread } from 'src/helpers'


const progressThreads = new Threads<ProgressThread>()

// tslint:disable: no-magic-numbers
const TRICKLE_SPEED = 200

class ProgressThread extends Thread {

  private progress: N = 0

  private THRESHOLD = [10, 95]
  private THRESHOLDS = [
    [20, 10],
    [50, 5],
    [80, 2],
    [99, 1],
    [+Infinity, 0],
  ]

  public constructor (start = true) {
    super(progressThreads)
    if (start) this.start()
  }

  public start () {
    this.setProgress(0)
    const worker = () => setTimeout(() => {
      this.trickle()
      worker()
    }, TRICKLE_SPEED)
    worker()
  }

  public done () {
    this.trickle(30 + 50 * Math.random())
    setTimeout(() => {
      this.setProgress(+Infinity)
      progressThreads.kill(this.pid)
    }, TRICKLE_SPEED)
  }

  private trickle (increment?: N) {
    if (this.progress > 100) return

    increment = increment || this.THRESHOLDS.find(t => t[0] >= this.progress)![1]
    this.setProgress(clamp(this.progress + increment, this.THRESHOLD[0], this.THRESHOLD[1]))
  }

  private setProgress (progress: N) {
    this.progress = clamp(progress, 0, 100)

    progressThreads.run(this, thread => store.dispatch({
      type: ActionTypes.fetch.SET_PROGRESS,
      payload: thread.progress,
    }))
  }

}
window.ProgressThread = ProgressThread
// tslint:enable: no-magic-numbers


export default function Progress () {
  const { progress, color } = useRedux(state => ({
    progress: state.fetch.progress,
    color: state.global.themeColor,
  }), [2])

  if (progress === undefined) return (<span style="display: none;">NONE</span>)

  return (
    <div
      class="progress-bar fixed tl-0"
      role="bar"
      style={{
        transition: `all ${TRICKLE_SPEED}ms linear`,
        transform: `translate3d(${progress - 100}%, 0, 0)`,
        opacity: progress === 0 || progress === 100 ? 0 : 1,
        background: color,
      }}
    >
      <div
        class="progress-peg absolute"
        style={{
          'box-shadow': `20px 0 60px 2px ${color}, 20px 0 30px 0 ${color}`,
        }}
      />
    </div>
  )
}
