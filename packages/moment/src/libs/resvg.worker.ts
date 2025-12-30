import * as resvg from '@resvg/resvg-wasm'

fetch(new URL('https://esm.sh/@resvg/resvg-wasm/index_bg.wasm')).then(res => resvg.initWasm(res))

self.onmessage = (e) => {
    const {svg, width, _id} = e.data

    const renderer = new resvg.Resvg(svg, {
        fitTo: {
            mode: 'width',
            value: width,
        },
    })
    const image = renderer.render()
    const pngBuffer = image.asPng() as unknown as ArrayBuffer
    const url = URL.createObjectURL(new Blob([pngBuffer], {type: 'image/png'}))
    self.postMessage({_id, url})
}
