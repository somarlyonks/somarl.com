import {cookies} from 'next/headers'
import {redirect, notFound} from 'next/navigation'

import Userfront from '@/libs/userfront'
import {fetchPrisma} from '@/libs/prisma'
import PostEdit from '@/components/post/edit/PostEdit'


interface IProps {
    id?: string
}

export default async function Page ({searchParams: {id}}: {searchParams: IProps}) {
    const cookieStore = cookies()
    const isLoggedIn = !!cookieStore.get(Userfront.tokens.accessTokenName)
    if (!isLoggedIn) redirect('/login?redirect=/post')

    if (id) {
        const {content} = await getPost(id)

        return (
            <PostEdit content={content} />
        )
    }

    await getPosts()

    return (
        <PostEdit />
    )
}

const getPosts = async () => fetchPrisma(async (prisma) => {
    return prisma.post.findMany()
})

const getPost = async (id: string) => fetchPrisma(async (prisma) => {
    try {
        return await prisma.post.findUniqueOrThrow({
            where: {
                id: Number(id),
            },
        })
    } catch {
        notFound()
    }
})
