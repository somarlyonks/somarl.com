/**
 * @file sysh realtime parser
 * @TODO local history with IndexDB
 *       Commands
 *       Sysh script language(communicate with deno)
 *         It supports ssh and parses inputs/stdin/script before sending to ssh port.
 *         Then parses stdout when responsed reveived.
 */

type StdIn = string

export type StdOut = string


export default class SyshParser {
  /** real time parse for hints/history search */
  public static syshWelcome = 'Input things like: blogs --page=2'

  public static parse (command: string) {
    if (command.startsWith('bl')) {
      return 'blog -P 2'
    }
    return this.syshWelcome
  }

  public static exec (command: string, stdIn?: StdIn): StdOut {
    return command
  }
}
