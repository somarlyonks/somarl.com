import { completeHex, rgba, revertObject, format, reduce, sum } from '../../helpers/transformers'


it('renders hex shortcuts', () => {
  expect(completeHex('#ff')).toBe('#ff')
})

it('renders rgba shortcuts', () => {
  expect(rgba('x')).toBe('x')
  expect(rgba('rgba(#f00, 0.1)')).toBe('rgba(255,0,0, 0.1)')
  expect(rgba('rgba(255,0,0, 0.1)')).toBe('rgba(255,0,0, 0.1)')
})

it('reverts objects', () => {
  expect(revertObject({x: 'y'})).toStrictEqual({y: ['x']})
  expect(revertObject({x: 'y', z: 'y'})).toStrictEqual({y: ['x', 'z']})
})

it('formats string', () => {
  expect(format('x', 1)).toBe('x')

  expect(format('x', 3)).toBe('x  ')
  expect(format('x', 3, 'C')).toBe(' x ')
  expect(format('x', 3, 'R')).toBe('  x')
  expect(format('x', 4, 'C')).toBe(' x  ')

  expect(format('xyzab', 3)).toBe('xyz')
  expect(format('xyzab', 3, 'C')).toBe('yza')
  expect(format('xyzab', 3, 'R')).toBe('zab')
})

it('reduces', () => {
  expect(reduce([1, 2, 3], (r, x) => r + x)).toBe(6)
  expect(reduce([1, 2, 3], (r, x) => r + x, 0)).toBe(6)
})

it('sums numbers', () => {
  expect(sum([1, 2, 3])).toBe(6)
  expect(sum(1, 2, 3)).toBe(6)
  expect(sum(1, [2, 3])).toBe(6)
  expect(sum([1, 2], 3)).toBe(6)
})
