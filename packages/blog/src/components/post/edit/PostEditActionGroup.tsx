'use client'

import {experimental_useFormStatus as useFormStatus} from 'react-dom'

import Button from '@/components/Button'


interface IProps {
}

export default function PostEditActionGroup ({}: IProps) {
    const {pending} = useFormStatus()

    return (
        <div className="action-group">
            <Button type="submit" disabled={pending} label="Save" />
        </div>
    )
}
