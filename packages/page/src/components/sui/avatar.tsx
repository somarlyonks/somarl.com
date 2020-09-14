import { h } from 'preact' // lgtm [js/unused-local-variable]

import { qUrl, bem } from 'src/helpers'
import { IUserState } from 'src/redux/store/user'


interface IProps {
  user: IUserState['user']
  class?: S
  size?: 'default' | 'large' | 'medium' | 'small'
  shape?: 'rounded' | 'circle' | 'square'
  onClick?: F0<void>
}


export default function avatar ({
  shape = 'rounded',
  size,
  user,
  class: className = '',
  onClick,
}: IProps) {
  const imgKey = user.avatar
  const em = bem('avatar')

  return (
    <div class={`${className} ${em('', [shape, size])}`} onClick={onClick}>
      <img src={qUrl(imgKey)} alt="" />
    </div>
  )
}
