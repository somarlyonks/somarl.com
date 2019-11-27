import { bem } from '../../helpers'


it('renders blocks', () => {
  expect(bem('x', ['y'])).toBe('x x--y')

  expect(bem('x', ['y', false && 'z'])).toBe('x x--y')

  expect(bem('x', ['y', true && 'z'])).toBe('x x--y x--z')

  expect(bem('x', ['y', {alpha: true, beta: false}])).toBe('x x--y x--alpha')

  expect(bem('x', ['y', true && 'z', {alpha: true, beta: false}]))
    .toBe('x x--y x--z x--alpha')
})


it('renders elements', () => {
  expect(bem('x', 'y', ['z'])).toBe('x__y x__y--z')

  expect(bem('x', 'y', ['z', false && 'alpha'])).toBe('x__y x__y--z')

  expect(bem('x', 'y', ['z', true && 'alpha'])).toBe('x__y x__y--z x__y--alpha')

  expect(bem('x', 'y', ['z', {beta: true, gamma: false}]))
    .toBe('x__y x__y--z x__y--beta')

  expect(bem('x', 'y', ['z', true && 'alpha', {beta: true, gamma: false}]))
    .toBe('x__y x__y--z x__y--alpha x__y--beta')
})


it('can be curried', () => {
  const em = bem('x')

  expect(em([])).toBe('x')

  expect(em(['y'])).toBe('x x--y')

  expect(em(['y', false && 'z'])).toBe('x x--y')

  expect(em(['y', true && 'z'])).toBe('x x--y x--z')

  expect(em(['y', {alpha: true, beta: false}])).toBe('x x--y x--alpha')

  expect(em(['y', true && 'z', {alpha: true, beta: false}]))
    .toBe('x x--y x--z x--alpha')

  expect(em('y', ['z', false && 'alpha'])).toBe('x__y x__y--z')

  expect(em('y', ['z', true && 'alpha'])).toBe('x__y x__y--z x__y--alpha')

  expect(em('y', ['z', {beta: true, gamma: false}]))
    .toBe('x__y x__y--z x__y--beta')

  expect(em('y', ['z', true && 'alpha', {beta: true, gamma: false}]))
    .toBe('x__y x__y--z x__y--alpha x__y--beta')
})
