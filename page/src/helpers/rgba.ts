import { hex2rgb } from './transformers'


const completeHex = (s: S) => {
  if (s.length >= 7) return s.slice(0, 7)
  if (s.length === 6) return s + 'f'
  if (s.length === 5) return `${s.slice(0, 3)}${s[3]}${s[3]}${s[4]}${s[4]}`
  if (s.length === 4) return `${s.slice(0, 1)}${s[1]}${s[1]}${s[2]}${s[2]}${s[3]}${s[3]}`
  return s
}

/**
 * fixes campatibilities for shortcut rgba colors like rgba(#fff, 0.2) to rgba(255, 255, 255, 0.2)
 */
export default function rgba (input: string): string {
  if (!input.startsWith('rgba(#')) return input

  const groups = input.replace('rgba(', '').replace(')', '').split(',').map((color: S) => color.trim())
  if (groups.length !== 2) return input

  const [hex, alpha] = groups

  return `rgba(${hex2rgb(completeHex(hex)).join(',')}, ${alpha})`
}
