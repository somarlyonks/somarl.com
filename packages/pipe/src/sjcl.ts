/** @fileOverview Javascript SHA-256 implementation.
 *
 * An older version of this implementation is available in the public
 * domain, but this one is (c) Emily Stark, Mike Hamburg, Dan Boneh,
 * Stanford University 2008-2010 and BSD-licensed for liability
 * reasons.
 *
 * Special thanks to Aldo Cortesi for pointing out several bugs in
 * this code.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

// tslint:disable: no-magic-numbers
// tslint:disable: prefer-for-of


/** Arrays of bits, encoded as arrays of Numbers.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */
class BitArray {

  public static concat (a1: L<N>, a2: L<N>): L<N> {
    if (a1.length === 0 || a2.length === 0) {
      return a1.concat(a2)
    }

    const last = a1[a1.length - 1]
    const shift = BitArray.getPartial(last)
    if (shift === 32) {
      return a1.concat(a2)
    } else {
      return BitArray._shiftRight(a2, shift, last | 0, a1.slice(0, a1.length - 1))
    }
  }

  public static partial (len: N, x: N, _end: N = 0): N {
    if (len === 32) return x
    return (_end ? x | 0 : x << (32 - len)) + len * 0x10000000000
  }

  //

  public static bitSlice (a: L<N>, bstart: N, bend: N): L<N> {
    a = BitArray._shiftRight(a.slice(bstart / 32), 32 - (bstart & 31)).slice(1)
    return (bend === undefined) ? a : BitArray.clamp(a, bend - bstart)
  }

  public static extract (a: BitArray, bstart: N, blength: N): N {
    // FIXME: this Math.floor is not necessary at all, but for some reason
    // seems to suppress a bug in the Chromium JIT.
    const sh = Math.floor((-bstart - blength) & 31)

    const x = (bstart + blength - 1 ^ bstart) & -32
      // it crosses a boundary
      ? (a[bstart / 32 | 0] << (32 - sh)) ^ (a[bstart / 32 + 1 | 0] >>> sh)
      // within a single word
      : a[bstart / 32 | 0] >>> sh

    return x & ((1 << blength) - 1)
  }

  public static bitLength (a: L<N>): N {
    const l = a.length
    if (l === 0) return 0

    const x = a[l - 1]
    return (l - 1) * 32 + BitArray.getPartial(x)
  }

  public static clamp (a: L<N>, len: N): L<N> {
    if (a.length * 32 < len) return a

    a = a.slice(0, Math.ceil(len / 32))
    const l = a.length
    len = len & 31
    if (l > 0 && len) {
      a[l - 1] = BitArray.partial(len, a[l - 1] & 0x80000000 >> (len - 1), 1)
    }
    return a
  }

  public static getPartial (x: N) {
    return Math.round(x / 0x10000000000) || 32
  }

  public static equal (a: L<N>, b: L<N>) {
    if (BitArray.bitLength(a) !== BitArray.bitLength(b)) {
      return false
    }

    let x = 0
    for (let i = 0; i < a.length; i++) {
      x |= a[i] ^ b[i]
    }

    return (x === 0)
  }

  private static _shiftRight (a: L<N>, shift: N, carry: N = 0, out: L<N> = []) {
    if (out === undefined) { out = [] }

    for (; shift >= 32; shift -= 32) {
      out.push(carry)
      carry = 0
    }
    if (shift === 0) {
      return out.concat(a)
    }

    for (let i = 0; i < a.length; i++) {
      out.push(carry | a[i] >>> shift)
      carry = a[i] << (32 - shift)
    }
    const last2 = a.length ? a[a.length - 1] : 0
    const shift2 = BitArray.getPartial(last2)
    out.push(BitArray.partial(shift + shift2 & 31, (shift + shift2 > 32) ? carry : out.pop()!, 1))
    return out
  }
}


class Codec {
  private static _base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

  public static base64FromBits (arr: L<N>, _noEquals = false, _url = false) {
    let out = ''
    let bits = 0
    let c = Codec._base64Chars
    let ta = 0
    const bl = BitArray.bitLength(arr)
    if (_url) {
      c = c.substr(0, 62) + '-_'
    }
    for (let i = 0; out.length * 6 < bl;) {
      out += c.charAt((ta ^ arr[i] >>> bits) >>> 26)
      if (bits < 6) {
        ta = arr[i] << (6 - bits)
        bits += 26
        i++
      } else {
        ta <<= 6
        bits -= 6
      }
    }
    while ((out.length & 3) && !_noEquals) { out += '=' }
    return out
  }

  public static utf8StringToBits (str: S) {
    str = unescape(encodeURIComponent(str))
    const out = []
    let i
    let tmp = 0
    for (i = 0; i < str.length; i++) {
      tmp = tmp << 8 | str.charCodeAt(i)
      if ((i & 3) === 3) {
        out.push(tmp)
        tmp = 0
      }
    }
    if (i & 3) {
      out.push(BitArray.partial(8 * (i & 3), tmp))
    }
    return out
  }
}


/** Javascript SHA-256 implementation.
 *
 * An older version of this implementation is available in the public
 * domain, but this one is (c) Emily Stark, Mike Hamburg, Dan Boneh,
 * Stanford University 2008-2010 and BSD-licensed for liability
 * reasons.
 *
 * Special thanks to Aldo Cortesi for pointing out several bugs in
 * this code.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */
class Sha256 {

  /** The hash's block size, in bits. */
  public blockSize = 512

  private _h!: L<N>
  private _buffer!: L<N>
  private _length!: N

  /**
   * The SHA-256 initialization vector, to be precomputed.
   * like: [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19]
   */
  private _init: L<N> = []

  /**
   * The SHA-256 hash key, to be precomputed.
   * like: [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
   *        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
   *        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
   *        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
   *        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
   *        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
   *        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
   *        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2]
   */
  private _key: L<N> = []

  public constructor (hash?: Sha256) {
    if (!this._key[0]) this._precompute()

    if (!hash) this.reset()
    else {
      this._h = hash._h.slice(0)
      this._buffer = hash._buffer.slice(0)
      this._length = hash._length
    }
  }

  public static hash (data: L<N> | S) {
    return (new Sha256()).update(data).finalize()
  }

  /** Input several words to the hash. */
  public update (data: L<N> | S) {
    if (typeof data === 'string') {
      data = Codec.utf8StringToBits(data)
    }
    const b = this._buffer = BitArray.concat(this._buffer, data)
    const ol = this._length
    const nl = this._length = ol + BitArray.bitLength(data)
    if (nl > 9007199254740991) {
      throw new Error('Cannot hash more than 2^53 - 1 bits')
    }

    if (typeof Uint32Array !== 'undefined') {
      const c = new Uint32Array(b)
      let j = 0
      for (let i = 512 + ol - ((512 + ol) & 511); i <= nl; i += 512) {
        this._block(c.subarray(16 * j, 16 * (j + 1)))
        j += 1
      }
      b.splice(0, 16 * j)
    } else {
      for (let i = 512 + ol - ((512 + ol) & 511); i <= nl; i += 512) {
        this._block(b.splice(0, 16))
      }
    }
    return this
  }

  /** Complete hashing and output the hash value. */
  public finalize () {
    const h = this._h
    let b = this._buffer

    // Round out and push the buffer
    b = BitArray.concat(b, [BitArray.partial(1, 1)])

    // Round out the buffer to a multiple of 16 words, less the 2 length words.
    for (let i = b.length + 2; i & 15; i++) {
      b.push(0)
    }

    // append the length
    b.push(Math.floor(this._length / 0x100000000))
    b.push(this._length | 0)

    while (b.length) {
      this._block(b.splice(0, 16))
    }

    this.reset()
    return h
  }

  private reset () {
    this._h = this._init.slice(0)
    this._buffer = []
    this._length = 0
  }

  private _precompute () {
    const frac = (x: N) => (x - Math.floor(x)) * 0x100000000 | 0

    for (let i = 0, prime = 2; i < 64; prime++) {
      let isPrime = true
      for (let factor = 2; factor * factor <= prime; factor++) {
        if (prime % factor === 0) {
          isPrime = false
          break
        }
      }
      if (isPrime) {
        if (i < 8) {
          this._init[i] = frac(Math.pow(prime, 1 / 2))
        }
        this._key[i] = frac(Math.pow(prime, 1 / 3))
        i++
      }
    }
  }

  /** Perform one cycle of SHA-256. */
  private _block (w: Uint32Array | L<N>) {
    const h = this._h
    const k = this._key
    let h0 = h[0]
    let h1 = h[1]
    let h2 = h[2]
    let h3 = h[3]
    let h4 = h[4]
    let h5 = h[5]
    let h6 = h[6]
    let h7 = h[7]

    /* Rationale for placement of |0 :
     * If a value can overflow is original 32 bits by a factor of more than a few
     * million (2^23 ish), there is a possibility that it might overflow the
     * 53-bit mantissa and lose precision.
     *
     * To avoid this, we clamp back to 32 bits by |'ing with 0 on any value that
     * propagates around the loop, and on the hash state h[].  I don't believe
     * that the clamps on h4 and on h0 are strictly necessary, but it's close
     * (for h4 anyway), and better safe than sorry.
     *
     * The clamps on h[] are necessary for the output to be correct even in the
     * common case and for short inputs.
     */
    for (let i = 0; i < 64; i++) {
      let tmp
      let a
      let b
      // load up the input word for this round
      if (i < 16) {
        tmp = w[i]
      } else {
        a = w[(i + 1) & 15]
        b = w[(i + 14) & 15]
        tmp = w[i & 15] = ((a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) +
          (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) +
          w[i & 15] + w[(i + 9) & 15]) | 0
      }

      tmp = (tmp + h7 + (h4 >>> 6 ^ h4 >>> 11 ^ h4 >>> 25 ^ h4 << 26 ^ h4 << 21 ^ h4 << 7) + (h6 ^ h4 & (h5 ^ h6)) + k[i]) // | 0;

      // shift register
      h7 = h6; h6 = h5; h5 = h4
      h4 = h3 + tmp | 0
      h3 = h2; h2 = h1; h1 = h0

      h0 = (tmp + ((h1 & h2) ^ (h3 & (h1 ^ h2))) + (h1 >>> 2 ^ h1 >>> 13 ^ h1 >>> 22 ^ h1 << 30 ^ h1 << 19 ^ h1 << 10)) | 0
    }

    h[0] = h[0] + h0 | 0
    h[1] = h[1] + h1 | 0
    h[2] = h[2] + h2 | 0
    h[3] = h[3] + h3 | 0
    h[4] = h[4] + h4 | 0
    h[5] = h[5] + h5 | 0
    h[6] = h[6] + h6 | 0
    h[7] = h[7] + h7 | 0
  }
}


/*********************************************************************************************************** */

export function sha256 (data: S) {
  return Codec.base64FromBits(Sha256.hash(data))
}
