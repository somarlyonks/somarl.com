
import { h, ComponentChildren } from 'preact' // lgtm [js/unused-local-variable]
import { useState } from 'preact/hooks'


type ISlidePosition = 'middle' | 'left' | 'right'

interface IProps {
  width: S
  children: ComponentChildren
  direction: ISlidePosition
  onChange?: h.JSX.AnimationEventHandler<HTMLDivElement>
  onEnd?: h.JSX.AnimationEventHandler<HTMLDivElement>
}

interface IPropsBroughtByHook {
  direction: ISlidePosition
  onChange?: h.JSX.AnimationEventHandler<HTMLDivElement>
  onEnd: h.JSX.AnimationEventHandler<HTMLDivElement>
}

type ISlideGo = (_direction: ISlidePosition, _onChange?: F0) => void


export default function Slide ({
  width,
  children,
  direction,
  onChange,
  onEnd,
}: IProps) {
  const [position, setPositon] = useState<ISlidePosition>('middle')
  const oppositeMap = {left: 'right', right: 'left'}
  const onAnimationEnd: h.JSX.AnimationEventHandler<HTMLDivElement> = event => {
    const animationName = event.animationName
    const target = event.currentTarget
    if (animationName.startsWith('middleTo')) {
      if (onChange) onChange.bind(target)(event)
      setPositon(oppositeMap[direction])
    } else {
      if (onEnd) onEnd.bind(target)(event)
      setPositon('middle')
    }
  }

  return (
    <div style={{width, overflow: 'hidden'}}>
      <div class={`fabric-wrapper slide-wrapper animation--${direction} animation-at--${position}`} onAnimationEnd={onAnimationEnd}>
        <div class="span--left" />
        {children}
        <div class="span--right" />
      </div>
    </div>
  )
}


export function useSlide (): [typeof Slide, IPropsBroughtByHook, ISlideGo] {
  const [{direction, onChange}, setState] = useState<{
    direction: ISlidePosition
    onChange?: F0
  }>({direction: 'middle'})

  const slideGo = (_direction: ISlidePosition, _onChange?: F0) => setState(prev => ({
    ...prev,
    direction: _direction,
    onChange: _onChange || prev.onChange,
  }))

  const slideProps: IPropsBroughtByHook = {
    direction,
    onChange,
    onEnd: () => slideGo('middle'),
  }

  return [Slide, slideProps, slideGo]
}
