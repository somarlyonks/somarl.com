import Link from 'next/link'
import OcticonGithub from '@somarl.com/icons/Github'

import Flex from './Flex'
import Vercel from './icons/Vercel'

export default function Footer (
    // {slug}: {slug?: string},
) {
    return (
        <footer>
            <Flex grow>
                <nav>
                    <ul>
                        <li><Link href="https://www.somarl.com">About</Link></li>
                        <li><Link href="https://blog.somarl.com">Blogs</Link></li>
                        <li><Link href="/">Moments</Link></li>
                        <li>
                            <span>Source</span>
                            <Link href="https://github.com/somarlyonks/somarl.com/tree/master/packages/moment" role="button" target="_blank"><OcticonGithub /></Link>
                        </li>
                    </ul>
                </nav>
                <Flex grow />
                <aside>
                    <Link href="https://www.somarl.com"><img role="button" src="/images/pangurban.jpg" /></Link>
                    <Flex shrink>© 2024 Yang</Flex>
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
