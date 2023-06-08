import Userfront from '@/libs/userfront'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'


export default function Page () {
    const cookieStore = cookies()
    const isLoggedIn = !!cookieStore.get(Userfront.tokens.accessTokenName)
    if (!isLoggedIn) redirect('/login?redirect=/post')
    if (!Userfront.user.hasRole('admin')) redirect('/')

    return (
        <div>post</div>
    )
}
