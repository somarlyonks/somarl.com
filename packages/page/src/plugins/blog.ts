import { Plugin, PluginAction, PluginActionOption } from './draft'
import { PublicApi } from '../helpers/Api'
import { fetchPublicJson } from '../helpers/fetch'


export interface IBlogMeta {
  name: S
  path: S
  sha: S
  size: N
  url: S
  html_url: S
  git_url: S
  download_url: S
  type: S
  _links: {
    self: S
    git: S
    html: S
  }
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
    this.register('--order', 'get the ?st blog showed', '')
    this.alias('--order', '-O')
  }

  public async exec (options: L<PluginActionOption>) {
    const optionValueMap = {}
    for (const option of options) {
      optionValueMap[option.name] = option.value
    }

    const blogs = await getBlogs()
    ; (this.plugin as BlogPlugin).blogs = blogs

    if (optionValueMap['--order'] === '') {
    } else {
      const blog = await fetch(blogs[Number(optionValueMap['--order'])].download_url).then(r => r.text())
      this.emit(blog)
    }
    return blogs.map(blog => blog.name).join('\n')
  }
}
