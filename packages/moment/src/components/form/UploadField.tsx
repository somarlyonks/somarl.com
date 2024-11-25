import {forwardRef, useState} from 'react'

import {IFieldProps} from './shared'
import field from './Field'
import Flex from '../Flex'
import Copy from '../Copy'
import Upload, {IProps as IUploadProps} from '../Upload'


interface IProps extends IFieldProps<HTMLSelectElement> {
}

export default field('upload', context => forwardRef<HTMLInputElement, IProps & Partial<IUploadProps>>(({
    onUpload,
    onStart,
    // tslint:disable-next-line: trailing-comma
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
