import { h } from 'preact'
import { useRef, PropRef } from 'preact/hooks'

import Button from './button'
import { req, Api, QINIU_UPLOAD_URL } from '../../helpers'


interface IQiniuInputProps {
  childrenFactory?: ($input: PropRef<HTMLInputElement>) => h.JSX.Element
}

async function uploadFile (file: File) {
  if (!file) return

  const data = new window.FormData()
  data.append('file', file)
  data.append('token', await Api.getQiniuSyncToken())

  const r = await req.POST(QINIU_UPLOAD_URL, { body: data })
  console.info('RRR', r) // TODELETE
}

/**
 * TODO:
 * @todo multiple
 */
export default function QiniuInput ({ childrenFactory }: IQiniuInputProps) {
  const $input = useRef<HTMLInputElement>()
  const onClick: h.JSX.MouseEventHandler = event => $input.current!.click()
  const onChange: h.JSX.GenericEventHandler = event => {
    const file = ((event.target as HTMLInputElement).files || [])[0]
    uploadFile(file)
  }

  return (
    <div class="fabric-container">
      <input
        ref={$input}
        style={{display: 'none'}}
        type="file"
        onChange={onChange}
      />
      {
        childrenFactory
          ? childrenFactory($input)
          : <Button label="qiniu" onClick={onClick} />
      }
    </div>
  )
}
