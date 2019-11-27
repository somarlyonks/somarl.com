import { format } from '../../helpers/transformers'

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
