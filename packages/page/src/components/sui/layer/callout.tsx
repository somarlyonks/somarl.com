import { h } from 'preact'
import { forwardRef, Ref } from 'preact/compat'

import { Layer } from './layer'


interface ICalloutProps {
  visible: boolean
  top: N
  left: N
  children: h.JSX.Element | L<h.JSX.Element>
  class?: S
}

export const Callout = forwardRef(({
  visible,
  children,
  left,
  top,
  class: className = '',
}: ICalloutProps, ref: Ref<HTMLDivElement>) => {
  if (visible) return (
    <Layer type="callout">
      <div
        ref={ref}
        class={'callout ' + className}
        tabIndex={-1}
        style={{ top, left }}
      >
        {children}
      </div>
    </Layer>
  )

  return (<div ref={ref} class="callout__scarecrow">{children}</div>)
})
