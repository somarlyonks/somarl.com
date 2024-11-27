import {forwardRef, useState} from 'react'

import {IFieldProps} from './shared'
import field from './Field'
import Flex from '../Flex'
import Copy from '../Copy'
import Upload, {IProps as IUploadProps} from '../Upload'

export default field('upload', (/* context */) => forwardRef<HTMLInputElement, IFieldProps<HTMLSelectElement> & Partial<IUploadProps>>(({
    onUpload,
    onStart,
    ...props
}, ref) => {
    const [src, setSrc] = useState('')

    const handleStartUpload = () => {
        setSrc('')
        if (onStart) onStart()
    }
    const handleUpload = (url: string) => {
        setSrc(url)
        if (onUpload) onUpload(url)
    }

    return (
        <>
            <Upload {...props} onUpload={handleUpload} onStart={handleStartUpload} ref={ref} />
            {!!src && (
                <Flex className="field__info">
                    <Flex>
                        <a href={src} target="_blank" rel="noopener">{src}</a>
                        <Copy content={src} />
                    </Flex>
                </Flex>
            )}
        </>
    )
}))
