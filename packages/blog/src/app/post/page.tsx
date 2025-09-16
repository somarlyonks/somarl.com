import {cookies} from 'next/headers'
import {redirect, notFound} from 'next/navigation'

import PostEdit from '@/components/post/edit/PostEdit'

interface IProps {
    id?: string
}

export default async function Page ({searchParams}: {searchParams: Promise<IProps>}) {
    const {id} = await searchParams
    const cookieStore = await cookies()
    const isLoggedIn = !!cookieStore.get('tokens.accessTokenName')
    if (!isLoggedIn) redirect('/login?redirect=/post')
    if (!id) notFound()

    return (
        <PostEdit />
    )
}
