import { Plugin } from './draft'

export default class BlogPlugin extends Plugin {
  public constructor () {
    super('blog', 'The reading flows')
  }
}
