
import { h } from 'preact' // lgtm [js/unused-local-variable]


interface IProps {
  inline?: boolean
  quote: S
  cite?: S
  author?: S
  work?: S
}


export default function Quote ({
  inline = false,
  quote,
  cite,
  author,
  work,
}: IProps) {
  if (inline) return (
    <span><q cite={cite}>{quote}</q>{author ? <span>{author}</span> : null}{work ? <cite>{work}</cite> : null}</span>
  )
  return (
    <blockquote cite={cite}>
      <p>{quote}</p>
      {author || work ? (
        <footer>
          {author ? <span>{author}</span> : null}
          {work ? <cite>{work}</cite> : null}
        </footer>
      ) : null}
    </blockquote>
  )
}
