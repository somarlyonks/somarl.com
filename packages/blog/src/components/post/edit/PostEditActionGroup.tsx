'use client'

import Button from '@/components/Button'


interface IProps {
}

export default function PostEditActionGroup ({}: IProps) {
    return (
        <div className="action-group">
            <Button type="submit" label="Save" />
        </div>
    )
}
