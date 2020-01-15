export type ISimplePosition = 'top' | 'right' | 'bottom' | 'left'
export type IOffsetPosition = 'top-left' | 'top-right'
                            | 'right-top' | 'right-bottom'
                            | 'bottom-left' | 'bottom-right'
                            | 'left-top' | 'left-bottom'
export type IPosition = ISimplePosition | IOffsetPosition

export function getRelativePivot (
  $el: TargetElement, position: IPosition, offset = 0
): {} | IV2 {
  return getPivot($el, position, offset, false)
}

export function getAbsolutePivot (
  $el: TargetElement, position: IPosition, offset = 0
): {} | IV2 {
  return getPivot($el, position, offset)
}

export function getPivot (
  $el: TargetElement,
  position: IPosition,
  offset = 0,
  absolute = true
): {} | IV2 {
  if (!$el || !($el as A).getBoundingClientRect) return {}

  const box = ($el as A).getBoundingClientRect()

  const ret = {
    x: box.width / 2,
    y: box.height / 2,
  }

  const [mainPosition, subPosition] = position.split('-')

  switch (mainPosition) {
    case 'top':
      ret.y = 0 - offset
      break
    case 'right':
      ret.x = box.width + offset
      break
    case 'bottom':
      ret.y = box.height + offset
      break
    case 'left':
      ret.x = 0 - offset
      break
  }

  switch (subPosition) {
    case 'top':
      ret.y = 0
      break
    case 'right':
      ret.x = box.width
      break
    case 'bottom':
      ret.y = box.height
      break
    case 'left':
      ret.x = 0
      break
  }

  if (absolute) {
    ret.x += box.left
    ret.y += box.top
  }

  return ret
}


export const simplePositionMap: {[k in IPosition]: IOffsetPosition} = {
  top: 'top-left',
  right: 'right-top',
  bottom: 'bottom-left',
  left: 'left-top',
  'top-left': 'top-left',
  'top-right': 'top-right',
  'right-top': 'right-top',
  'right-bottom': 'right-bottom',
  'bottom-left': 'bottom-left',
  'bottom-right': 'bottom-right',
  'left-top': 'left-top',
  'left-bottom': 'left-bottom',
}
