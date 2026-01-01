import Link from 'next/link'

import Flex from './Flex'
import Vercel from './icons/Vercel'
import OcticonGithub from '@somarl.com/icons/Github'
import OcticonRSS from './icons/RSS'

export default function Footer ({slug}: {slug?: string}) {
    return (
        <footer>
            <Flex grow>
                <nav>
                    <ul>
                        <li><Link href="https://www.somarl.com">About</Link></li>
                        <li><Link href="/">Blogs</Link></li>
                        <li><Link href="https://moment.somarl.com">Moments</Link></li>
                        {slug
                            ? <li><span>Edit this post</span><Link href={`https://github.com/somarlyonks/somarl.com/edit/master/packages/blog/posts/${slug}.mdx`} role="button" target="_blank"><OcticonGithub /></Link></li>
                            : <li><span>Source</span><Link href="https://github.com/somarlyonks/somarl.com/tree/master/packages/blog" role="button" target="_blank"><OcticonGithub /></Link><Link href="/rss.xml" role="button" target="_blank"><OcticonRSS /></Link></li>}
                    </ul>
                </nav>
                <Flex grow />
                <aside>
                    <Link href="https://www.somarl.com"><img role="button" src="/images/pangurban.jpg" /></Link>
                    <Flex shrink>© 2026 Yang</Flex>
                    <Flex shrink>
                        <span>Hosted with</span>
                        <span style={{color: '#e25555'}}>&hearts;</span>
                        <span>by</span>
                        <Link href="https://vercel.com/" role="button" target="_blank"><Vercel /></Link>
                    </Flex>
                </aside>
            </Flex>
        </footer>
    )
}
