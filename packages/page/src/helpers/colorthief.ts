// tslint:disable: no-magic-numbers

/*
 * Color Thief v2.0
 * by Lokesh Dhakar - http://www.lokeshdhakar.com
 *
 * License
 * -------
 * Copyright 2011, 2015 Lokesh Dhakar
 * Released under the MIT license
 * https://raw.githubusercontent.com/lokesh/color-thief/master/LICENSE
 *
 * Modified by Sy <somarl@live.com>
 *   Tranlate into TS with class
 *   Fix some trival edge circumstances with the help of typecheck
 *   Change the xhr/callback to fetch/Promise
 *   Add image cross origin
 */

class CanvasImage {
  public canvas: HTMLCanvasElement
  public ctx!: CanvasRenderingContext2D

  public width: number
  public height: number

  public get pixelCount () {
    return this.width * this.height
  }

  public get imageData () {
    return this.ctx.getImageData(0, 0, this.width, this.height)
  }
  public set imageData (v) {
    this.update(v)
  }

  public constructor (image: HTMLImageElement) {
    this.canvas = document.createElement('canvas')
    this.width = this.canvas.width = image.width
    this.height = this.canvas.height = image.height

    const ctx = this.canvas.getContext('2d')
    if (!ctx) return this.onError()

    this.ctx = ctx
    document.body.appendChild(this.canvas)
    this.ctx.drawImage(image, 0, 0, this.width, this.height)
  }

  public onError (message = 'not specified'): never {
    throw Error(`[CanvasImage] ${message}`)
  }

  public clear () {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  public update (imageData: ImageData) {
    this.ctx.putImageData(imageData, 0, 0)
  }

  public removeCanvas () {
    const parentNode = this.canvas.parentNode
    if (!parentNode) return

    parentNode.removeChild(this.canvas)
  }
}


export default class ColorThief {
  public getColor (sourceImage: HTMLImageElement, quality = 10) {
    return this.getPalette(sourceImage, 5, quality)[ 0 ]
  }

  /**
   * bigger param quality means the function faster with worse quality
   */
  public getPalette (sourceImage: HTMLImageElement, colorCount = 10, quality = 10) {
    if (colorCount < 2 || colorCount > 256) {
      colorCount = 10
    }
    if (quality < 1) {
      quality = 10
    }

    const canvasImage = new CanvasImage(sourceImage)
    const { imageData, pixelCount } = canvasImage
    const pixels = imageData.data

    const pixelArray = []
    for (let i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
      offset = i * 4
      r = pixels[ offset + 0 ]
      g = pixels[ offset + 1 ]
      b = pixels[ offset + 2 ]
      a = pixels[ offset + 3 ]
      // If pixel is mostly opaque and not white
      if (a >= 125) {
        if (!(r > 250 && g > 250 && b > 250)) {
          pixelArray.push([ r, g, b ])
        }
      }
    }

    const cmap = MMCQ.quantize(pixelArray, colorCount)
    const palette = cmap ? cmap.palette() : [ [ 0, 0, 0 ] ]

    canvasImage.removeCanvas()

    return palette
  }

  /** @async */
  public getColorFromUrl (src: S, quality?: N): Promise<L<N>> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(this.getColor(img, quality))
      img.onerror = () => reject(`[ColorThief] failed to load image ${src}`)
      img.src = src
    })
  }

  /**
   * @async
   * @deprecated it might not return just the same count of colors +/-1
   */
  public getColorsFromUrl (src: S, colorCount?: N, quality?: N): Promise<L<L<N>>> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(this.getPalette(img, colorCount, quality))
      img.onerror = () => reject(`[ColorThief] failed to load image ${src}`)
      img.src = src
    })
  }

  public async fetchImageData (src: S) {
    const r = await fetch(src)
    let binaryString = ''
    if (r.status === 200) {
      const uInt8Array = new Uint8Array(await r.arrayBuffer())
      // tslint:disable-next-line:prefer-for-of for performance
      for (let i = 0; i < uInt8Array.length; i++) {
        binaryString += String.fromCharCode(uInt8Array[ i ])
      }
    }
    return 'data:image/png;base64,' + window.btoa(binaryString)
  }

  /** @deprecated getColorFromUrl is much faster */
  public async getColorAsync (src: S, quality = 10) {
    const base64 = await this.fetchImageData(src)
    return this.getColorFromUrl(base64)
  }
}


class PQueue<T = A> {
  private sorted: boolean
  public contents: L<T>

  public get size () {
    return this.contents.length
  }

  public constructor (
    public compareFn: (a: T, b: T) => N
  ) {
    this.sorted = false
    this.contents = []
  }

  private sort () {
    this.contents.sort(this.compareFn)
    this.sorted = true
  }

  public push (o: T) {
    this.contents.push(o)
    this.sorted = false
  }

  public peek (index?: N) {
    if (!this.sorted) this.sort()
    if (index === undefined) return this.contents[ this.contents.length - 1 ]
    return this.contents[ index ]
  }

  public pop () {
    if (!this.sorted) this.sort()
    return this.contents.pop()
  }

  public map (f: F1<T, A>) {
    return this.contents.map(f)
  }

  public debug () {
    if (!this.sorted) this.sort()
    return this.contents
  }
}


/**
 * Basic Javascript port of the MMCQ (modified median cut quantization)
 * algorithm from the Leptonica library (http://www.leptonica.com/).
 *
 * author Nick Rabinowitz
 * @example
 *   // array of pixels as [R,G,B] arrays
 *   var myPixels = [[190,197,190], [202,204,200], [207,214,210], [211,214,211], [205,207,207]
 *     // etc
 *   ];
 *   var maxColors = 4;
 *   var cmap = MMCQ.quantize(myPixels, maxColors);
 *   var newPalette = cmap.palette();
 *   var newPixels = myPixels.map(function(p) {
 *     return cmap.map(p);
 *   });
 */
const MMCQ = (() => {
  // private constants
  const sigbits = 5
  const rshift = 8 - sigbits
  const maxIterations = 1000
  const fractByPopulations = 0.75

  // get reduced-space color index for a pixel
  function getColorIndex (r: N, g: N, b: N) {
    return (r << (2 * sigbits)) + (g << sigbits) + b
  }

  /**
   * 3d color space box
   */
  class VBox {
    private _volume?: N
    private _countSet: boolean = false
    private _count?: N
    private _avg?: L<N>

    public constructor (
      public r1: N,
      public r2: N,
      public g1: N,
      public g2: N,
      public b1: N,
      public b2: N,
      public histo: L<N>
    ) { }

    public volume (force = false): N {
      if (!this._volume || force) {
        this._volume = (this.r2 - this.r1 + 1) * (this.g2 - this.g1 + 1) * (this.b2 - this.b1 + 1)
      }
      return this._volume
    }

    public count (force = false) {
      if (!this._countSet || force) {
        let npix = 0
        for (let i = this.r1; i <= this.r2; i++) {
          for (let j = this.g1; j <= this.g2; j++) {
            for (let k = this.b1; k <= this.b2; k++) {
              const index = getColorIndex(i, j, k)
              npix += (this.histo[ index ] || 0)
            }
          }
        }
        this._count = npix
        this._countSet = true
      }

      return this._count!
    }

    public copy () {
      return new VBox(this.r1, this.r2, this.g1, this.g2, this.b1, this.b2, this.histo)
    }

    public avg (force = false) {
      if (!this._avg || force) {
        const mult = 1 << (8 - sigbits)
        let ntot = 0
        let rsum = 0
        let gsum = 0
        let bsum = 0
        for (let i = this.r1; i <= this.r2; i++) {
          for (let j = this.g1; j < this.g2; j++) {
            for (let k = this.b1; k < this.b2; k++) {
              const index = getColorIndex(i, j, k)
              const hval = this.histo[ index ] || 0
              ntot += hval
              rsum += hval * (i + 0.5) * mult
              gsum += hval * (j + 0.5) * mult
              bsum += hval * (k + 0.5) * mult
            }
          }
        }
        if (ntot) {
          this._avg = [ ~~(rsum / ntot), ~~(gsum / ntot), ~~(bsum / ntot) ]
        } else {
          this._avg = [
            ~~(mult * (this.r1 + this.r2 + 1) / 2),
            ~~(mult * (this.g1 + this.g2 + 1) / 2),
            ~~(mult * (this.b1 + this.b2 + 1) / 2),
          ]
        }
      }
      return this._avg
    }

    public contains (pixel: L<N>) {
      const [ rval, gval, bval ] = [ 0, 1, 2 ].map(channel => pixel[ channel ] >> rshift)

      return (
        rval >= this.r1 && rval <= this.r2 &&
        gval >= this.g1 && gval <= this.g2 &&
        bval >= this.b1 && bval <= this.b2
      )
    }

    public static fromPixels (pixels: L<L<N>>, histo: L<N>) {
      let rmin = Infinity
      let gmin = Infinity
      let bmin = Infinity
      let rmax = pixels[ 0 ][ 0 ] >> rshift
      let gmax = pixels[ 0 ][ 1 ] >> rshift
      let bmax = pixels[ 0 ][ 2 ] >> rshift
      // find min/max
      pixels.forEach(pixel => {
        const rval = pixel[ 0 ] >> rshift
        const gval = pixel[ 1 ] >> rshift
        const bval = pixel[ 2 ] >> rshift
        if (rval < rmin) rmin = rval
        else if (rval > rmax) rmax = rval
        if (gval < gmin) gmin = gval
        else if (gval > gmax) gmax = gval
        if (bval < bmin) bmin = bval
        else if (bval > bmax) bmax = bval
      })
      return new VBox(rmin, rmax, gmin, gmax, bmin, bmax, histo)
    }
  }

  interface IWrappedVbox {
    vbox: VBox,
    color: L<N>
  }

  class CMap {
    public vboxes: PQueue<IWrappedVbox>

    public get size () {
      return this.vboxes.size
    }

    public constructor () {
      this.vboxes = new PQueue((a: IWrappedVbox, b: IWrappedVbox) => Math.sign(
        a.vbox.count() * a.vbox.volume() -
        b.vbox.count() * b.vbox.volume()
      ))
    }

    public push (vbox: VBox) {
      this.vboxes.push({
        vbox,
        color: vbox.avg(),
      })
    }

    public palette (): L<L<N>> {
      return this.vboxes.map(vb => vb.color)
    }

    public map (color: L<N>) {
      const vboxes = this.vboxes
      for (let i = 0; i < vboxes.size; i++) {
        if (vboxes.peek(i).vbox.contains(color)) {
          return vboxes.peek(i).color
        }
      }
      return this.nearest(color)
    }

    public nearest (color: L<N>) {
      let d1
      let pColor
      for (let i = 0; i < this.vboxes.size; i++) {
        const d2 = Math.sqrt(
          Math.pow(color[ 0 ] - this.vboxes.peek(i).color[ 0 ], 2) +
          Math.pow(color[ 1 ] - this.vboxes.peek(i).color[ 1 ], 2) +
          Math.pow(color[ 2 ] - this.vboxes.peek(i).color[ 2 ], 2)
        )
        if (d1 === undefined || d2 < d1) {
          d1 = d2
          pColor = this.vboxes.peek(i).color
        }
      }
      return pColor
    }
  }

  /**
   * histo (1-d array, giving the number of pixels in
   * each quantized region of color space), or null on error
   */
  function getHisto (pixels: L<L<N>>): L<N> {
    const histosize = 1 << (3 * sigbits)
    const histo = new Array(histosize)
    pixels.forEach(pixel => {
      const rval = pixel[ 0 ] >> rshift
      const gval = pixel[ 1 ] >> rshift
      const bval = pixel[ 2 ] >> rshift
      const index = getColorIndex(rval, gval, bval)
      histo[ index ] = (histo[ index ] || 0) + 1
    })
    return histo
  }

  function medianCutApply (histo: L<N>, vbox: VBox): L<VBox> {
    if (!vbox.count()) throw Error('This is not supposed to be raised.')

    const rw = vbox.r2 - vbox.r1 + 1
    const gw = vbox.g2 - vbox.g1 + 1
    const bw = vbox.b2 - vbox.b1 + 1
    const maxw = Math.max(rw, gw, bw)
    // only one pixel, no split
    if (vbox.count() === 1) return [ vbox.copy() ]

    // Find the partial sum arrays along the selected axis.
    let total = 0
    const partialsum: L<N> = []
    const lookaheadsum: L<N> = []
    if (maxw === rw) {
      for (let i = vbox.r1; i <= vbox.r2; i++) {
        let sum = 0
        for (let j = vbox.g1; j <= vbox.g2; j++) {
          for (let k = vbox.b1; k <= vbox.b2; k++) {
            const index = getColorIndex(i, j, k)
            sum += (histo[ index ] || 0)
          }
        }
        total += sum
        partialsum[ i ] = total
      }
    } else if (maxw === gw) {
      for (let i = vbox.g1; i <= vbox.g2; i++) {
        let sum = 0
        for (let j = vbox.r1; j <= vbox.r2; j++) {
          for (let k = vbox.b1; k <= vbox.b2; k++) {
            const index = getColorIndex(j, i, k)
            sum += (histo[ index ] || 0)
          }
        }
        total += sum
        partialsum[ i ] = total
      }
    } else {  // maxw == bw
      for (let i = vbox.b1; i <= vbox.b2; i++) {
        let sum = 0
        for (let j = vbox.r1; j <= vbox.r2; j++) {
          for (let k = vbox.g1; k <= vbox.g2; k++) {
            const index = getColorIndex(j, k, i)
            sum += (histo[ index ] || 0)
          }
        }
        total += sum
        partialsum[ i ] = total
      }
    }
    partialsum.forEach((d, i) => {
      lookaheadsum[ i ] = total - d
    })

    function doCut (color: S): L<VBox> {
      const dim1 = color + '1'
      const dim2 = color + '2'
      let count2 = 0
      for (let i = vbox[ dim1 ]; i <= vbox[ dim2 ]; i++) {
        if (partialsum[ i ] > total / 2) {
          const vbox1 = vbox.copy()
          const vbox2 = vbox.copy()
          const left = i - vbox[ dim1 ]
          const right = vbox[ dim2 ] - i
          let d2 = left <= right
            ? Math.min(vbox[ dim2 ] - 1, ~~(i + right / 2))
            : Math.max(vbox[ dim1 ], ~~(i - 1 - left / 2))
          // avoid 0-count boxes
          while (!partialsum[ d2 ]) d2++
          count2 = lookaheadsum[ d2 ]
          while (!count2 && partialsum[ d2 - 1 ]) count2 = lookaheadsum[ --d2 ]
          // set dimensions
          vbox1[ dim2 ] = d2
          vbox2[ dim1 ] = vbox1[ dim2 ] + 1
          return [ vbox1, vbox2 ]
        }
      }
      return [] // never
    }
    // determine the cut planes
    return maxw === rw ? doCut('r') : maxw === gw ? doCut('g') : doCut('b')
  }

  function quantize (pixels: L<L<N>>, maxcolors: N) {
    // short-circuit
    if (!pixels.length || maxcolors < 2 || maxcolors > 256) return false

    const histo = getHisto(pixels)

    // check that we aren't below maxcolors already
    const nColors = histo.length
    if (nColors <= maxcolors) {
      // XXX: generate the new colors from the histo and return
    }

    // get the beginning vbox from the colors
    const pq = new PQueue<VBox>((a, b) => Math.sign(a.count() - b.count()))
    pq.push(VBox.fromPixels(pixels, histo))

    // inner function to do the iteration
    function iter (lh: PQueue<VBox>, target: N) {
      let ncolors = 1
      let niters = 0
      while (niters < maxIterations) {
        const vbox = lh.pop()!
        if (!vbox.count()) { /* just put it back */
          lh.push(vbox)
          niters++
          continue
        }
        // do the cut
        const vboxes = medianCutApply(histo, vbox)
        const vbox1 = vboxes[ 0 ]
        const vbox2 = vboxes[ 1 ]

        if (!vbox1) return

        lh.push(vbox1)
        if (vbox2) {  /* vbox2 can be null */
          lh.push(vbox2)
          ncolors++
        }
        // FIXME: wrong count of vboxes
        if (ncolors >= target) return
        niters++
      }
    }

    // first set of colors, sorted by population
    iter(pq, fractByPopulations * maxcolors)

    // Re-sort by the product of pixel occupancy times the size in color space.
    const pq2 = new PQueue<VBox>((a, b) => Math.sign(a.count() * a.volume() - b.count() * b.volume()))
    while (pq.size) {
      pq2.push(pq.pop()!)
    }

    // next set - generate the median cuts using the (npix * vol) sorting.
    iter(pq2, maxcolors - pq2.size)

    // calculate the actual colors
    const cmap = new CMap()
    while (pq2.size) {
      cmap.push(pq2.pop()!)
    }

    return cmap
  }

  return { quantize }
})()
