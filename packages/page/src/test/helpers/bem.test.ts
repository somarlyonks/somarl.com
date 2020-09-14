import { bem } from '../../helpers'


it('renders blocks', () => {
  expect(bem('x', '', ['y'])).toBe('x x--y')

  expect(bem('x', '', ['y', false && 'z'])).toBe('x x--y')

  expect(bem('x', '', ['y', true && 'z'])).toBe('x x--y x--z')

  expect(bem('x', '', {alpha: true, beta: false})).toBe('x x--alpha')
})


it('renders elements', () => {
  expect(bem('x', 'y', ['z'])).toBe('x__y x__y--z')

  expect(bem('x', 'y', ['z', false && 'alpha'])).toBe('x__y x__y--z')

  expect(bem('x', 'y', ['z', true && 'alpha'])).toBe('x__y x__y--z x__y--alpha')

  expect(bem('x', 'y', {beta: true, gamma: false}))
    .toBe('x__y x__y--beta')
})


it('can be curried', () => {
  const em = bem('x')

  expect(em('', [])).toBe('x')

  expect(em('', ['y'])).toBe('x x--y')

  expect(em('', ['y', false && 'z'])).toBe('x x--y')

  expect(em('', ['y', true && 'z'])).toBe('x x--y x--z')

  expect(em('', {alpha: true, beta: false})).toBe('x x--alpha')

  expect(em('y', ['z', false && 'alpha'])).toBe('x__y x__y--z')

  expect(em('y', ['z', true && 'alpha'])).toBe('x__y x__y--z x__y--alpha')

  expect(em('y', {beta: true, gamma: false}))
    .toBe('x__y x__y--beta')
})
