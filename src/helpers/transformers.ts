/* tslint:disable: no-magic-numbers */

/* #abcdef => [171, 205, 239] */
export const hex2rgb = (hex: S) =>
  (n => [1, 2, 3].map(c => n << (c * 8) >>> 24))(Number(hex.replace('#', '0x')))
