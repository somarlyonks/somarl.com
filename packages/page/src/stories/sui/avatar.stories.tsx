import { h } from 'preact' // lgtm [js/unused-local-variable]

import { Avatar } from 'src/components/sui'
import { Suite } from '../helpers'


export const AvatarStory = () => {
  const matthew = { avatar: '2019/10/21/FlycLLGmpIVbN6QDb06-s_ReoBmG.png' }

  return (
    <div>
      <Suite caption="default size(40 x 40)">
        <Avatar user={matthew} />
        <Avatar shape="square" user={matthew} />
        <Avatar shape="circle" user={matthew} />
      </Suite>

      <Suite caption="large(60 x 60)">
        <Avatar size="large" user={matthew} />
        <Avatar size="large" shape="square" user={matthew} />
        <Avatar size="large" shape="circle" user={matthew} />
      </Suite>

      <Suite caption="medium(32 x 32)">
        <Avatar size="medium" user={matthew} />
        <Avatar size="medium" shape="square" user={matthew} />
        <Avatar size="medium" shape="circle" user={matthew} />
      </Suite>

      <Suite caption="small(20 * 20)">
        <Avatar size="small" user={matthew} />
        <Avatar size="small" shape="square" user={matthew} />
        <Avatar size="small" shape="circle" user={matthew} />
      </Suite>
    </div>
  )
}
