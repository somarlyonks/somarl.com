import { h } from 'preact' // lgtm [js/unused-local-variable]


interface ISuiteProps {
  caption: S
  children: A
}


export const Suite = ({
  caption,
  children,
}: ISuiteProps) => {
  return (
    <div class="story-suite">
      <h2 class="story-suite__caption">{caption}</h2>
      <div class="story-suite__content flex">{...children}</div>
    </div>
  )
}
