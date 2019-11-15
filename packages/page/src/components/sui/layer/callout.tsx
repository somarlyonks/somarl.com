import { h } from 'preact'
import { useState, useRef, useEffect, PropRef } from 'preact/hooks'
import { forwardRef, Ref } from 'preact/compat'

import { bem, getAbsolutePivot, ISimplePosition, IOffsetPosition, IPosition, simplePositionMap } from 'src/helpers'
import { Layer } from './layer'


interface ICalloutLayerProps {
  visible: boolean
  top: N
  left: N
  children: h.JSX.Element | L<h.JSX.Element>
  class?: S
}

interface ICalloutProps {
  children: L<h.JSX.Element>
  visible: boolean
  class?: S
  onShow?: F0<void>
  onHide?: F0<void>
  position?: IPosition
  offset?: N
  beakSize?: N
}

interface ICalloutState {
  visible: boolean
  position: IOffsetPosition
  x: N
  y: N
  beakPosition: ISimplePosition
  beakOffsetPosition: ISimplePosition
  beakOffset: N
}


const CalloutLayer = forwardRef(({
  visible,
  children,
  left,
  top,
  class: className = '',
}: ICalloutLayerProps, ref: Ref<HTMLDivElement>) => {
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


const Trigger = forwardRef((props: {children: h.JSX.Element}, ref: PropRef<HTMLDivElement>) => (
  <div ref={ref}>{props.children}</div>
))


const oppositePositionMap: {[k in ICalloutState['position']]: ISimplePosition} = {
  'top-left': 'bottom',
  'top-right': 'bottom',
  'right-top': 'left',
  'right-bottom': 'left',
  'bottom-left': 'top',
  'bottom-right': 'top',
  'left-top': 'right',
  'left-bottom': 'right',
}

const beakOffsetPositionMap: {[k in ICalloutState['position']]: ISimplePosition} = {
  'top-left': 'left',
  'top-right': 'right',
  'right-top': 'top',
  'right-bottom': 'bottom',
  'bottom-left': 'left',
  'bottom-right': 'right',
  'left-top': 'top',
  'left-bottom': 'bottom',
}
const beakOffsetAxisMap: {[k in ICalloutState['position']]: 'width' | 'height'} = {
  'top-left': 'width',
  'top-right': 'width',
  'right-top': 'height',
  'right-bottom': 'height',
  'bottom-left': 'width',
  'bottom-right': 'width',
  'left-top': 'height',
  'left-bottom': 'height',
}


export function Callout ({
  children,
  onShow = () => {},
  onHide = () => {},
  position: rawPropPosition = 'top',
  offset = 7,
  beakSize = 5,
  visible: rawPropVisible,
}: ICalloutProps) {
  const propPosition: IOffsetPosition = simplePositionMap[rawPropPosition] || 'top-left'

  const $target = useRef<HTMLDivElement>()
  const $callout = useRef<HTMLElement>()

  const [{ visible, x, y, position, beakPosition, beakOffsetPosition, beakOffset }, setState] = useState<ICalloutState>({
    visible: false,
    position: propPosition,
    x: 0,
    y: 0,
    beakPosition: 'bottom',
    beakOffsetPosition: 'bottom',
    beakOffset: beakSize,
  })
  const deriveState = (state: Partial<ICalloutState>) => setState(prev => ({...prev, ...state}))

  const showHover: F0<void> = () => {
    if (!$target.current) return
    setState(prev => ({...prev, visible: true, ...getPosition($target.current!, propPosition)}))
    onShow()
  }
  const hideHover: F0<void> = () => {
    deriveState({visible: false})
    onHide()
  }

  const getPosition = ($targetEl: TargetElement, expectedPosition: IOffsetPosition) => {
    const candidates: L<ICalloutState['position']> = [ 'top-left', 'top-right'
                                                       , 'right-top' , 'right-bottom'
                                                       , 'bottom-left' , 'bottom-right'
                                                       , 'left-top' , 'left-bottom']

    if (!$callout.current) throw Error('callout content not ready')
    if (!($targetEl instanceof Element)) throw Error('callout target not ready')

    const targetBox = $targetEl.getBoundingClientRect()
    const calloutBox = $callout.current.getBoundingClientRect()

    const isPositionFine = (xy: IV2, testPosition: ICalloutState['position']) => {
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

    const tryPosition = (testPosition: ICalloutState['position']): IV2 => {
      return {x: 0, y: 0, ...getAbsolutePivot($targetEl, testPosition, offset)}
    }

    const acceptPosition = (
      acceptedPosition: ICalloutState['position'], xy: IV2
    ): Partial<ICalloutState> => {
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

  useEffect(() => {
    if (rawPropVisible) showHover()
    else hideHover()
  }, [rawPropVisible])

  return (
    <div>
      <Trigger ref={$target}>
        {children[0]}
      </Trigger>

      <CalloutLayer
        ref={$callout}
        class={bem('callout', '', [position])}
        visible={visible}
        left={x}
        top={y}
      >
        <div
          class="callout__beak"
          style={{
            width: `${beakSize * 2}px`,
            height: `${beakSize * 2}px`,
            [beakPosition]: `-${beakSize}px`,
            [beakOffsetPosition]: `${beakOffset}px`,
          }}
        />
        <div className="callout__content">
          {children[1]}
        </div>
      </CalloutLayer>
    </div>
  )
}
