import { h } from 'preact' // lgtm [js/unused-local-variable]

import { qUrl, bem } from 'src/helpers'
import { IUserState } from 'src/redux/store/user'


interface IProps {
  user: IUserState['user']
  size?: 'large' | 'default' | 'small'
  shape?: 'circle' | 'rounded' | 'square'
}


export default function avatar ({
  shape = 'rounded',
  size,
  user,
}: IProps) {
  const imgKey = user.avatar
  const em = bem('avatar')

  return (
    <div class={`${em('', [shape, size])}`}>
      <img src={qUrl(imgKey)} alt="" />
    </div>
  )
}
