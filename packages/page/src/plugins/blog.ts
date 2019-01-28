import { Plugin, PluginAction, PluginActionOption } from './draft'
import { PublicApi } from '../helpers/Api'
import { fetchPublicJson } from '../helpers/fetch'


export interface IBlogMeta {
  name: S
}

export const getBlogs: PublicApi<L<IBlogMeta>> = async () => fetchPublicJson('https://api.github.com/repos/somarlyonks/somarlyonks.github.io/contents/_posts')

export default class BlogPlugin extends Plugin {
  public blogs: L<IBlogMeta> = []

  public constructor () {
    super('blog', 'The reading flows')
    this.register(new BlogActionGet(this))
  }
}

class BlogActionGet extends PluginAction {
  public constructor (plugin: BlogPlugin) {
    super(plugin, 'get', 'get all blogs')
  }

  public async exec (options: L<PluginActionOption>) {
    const blogs = await getBlogs()
    ; (this.plugin as BlogPlugin).blogs = blogs
    return '  ' + blogs.map(blog => blog.name).join('\n  ')
  }
}
