'use client'

import {useEffect, useState, ChangeEvent} from 'react'
// import {redirect} from 'next/navigation'

import PostEditActionGroup from './PostEditActionGroup'


interface IProps {
    content?: string
}

export default function PostEdit ({content: propContent = ''}: IProps) {
    const [content, setContent] = useState(propContent)

    useEffect(() => {
    }, [])

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value)
    }

    function submit () {
        // 'use server'

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
