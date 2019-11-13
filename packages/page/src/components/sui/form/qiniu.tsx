import { h } from 'preact'
import { useRef, PropRef, useState } from 'preact/hooks'

import Button from './button'
import { req, Api, QINIU_UPLOAD_URL, iOError } from 'src/helpers'


interface IQiniuInputProps {
  onUpload: F
  childrenFactory?: ($input: PropRef<HTMLInputElement>) => h.JSX.Element
  userId?: S
  accept?: S
}

async function uploadFile (file: File, userId?: S) {
  if (!file) return

  const data = new window.FormData()
  data.append('file', file)
  data.append('x:userId', userId || '')
  try {
    const token = userId ? await Api.getQiniuSyncToken() : await Api.getQiniuToken()
    data.append('token', token)
  } catch (error) {
    return iOError(error)
  }

  return req.POST(QINIU_UPLOAD_URL, { body: data })
}

export default function QiniuInput ({
  childrenFactory,
  userId,
  onUpload,
  accept = 'image/*',
}: IQiniuInputProps) {
  const $input = useRef<HTMLInputElement>()
  const [loading, updateLoading] = useState(false)

  const onClick: h.JSX.MouseEventHandler<HTMLElement> = event => $input.current!.click()
  const onChange: h.JSX.GenericEventHandler<HTMLInputElement> = async event => {
    const file = ((event.target as HTMLInputElement).files || [])[0]
    updateLoading(true)
    const r = await uploadFile(file, userId)
    updateLoading(false)
    onUpload(r)
  }

  return (
    <div class="fabric-container">
      <input
        ref={$input}
        style={{display: 'none'}}
        type="file"
        accept={accept}
        onChange={onChange}
      />
      {
        childrenFactory
          ? childrenFactory($input)
          : <Button label="qiniu" onClick={onClick} loading={loading} />
      }
    </div>
  )
}
