import { getPivot } from '../../helpers/dom'


it('gets pivot', () => {
  const $el = document.createElement('div')
  expect(getPivot($el, 'top')).toStrictEqual({x: 0, y: 0})
  expect(getPivot($el, 'right')).toStrictEqual({x: 0, y: 0})
  expect(getPivot($el, 'bottom')).toStrictEqual({x: 0, y: 0})
  expect(getPivot($el, 'left')).toStrictEqual({x: 0, y: 0})
  expect(getPivot($el, 'top-left')).toStrictEqual({x: 0, y: 0})
  expect(getPivot($el, 'top-right')).toStrictEqual({x: 0, y: 0})
  expect(getPivot($el, 'bottom-left')).toStrictEqual({x: 0, y: 0})
  expect(getPivot($el, 'bottom-right')).toStrictEqual({x: 0, y: 0})
  expect(getPivot($el, 'left-top')).toStrictEqual({x: 0, y: 0})
  expect(getPivot($el, 'left-bottom')).toStrictEqual({x: 0, y: 0})
  expect(getPivot($el, 'right-top')).toStrictEqual({x: 0, y: 0})
  expect(getPivot($el, 'right-bottom')).toStrictEqual({x: 0, y: 0})
})
