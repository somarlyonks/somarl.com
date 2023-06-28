'use client'

import {useEffect, useState} from 'react'
// import {redirect} from 'next/navigation'

import Userfront from '@/libs/userfront'
import PostEditActionGroup from './PostEditActionGroup'


interface IProps {
    content?: string
}

export default function PostEdit ({content: propContent = ''}: IProps) {
    // if (!Userfront.user.hasRole('admin')) redirect('/')

    const [content, setContent] = useState(propContent)

    useEffect(() => {
        console.info(Userfront.user, Userfront.user.hasRole('admin')) // TODELETE
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value)
    }

    function submit () {
        'use server'

        fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({content}),
        })
    }

    return (
        <main>
            <form action={submit}>
                <textarea name="content" value={content} onChange={handleChange} />
                <PostEditActionGroup />
            </form>
        </main>
    )
}
