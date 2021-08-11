import Link from 'next/link'
import Flex from '@csszen/components.flexmini'

import Vercel from 'src/components/icons/Vercel'
import OcticonGithub from 'src/components/icons/OcticonGithub'
import OcticonRSS from 'src/components/icons/OcticonRSS'


export default function Footer ({slug}: {slug?: string}) {
    return (
        <footer>
            <Flex grow>
                <nav>
                    <ul>
                        <li><Link href="https://www.somarl.com"><a>About</a></Link></li>
                        <li><Link href="/"><a>Blogs</a></Link></li>
                        <li><Link href="https://moment.somarl.com"><a>Moments</a></Link></li>
                        {slug
                            ? <li>Edit this post<Link href={`https://github.com/somarlyonks/somarl.com/edit/master/packages/blog/posts/${slug}.mdx`}><a role="button" target="_blank"><OcticonGithub /></a></Link></li>
                            : <li>Source<Link href={`https://github.com/somarlyonks/somarl.com/tree/master/packages/blog`}><a role="button" target="_blank"><OcticonGithub /></a></Link><Link href="/rss.xml"><a role="button" target="_blank"><OcticonRSS /></a></Link></li>
                        }
                    </ul>
                </nav>
                <Flex grow />
                <aside>
                    <Link href="https://www.somarl.com"><img role="button" src="/images/pangurban.jpg" /></Link>
                    <Flex shrink>© 2021 Yang</Flex>
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
