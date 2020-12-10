
enum THREAD_STATES {
  RUNNABLE,
  RUNNIGN,
  BLOCKED,
  REJECTED,
}

export abstract class Thread<TThread extends Thread<TThread>> {
  public pid: N = 0
  public state: THREAD_STATES = THREAD_STATES.RUNNABLE

  public constructor (
    protected threads: Threads<TThread>,
    start = true
  ) {
    threads.fork(this)
    if (start) this.start()
  }

  public abstract start (): void

  protected suicide () {
    this.threads.kill(this.pid)
    this.state = THREAD_STATES.REJECTED
  }

  protected requestFrame (action: F1<TThread, A>) {
    this.threads.run(action, false)
  }
}

export class Threads <TThread extends Thread<TThread>> {
  private count: N
  private queue: L<TThread>

  public constructor () {
    this.count = 0
    this.queue = []
  }

  public get head (): TThread | undefined {
    return this.queue[0]
  }

  public isHead (thread: TThread) {
    return !!this.head && this.head.pid === thread.pid
  }

  public kill (pid: N) {
    this.queue = this.queue.filter(q => q.pid !== pid)
  }

  public fork (thread: Thread<TThread>) {
    thread.pid = this.count++
    this.queue.push(thread as TThread)
  }

  public run (action: F1<TThread, A>, concurrently = false) {
    const act: F1<TThread, A> = thread => action(thread)

    let threads = this.queue
    if (!concurrently) {
      threads = threads.filter(this.isHead.bind(this))
    }

    threads.forEach(act)
  }
}
