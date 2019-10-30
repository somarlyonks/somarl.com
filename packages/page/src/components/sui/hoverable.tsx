import { h } from 'preact'
import { useState, useRef } from 'preact/hooks'

import { bem, getAbsolutePivot, IPosition } from 'src/helpers'
import { Callout } from './layer'

interface IHoverableProps {
  class?: S
  children: L<h.JSX.Element>
  delay?: N
  onShow?: h.JSX.GenericEventHandler
  onHide?: h.JSX.GenericEventHandler
  position?: 'top' | 'right' | 'bottom' | 'left'
  offset?: N
  beakSize?: N
}

interface IHoverableState {
  visible: boolean
  position: 'top' | 'right' | 'bottom' | 'left'
  x: N
  y: N
  beakPosition: 'top' | 'right' | 'bottom' | 'left'
  beakOffsetPosition: 'top' | 'right' | 'bottom' | 'left'
  beakOffset: N
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
  offset = 7,
  beakSize = 5,
}: IHoverableProps) {
  let delayTimer: NodeJS.Timeout
  const [{ visible, x, y, position, beakPosition: beakPostion, beakOffsetPosition: beakOffsetPostion, beakOffset }, setState] = useState<IHoverableState>({
    visible: false,
    position: propPosition,
    x: 0,
    y: 0,
    beakPosition: 'bottom',
    beakOffsetPosition: 'bottom',
    beakOffset: beakSize,
  })
  const deriveState = (state: Partial<IHoverableState>) => setState(prev => ({...prev, ...state}))

  const $callout = useRef<HTMLDivElement>()

  const getPosition = ($target: TargetElement, expectedPosition: IHoverableProps['position']) => {
    const candidates: L<IHoverableState['position']> = ['top', 'bottom', 'right', 'left']

    if (!$callout.current) throw Error('callout content not ready')
    if (!($target instanceof Element)) throw Error('callout target not ready')

    const targetBox = $target.getBoundingClientRect()
    const calloutBox = $callout.current.getBoundingClientRect()

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
      const positionMap: {[k: string]: IPosition} = {
        top: 'top-left',
        right: 'right-top',
        bottom: 'bottom-left',
        left: 'left-top',
      }
      return {x: 0, y: 0, ...getAbsolutePivot($target, positionMap[testPosition], offset)}
    }

    const acceptPosition = (
      acceptedPosition: IHoverableState['position'], xy: IV2
    ): Partial<IHoverableState> => {
      const oppositePositionMap: {[k: string]: IHoverableState['position']} = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }
      const beakOffsetPositionMap: {[k: string]: IHoverableState['position']} = {
        top: 'left',
        right: 'top',
        bottom: 'left',
        left: 'top',
      }
      const beakOffsetAxisMap: {[k: string]: 'width' | 'height'} = {
        top: 'width',
        right: 'height',
        bottom: 'width',
        left: 'height',
      }
      const beakOffsetAxis = beakOffsetAxisMap[acceptedPosition]
      const adjustedBeakOffset = Math.min(calloutBox[beakOffsetAxis], targetBox[beakOffsetAxis]) / 2

      return {
        position: acceptedPosition,
        beakPosition: oppositePositionMap[acceptedPosition],
        beakOffsetPosition: beakOffsetPositionMap[acceptedPosition],
        beakOffset: adjustedBeakOffset,
        ...xy,
      }
    }

    if (expectedPosition) {
      const xy = tryPosition(expectedPosition)
      if (isPositionFine(xy, expectedPosition)) return acceptPosition(expectedPosition, xy)
    }
    for (const candidate of candidates.filter(c => c !== expectedPosition)) {
      const xy = tryPosition(candidate)
      if (isPositionFine(xy, candidate)) return acceptPosition(candidate, xy)
      if (candidate === candidates[candidates.length - 1]) return acceptPosition(candidate, xy)
    }
    return {position: candidates[0], x: 0, y: 0} // covered by loop guard, placed here to fool tsc
  }

  const showHover: h.JSX.MouseEventHandler = e => {
    delayTimer = setTimeout(() => {
      try {
        setState(prev => ({...prev, visible: true, ...getPosition(e.target, propPosition)}))
        if (onShow) onShow(e)
      } catch (err) {
        console.error(err)
      }
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
        >
          <div
            class="hover-beak"
            style={{
              width: `${beakSize * 2}px`,
              height: `${beakSize * 2}px`,
              [beakPostion]: `-${beakSize}px`,
              [beakOffsetPostion]: `${beakOffset}px`,
            }}
          />
          <div className="callout__content">
            {children[1]}
          </div>
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
