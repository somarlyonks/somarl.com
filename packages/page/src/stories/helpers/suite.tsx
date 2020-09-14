import { h } from 'preact' // lgtm [js/unused-local-variable]
import { bem } from '../../helpers'


interface ISuiteProps {
  caption: S
  children: A
  fixme?: boolean
}


export const Suite = ({
  caption,
  children,
  fixme = false,
}: ISuiteProps) => {
  return (
    <div class={bem('story-suite', '', {fixme})}>
      <h2 class="story-suite__caption">{caption}</h2>
      <div class="story-suite__content flex">{...children}</div>
    </div>
  )
}
