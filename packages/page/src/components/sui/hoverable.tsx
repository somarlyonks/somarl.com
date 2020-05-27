import { h } from 'preact'
import { useState } from 'preact/hooks'

import { IPosition } from 'src/helpers'
import { Callout } from './layer'

interface IHoverableProps {
  children: L<h.JSX.Element>
  class?: S
  contentClass?: S
  position?: IPosition
  delay?: N
  onShow?: F0<void>
  onHide?: F0<void>
  offset?: N
  beakSize?: N
}


/**
 * h.JSX types make sure there will be at least two children
 * @example
 *   <Hoverable>
 *     <Trigger />
 *     <Callout />
 *   </Hoverable>
 */
export default function Hoverable ({
  class: className = '',
  contentClass = '',
  position = 'top',
  delay = 256,
  children,
  onShow,
  onHide,
  offset,
  beakSize,
}: IHoverableProps) {
  const [visible, setState] = useState(false)

  let delayTimer: A
  const showHover: h.JSX.MouseEventHandler<HTMLDivElement> = e => {
    delayTimer = setTimeout(() => {
      try {
        setState(true)
      } catch (err) {
        console.error(err)
      }
    }, delay)
  }
  const hideHover: h.JSX.MouseEventHandler<HTMLDivElement> = e => {
    clearTimeout(delayTimer)
    setState(false)
  }

  return (
    <div class="hover">
      <div
        class={'hover-wrapper ' + className}
        onMouseEnter={showHover}
        onMouseLeave={hideHover}
      >
        <Callout
          visible={visible}
          position={position}
          onShow={onShow}
          onHide={onHide}
          offset={offset}
          beakSize={beakSize}
          class={contentClass}
        >
          {children}
        </Callout>
      </div>
    </div>
  )
}
