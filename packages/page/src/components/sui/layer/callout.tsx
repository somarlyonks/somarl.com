import { h } from 'preact' // lgtm [js/unused-local
import { forwardRef } from 'preact/compat'

import { Layer } from './layer'


interface ICalloutProps {
  visible: boolean
  top: N
  left: N
  children: A
  class?: S
}

export const Callout = forwardRef(({
  visible,
  children,
  left,
  top,
  class: className = '',
}: ICalloutProps, ref) => {
  if (visible) return (
    <Layer type="callout">
      <div
        ref={ref}
        class={'callout ' + className}
        tabIndex={-1}
        style={{ top, left }}
      >
        {...children}
      </div>
    </Layer>
  )

  return (<div class="hidden" />)
})
