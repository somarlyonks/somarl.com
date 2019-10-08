export abstract class Thread {
  public pid: N = 0

  /** don't refer threads in thread */
  public constructor (threads: Threads<Thread>) {
    threads.fork(this)
  }
}

export class Threads <TThread extends Thread> {
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
    return this.queue.findIndex(q => q.pid === thread.pid) === 0
  }

  public kill (pid: N) {
    this.queue = this.queue.filter(q => q.pid !== pid)
  }

  public fork (thread: TThread) {
    thread.pid = this.count++
    this.queue.push(thread)
  }

  public run (threads: TThread | L<TThread>, action: F1<TThread, A>, concurrently = false) {
    const act: F1<TThread, A> = thread => action(thread)

    if (!Array.isArray(threads)) {
      threads = [threads]
    }

    if (!concurrently) {
      threads = threads.filter(this.isHead.bind(this))
    }

    threads.forEach(act)
  }
}
