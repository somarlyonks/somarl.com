export function getRelativePivot (
  $el: TargetElement, position: 'top' | 'right' | 'bottom' | 'left', offset = 0
): {} | IV2 {
  return getPivot($el, position, offset, false)
}

export function getAbsolutePivot (
  $el: TargetElement, position: 'top' | 'right' | 'bottom' | 'left', offset = 0
): {} | IV2 {
  return getPivot($el, position, offset)
}

export function getPivot (
  $el: TargetElement,
  position: 'top' | 'right' | 'bottom' | 'left',
  offset = 0,
  absolute = true
): {} | IV2 {
  if (!$el || !($el as A).getBoundingClientRect) return {}

  const box = ($el as A).getBoundingClientRect()

  const ret = {
    x: box.width / 2,
    y: box.height / 2,
  }

  switch (position) {
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

    default:
      break
  }

  if (absolute) {
    ret.x += box.left
    ret.y += box.top
  }

  return ret
}
