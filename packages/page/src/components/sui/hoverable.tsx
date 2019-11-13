import { h } from 'preact'
import { useState, useRef } from 'preact/hooks'

import { bem, getAbsolutePivot, ISimplePosition, IOffsetPosition, IPosition, simplePositionMap } from 'src/helpers'
import { Callout } from './layer'

interface IHoverableProps {
  class?: S
  children: L<h.JSX.Element>
  delay?: N
  onShow?: h.JSX.GenericEventHandler
  onHide?: h.JSX.GenericEventHandler
  position?: IPosition
  offset?: N
  beakSize?: N
}

interface IHoverableState {
  visible: boolean
  position: IOffsetPosition
  x: N
  y: N
  beakPosition: ISimplePosition
  beakOffsetPosition: ISimplePosition
  beakOffset: N
}

const oppositePositionMap: {[k in IHoverableState['position']]: ISimplePosition} = {
  'top-left': 'bottom',
  'top-right': 'bottom',
  'right-top': 'left',
  'right-bottom': 'left',
  'bottom-left': 'top',
  'bottom-right': 'top',
  'left-top': 'right',
  'left-bottom': 'right',
}

const beakOffsetPositionMap: {[k in IHoverableState['position']]: ISimplePosition} = {
  'top-left': 'left',
  'top-right': 'right',
  'right-top': 'top',
  'right-bottom': 'bottom',
  'bottom-left': 'left',
  'bottom-right': 'right',
  'left-top': 'top',
  'left-bottom': 'bottom',
}
const beakOffsetAxisMap: {[k in IHoverableState['position']]: 'width' | 'height'} = {
  'top-left': 'width',
  'top-right': 'width',
  'right-top': 'height',
  'right-bottom': 'height',
  'bottom-left': 'width',
  'bottom-right': 'width',
  'left-top': 'height',
  'left-bottom': 'height',
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
  position: rawPropPosition = 'top',
  offset = 7,
  beakSize = 5,
}: IHoverableProps) {
  let delayTimer: NodeJS.Timeout
  const propPosition: IOffsetPosition = simplePositionMap[rawPropPosition] || 'top-left'
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

  const getPosition = ($target: TargetElement, expectedPosition: IOffsetPosition) => {
    const candidates: L<IHoverableState['position']> = [ 'top-left', 'top-right'
                                                       , 'right-top' , 'right-bottom'
                                                       , 'bottom-left' , 'bottom-right'
                                                       , 'left-top' , 'left-bottom']

    if (!$callout.current) throw Error('callout content not ready')
    if (!($target instanceof Element)) throw Error('callout target not ready')

    const targetBox = $target.getBoundingClientRect()
    const calloutBox = $callout.current.getBoundingClientRect()

    /** @todo @sy improve this */
    const isPositionFine = (xy: IV2, testPosition: IHoverableState['position']) => {
      const [mainPosition, subPosition] = testPosition.split('-') as  L<ISimplePosition>
      const isMainPositionFine = () => {
        switch (mainPosition) {
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
      const isSubPositionFine = () => {
        switch (subPosition) {
          case 'left':
            return xy.x + calloutBox.width < window.innerWidth

          case 'right':
            return xy.x > 0

          case 'top':
            return xy.y + calloutBox.height < window.innerHeight

          case 'bottom':
            return xy.y > 0
        }
      }
      return isMainPositionFine() && isSubPositionFine()
    }

    const tryPosition = (testPosition: IHoverableState['position']): IV2 => {
      return {x: 0, y: 0, ...getAbsolutePivot($target, testPosition, offset)}
    }

    const acceptPosition = (
      acceptedPosition: IHoverableState['position'], xy: IV2
    ): Partial<IHoverableState> => {
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
