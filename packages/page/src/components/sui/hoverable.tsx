import { h } from 'preact'
import { useState, useRef } from 'preact/hooks'

import { bem, getAbsolutePivot } from 'src/helpers'
import { Callout } from './layer'

interface IHoverableProps {
  class?: S
  children: L<h.JSX.Element>
  delay?: N
  onShow?: h.JSX.GenericEventHandler
  onHide?: h.JSX.GenericEventHandler
  position?: 'top' | 'right' | 'bottom' | 'left'
  offset?: N
}

interface IHoverableState {
  visible: boolean
  position: 'top' | 'right' | 'bottom' | 'left'
  x: N
  y: N
}


/**
 * h.JSX types make sure there will be at least two children
 * @example
 *   <Hoverable>
 *     <Trigger />
 *     <Hover />
 *   </Hoverable>
 */
export default function Hoverable ({
  class: className = '',
  delay = 256,
  children,
  onShow,
  onHide,
  position: propPosition = 'top',
  offset = 5,
}: IHoverableProps) {
  let delayTimer: NodeJS.Timeout
  const [{ visible, x, y, position }, setState] = useState<IHoverableState>({
    visible: false,
    position: propPosition,
    x: 0,
    y: 0,
  })
  const deriveState = (state: Partial<IHoverableState>) => setState(prev => ({...prev, ...state}))

  const $callout = useRef<HTMLDivElement>()

  const getPosition = ($target: TargetElement, expectedPosition: IHoverableProps['position']) => {
    const candidates: L<IHoverableState['position']> = ['top', 'bottom', 'right', 'left']

    const calloutBox = $callout.current
      ? $callout.current.getBoundingClientRect()
      : new DOMRect(0, 0, 0, 0)

    /** @todo @sy improve this */
    const isPositionFine = (xy: IV2, testPosition: IHoverableState['position']) => {
      switch (testPosition) {
        case 'top':
          return calloutBox.height < xy.y

        case 'bottom':
          return calloutBox.height + xy.y < window.innerHeight

        case 'left':
          return calloutBox.width < xy.x

        case 'right':
          return calloutBox.width + xy.x < window.innerWidth
      }
    }

    const tryPosition = (testPosition: IHoverableState['position']): IV2 => {
      return {x: 0, y: 0, ...getAbsolutePivot($target, testPosition, offset)}
    }

    if (expectedPosition) {
      const xy = tryPosition(expectedPosition)
      if (isPositionFine(xy, expectedPosition)) return {position: expectedPosition, ...xy}
    }
    for (const candidate of candidates.filter(c => c !== expectedPosition)) {
      const xy = tryPosition(candidate)
      if (isPositionFine(xy, candidate)) return xy
      if (candidate === candidates[candidates.length - 1]) return {position: candidate, ...xy}
    }
    return {position: candidates[0], x: 0, y: 0} // covered by loop guard, placed here to fool tsc
  }

  const showHover: h.JSX.MouseEventHandler = e => {
    delayTimer = setTimeout(() => {
      setState(prev => ({...prev, visible: true, ...getPosition(e.target, propPosition)}))
      if (onShow) onShow(e)
    }, delay)
  }
  const hideHover: h.JSX.MouseEventHandler = e => {
    clearTimeout(delayTimer)
    deriveState({visible: false})
    if (onHide) onHide(e)
  }

  return (
    <div class="hover">
      <div
        class={'hover-wrapper ' + className}
        onMouseEnter={showHover}
        onMouseLeave={hideHover}
      >
        <Trigger>{children[0]}</Trigger>
        <Callout
          ref={$callout}
          class={bem('hover-callout', '', [position])}
          visible={visible}
          left={x}
          top={y}
        >{children[1]}
        </Callout>
      </div>
    </div>
  )
}

function Trigger (props: {children: h.JSX.Element}) {
  return (
    props.children
  )
}
