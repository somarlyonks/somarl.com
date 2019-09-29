export interface IThread {
  pid: N
}

export class Threads <TThread extends IThread> {
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
}
