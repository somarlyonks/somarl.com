import Link from 'next/link'
import Flex from '@csszen/components.flexmini'
import OcticonGithub from '@csszen/icons.github'

import Vercel from './icons/Vercel'


export default function Footer ({slug}: {slug?: string}) {
    return (
        <footer>
            <Flex grow>
                <nav>
                    <ul>
                        <li><Link href="https://www.somarl.com"><a>About</a></Link></li>
                        <li><Link href="https://blog.somarl.com"><a>Blogs</a></Link></li>
                        <li><Link href="/"><a>Moments</a></Link></li>
                        {slug
                            ? <li><span>Edit this post</span><Link href={`https://github.com/somarlyonks/somarl.com/edit/master/packages/blog/posts/${slug}.mdx`}><a role="button" target="_blank"><OcticonGithub /></a></Link></li>
                            : <li><span>Source</span><Link href="https://github.com/somarlyonks/somarl.com/tree/master/packages/moment"><a role="button" target="_blank"><OcticonGithub /></a></Link></li>
                        }
                    </ul>
                </nav>
                <Flex grow />
                <aside>
                    <Link href="https://www.somarl.com"><img role="button" src="/images/pangurban.jpg" /></Link>
                    <Flex shrink>© 2022 Yang</Flex>
                    <Flex shrink>
                        <span>Hosted with</span>
                        <span style={{color: '#e25555'}}>&hearts;</span>
                        <span>by</span>
                        <Link href="https://vercel.com/"><a role="button" target="_blank"><Vercel /></a></Link>
                    </Flex>
                </aside>
            </Flex>
        </footer>
    )
}
