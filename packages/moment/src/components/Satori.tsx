import {useEffect, useState, useCallback, useRef} from 'react'
import exifr from 'exifr'
import satori, {Font} from 'satori'
import {fetchFile} from '@ffmpeg/util'

import uuid from '../libs/uuid'
import useFFmpeg from '../libs/ffmpeg'
import {useConfig, IConfig} from './Config'
import styles from '../pages/photo/photo.module.scss'

interface IExif {
    ImageHeight: number
    ImageWidth: number
    Make: string
    Model: string
    FocalLength: number
    FocalLengthIn35mmFormat: number
    ISO: number
    ExposureTime: number
    FNumber: number
    Orientation?: string
}

export const getFileID = (file: File) => `p-${file.lastModified}-${file.name}`

function initResvgWorker () {
    if (typeof window === 'undefined') return

    const worker = new Worker(new URL('../libs/resvg.worker.ts', import.meta.url))

    const pending = new Map()
    worker.onmessage = (e) => {
        const {_id, url} = e.data
        const resolve = pending.get(_id)
        if (resolve) {
            resolve(url)
            pending.delete(_id)
        }
    }

    return async (msg: object) => {
        const _id = uuid()
        worker.postMessage({
            ...msg,
            _id,
        })
        return new Promise((resolve: (url: string) => void) => {
            pending.set(_id, resolve)
        })
    }
}

const renderPNG = initResvgWorker()

export default function Satori ({files}: {
    files: File[]
}) {
    const fonts = useFonts()
    const {config} = useConfig()

    const processing = useRef(false)
    const initialized = useRef(false)
    const [results, setResults] = useState<Record<string, string>>({})

    const process = useCallback(async (state: {cancelled: boolean, refresh?: boolean}) => {
        if (!fonts || !renderPNG) return
        if (processing.current) return
        processing.current = true

        return Promise.all(files.map(async (file) => {
            if (state.cancelled) return []
            const fileID = getFileID(file)
            if (!state.refresh && results[fileID]) return [fileID, results[fileID]]

            const src = URL.createObjectURL(file)
            const exif = await exifr.parse(file)
            exif.Make = exif.Make || ''
            exif.ImageWidth = exif.ImageWidth || exif.ExifImageWidth
            exif.ImageHeight = exif.ImageHeight || exif.ExifImageHeight
            console.info(exif)
            const svg = await satori(<Photo src={src} config={config} exif={exif} />, {
                ...config,
                fonts,
            })
            if (state.cancelled) return []
            const png = await renderPNG({svg, width: config.width})
            return [fileID, png]
        })).then((entries) => {
            setResults(Object.fromEntries(entries.filter(entry => entry.length)))
        }).catch(console.error).finally(() => {
            processing.current = false
        })
    }, [fonts, files, config])

    useEffect(() => {
        if (!fonts || !renderPNG) return

        const state = {cancelled: false}
        void process(state)

        return () => {
            state.cancelled = true
        }
    }, [fonts, files])

    useEffect(() => {
        if (!initialized.current) return
        if (!fonts || !renderPNG) return

        const state = {cancelled: false, refresh: true}
        setResults({})
        void process(state)

        return () => {
            state.cancelled = true
        }
    }, [config])

    useEffect(() => {
        initialized.current = true
    }, [])

    const [ffmpegRef, messageRef, loaded] = useFFmpeg()
    const [videoUrl, setVideoUrl] = useState<string>()

    const handleTranscode = useCallback(async () => {
        if (!results) return

        setVideoUrl(undefined)
        const ffmpeg = ffmpegRef.current!
        // u can use 'https://ffmpegwasm.netlify.app/video/video-15s.avi' to download the video to public folder for testing
        await Promise.all(Object.entries(results).map(async ([, url], i) => {
            ffmpeg.writeFile(
                `${i + 1}.png`.padStart(7, '0'),
                await fetchFile(url),
            )
        }))
        await ffmpeg.exec([
            '-framerate', `1/${config.seconds}`,
            '-i', '%03d.png',
            '-c:v', 'libx264',
            '-r', '30',
            '-pix_fmt', 'yuv420p',
            'output.mp4',
        ])
        const data = (await ffmpeg.readFile('output.mp4')) as ANY
        setVideoUrl(URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'})))
    }, [results])

    return (
        <ul className={styles.outputs}>
            {files.map(file => (
                <li key={getFileID(file)}>
                    {results[getFileID(file)] ? <img src={results[getFileID(file)]} /> : 'processing...'}
                </li>
            ))}

            {loaded && (
                <>
                    <button disabled={processing.current} onClick={handleTranscode}>
                        generate video
                    </button>

                    {videoUrl ? (
                        <li>
                            <video controls src={videoUrl} style={{maxWidth: '100%'}} />
                        </li>
                    ) : (
                        <div className="ffmpeg-message" ref={messageRef}></div>
                    )}
                </>
            )}
        </ul>
    )
}

export function useExif (files: File[]) {
    const [exifs, setExifs] = useState<IExif[]>()
    useEffect(() => {
        Promise.all(files.map(file => exifr.parse(file))).then((exifs) => {
            exifs.forEach((exif) => {
                exif.Make = exif.Make || ''
            })
            setExifs(exifs)
        })
    }, [files])

    return exifs
}

function useFonts () {
    const [fonts, setFonts] = useState<Font[]>()
    useEffect(() => {
        fetch(new URL('../../public/fonts/DejaVuSans.woff', import.meta.url)).then(res =>
            res.arrayBuffer().then(data => setFonts([{name: 'DejaVuSans', data}])),
        )
    }, [])

    return fonts
}

function Photo ({exif, src, config}: {
    exif: IExif
    src: string
    config: IConfig
}) {
    const {width: outputWidth, height: outputHeight} = config
    const {ImageWidth: inputWidth, ImageHeight: inputHeight} = exif
    const rotateDegrees = parseInt((Array.from((exif.Orientation || '').matchAll(/Rotate\s(\d+)\sCW/g))[0] || [])[1]) || 0
    const isRightAngle = rotateDegrees === 90 || rotateDegrees === 270
    const ratio = isRightAngle ? inputHeight / inputWidth : inputWidth / inputHeight

    const fontSize = 1.5 * Math.max(outputWidth, outputHeight) / 100
    const span = Math.min(2 * fontSize, 4 / 100 * outputWidth, 4 / 100 * outputHeight)
    const logoSize = 1.5 * fontSize
    const captionGap = 0.5 * fontSize
    const blurSize = 5 * Math.max(outputWidth, outputHeight) / 100
    const shadowSize = span

    const captionHeight = logoSize + captionGap + fontSize
    const containerWidth = Math.min(
        outputWidth - 2 * span,
        (outputHeight - 2 * span - (fontSize + captionHeight)) * ratio,
    )
    const containerHeight = containerWidth / ratio
    const width = isRightAngle ? containerHeight : containerWidth
    const height = isRightAngle ? containerWidth : containerHeight
    const transform = isRightAngle ? `rotate(${rotateDegrees}deg) translate(${(containerHeight - containerWidth) * (rotateDegrees === 90 ? 1 : -1) / 2}px, ${(containerHeight - containerWidth) * (rotateDegrees === 90 ? 1 : -1) / 2}px)` : 'scale(1)'

    const backgroundWidth = isRightAngle ? outputHeight * ratio > outputWidth ? outputHeight : outputWidth / ratio : outputHeight * ratio > outputWidth ? outputHeight * ratio : outputWidth
    const backgroundHeight = isRightAngle ? outputHeight * ratio > outputWidth ? outputHeight * ratio : outputWidth : outputHeight * ratio > outputWidth ? outputHeight : outputWidth / ratio

    const makeIcon = exif.Make.toLowerCase() === 'apple' ? (
        <svg xmlns="http://www.w3.org/2000/svg" height={logoSize} viewBox="0 0 20 20">
            <path fill="#000000" fill-rule="evenodd" d="M14.122 4.682c1.35 0 2.781.743 3.8 2.028c-3.34 1.851-2.797 6.674.578 7.963c-.465 1.04-.687 1.505-1.285 2.426c-.835 1.284-2.01 2.884-3.469 2.898c-1.295.012-1.628-.853-3.386-.843s-2.125.858-3.42.846c-1.458-.014-2.573-1.458-3.408-2.743C1.198 13.665.954 9.45 2.394 7.21C3.417 5.616 5.03 4.683 6.548 4.683c1.545 0 2.516.857 3.794.857c1.24 0 1.994-.858 3.78-.858M13.73 0c.18 1.215-.314 2.405-.963 3.247c-.695.902-1.892 1.601-3.05 1.565c-.21-1.163.332-2.36.99-3.167C11.43.755 12.67.074 13.73 0" />
        </svg>
    ) : exif.Make.toLowerCase() === 'xiaomi' ? (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height={logoSize} viewBox="-200.008 -199.727 512 512" enable-background="new -200.008 -199.727 512 512">
            <path fill="#FF6900" d="M258.626-146.231c-48.304-48.118-117.759-53.496-202.634-53.496     c-84.982,0-154.542,5.44-202.826,53.688c-48.277,48.228-53.174,117.676-53.174,202.561c0,84.899,4.897,154.368,53.194,202.613     c48.281,48.255,117.833,53.139,202.806,53.139c84.974,0,154.514-4.884,202.795-53.139     c48.294-48.254,53.205-117.714,53.205-202.613C311.992-28.472,307.028-97.995,258.626-146.231L258.626-146.231z" />
            <path fill="#FFFFFF" d="M204.546-41.122c1.759,0,3.223,1.417,3.223,3.161v189.386     c0,1.715-1.464,3.139-3.223,3.139H163.05c-1.781,0-3.228-1.424-3.228-3.139V-37.961c0-1.743,1.446-3.161,3.228-3.161H204.546z      M24.468-41.122c31.303,0,64.033,1.435,80.176,17.589c15.871,15.897,17.59,47.549,17.656,78.286v96.671     c0,1.715-1.446,3.139-3.219,3.139h-41.49c-1.777,0-3.229-1.424-3.229-3.139V53.09c-0.044-17.167-1.031-34.81-9.884-43.692     c-7.62-7.641-21.839-9.391-36.625-9.754h-75.21c-1.764,0-3.208,1.419-3.208,3.136v148.645c0,1.715-1.462,3.139-3.237,3.139     h-41.516c-1.774,0-3.201-1.424-3.201-3.139V-37.961c0-1.743,1.426-3.161,3.201-3.161H24.468z M33.755,34.305     c1.766,0,3.201,1.413,3.201,3.143v113.977c0,1.715-1.436,3.139-3.201,3.139H-9.829c-1.792,0-3.228-1.424-3.228-3.139V37.448     c0-1.73,1.436-3.143,3.228-3.143H33.755z" />
        </svg>
    ) : exif.Make.toLowerCase() === 'pentax' || (exif.Make.toLowerCase().includes('ricoh') && exif.Model && exif.Model.toLowerCase().includes('pentax')) ? (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height={logoSize} viewBox="0 0 2560 513">
            <path fill="#ff0013" opacity="1.00" d=" M 11.94 8.26 C 92.62 8.28 173.31 8.26 253.99 8.27 C 278.70 7.97 303.83 9.06 327.57 16.49 C 343.10 21.32 357.90 29.04 369.87 40.14 C 382.24 51.49 391.27 66.15 397.11 81.82 C 405.92 105.45 408.42 130.90 408.54 155.96 C 408.57 181.30 408.54 206.65 408.55 231.99 C 408.44 246.68 409.04 261.42 407.36 276.05 C 405.52 292.71 401.25 309.30 393.12 324.04 C 386.12 336.83 376.12 347.95 364.12 356.24 C 344.41 369.94 320.59 376.24 297.01 378.97 C 278.41 381.19 259.66 380.67 240.97 380.73 C 212.30 380.74 183.63 380.73 154.95 380.74 C 154.95 420.80 154.96 460.87 154.95 500.93 C 107.27 500.93 59.58 500.94 11.90 500.93 C 11.92 336.71 11.85 172.48 11.94 8.26 M 155.40 97.33 C 155.36 159.20 155.47 221.08 155.35 282.95 C 173.54 283.24 191.75 282.98 209.95 283.08 C 221.50 283.14 233.47 281.44 243.60 275.58 C 252.57 270.51 259.25 261.83 262.41 252.08 C 265.34 243.69 265.53 234.71 265.38 225.93 C 265.34 197.62 265.35 169.30 265.29 140.99 C 265.31 129.56 261.74 117.66 253.44 109.50 C 245.01 100.99 232.77 97.34 221.01 97.34 C 199.14 97.32 177.27 97.33 155.40 97.33 Z" />
            <path fill="#ff0013" opacity="1.00" d=" M 454.97 8.33 C 568.63 8.46 682.30 8.39 795.96 8.36 C 796.12 38.98 795.99 69.60 796.03 100.21 C 728.69 100.22 661.35 100.21 594.01 100.21 C 594.02 134.31 593.99 168.40 594.02 202.50 C 651.13 202.54 708.23 202.35 765.33 202.59 C 765.08 233.37 765.29 264.15 765.22 294.93 C 708.15 294.95 651.08 294.93 594.02 294.94 C 594.01 333.23 594.01 371.52 594.01 409.80 C 661.24 409.83 728.47 409.76 795.70 409.83 C 795.70 440.21 795.65 470.58 795.72 500.96 C 682.10 501.15 568.47 500.98 454.84 501.04 C 454.84 391.35 454.84 281.66 454.84 171.97 C 454.93 117.42 454.67 62.87 454.97 8.33 Z" />
            <path fill="#ff0013" opacity="1.00" d=" M 854.94 8.20 C 900.20 8.22 945.46 8.30 990.73 8.27 C 1030.05 102.61 1069.37 196.95 1108.69 291.28 C 1109.80 293.84 1110.83 296.43 1111.73 299.07 C 1112.26 274.07 1111.81 249.03 1111.96 224.02 C 1111.97 152.10 1111.92 80.18 1111.98 8.26 C 1152.91 8.31 1193.84 8.21 1234.76 8.21 C 1234.76 172.49 1234.77 336.78 1234.76 501.07 C 1187.47 501.07 1140.19 501.07 1092.91 501.06 C 1056.07 411.88 1019.19 322.71 982.36 233.52 C 982.01 232.79 981.30 231.31 980.95 230.58 C 980.78 320.74 980.93 410.90 980.87 501.06 C 938.90 501.22 896.92 501.09 854.94 501.13 C 854.93 336.82 854.94 172.51 854.94 8.20 Z" />
            <path fill="#ff0013" opacity="1.00" d=" M 1278.17 8.22 C 1421.25 8.21 1564.32 8.20 1707.39 8.22 C 1707.36 39.84 1707.39 71.46 1707.38 103.08 C 1659.41 103.10 1611.44 103.06 1563.47 103.10 C 1563.49 235.75 1563.46 368.39 1563.48 501.03 C 1515.46 500.96 1467.43 501.21 1419.42 500.91 C 1419.59 368.31 1419.42 235.70 1419.50 103.10 C 1372.39 103.06 1325.28 103.10 1278.17 103.08 C 1278.16 71.46 1278.17 39.84 1278.17 8.22 Z" />
            <path fill="#ff0013" opacity="1.00" d=" M 1802.51 8.34 C 1842.83 8.41 1883.15 8.17 1923.46 8.46 C 1978.10 172.68 2033.05 336.80 2087.88 500.97 C 2043.00 501.03 1998.12 501.01 1953.24 500.98 C 1945.57 474.69 1937.83 448.42 1930.13 422.14 C 1886.16 422.13 1842.19 422.13 1798.22 422.14 C 1790.89 448.47 1783.58 474.81 1776.23 501.14 C 1733.10 501.14 1689.97 500.99 1646.84 501.00 C 1698.74 336.78 1750.61 172.55 1802.51 8.34 M 1863.73 162.88 C 1849.34 221.00 1834.91 279.11 1820.42 337.21 C 1849.27 337.21 1878.12 337.19 1906.97 337.22 C 1892.54 279.11 1878.28 220.96 1863.73 162.88 Z" />
            <path fill="#ff0013" opacity="1.00" d=" M 2094.25 8.17 C 2144.81 8.23 2195.38 8.18 2245.95 8.20 C 2269.23 58.41 2292.67 108.55 2315.82 158.82 C 2337.77 108.69 2359.35 58.39 2381.18 8.20 C 2427.99 8.42 2474.82 8.08 2521.63 8.58 C 2480.35 87.67 2439.51 167.00 2398.40 246.20 C 2448.69 331.13 2498.92 416.09 2549.25 501.00 C 2499.47 501.05 2449.69 500.90 2399.92 501.07 C 2373.52 446.80 2347.12 392.54 2320.72 338.27 C 2319.30 335.44 2318.06 332.52 2316.43 329.81 C 2301.89 364.10 2287.20 398.32 2272.60 432.59 C 2262.76 455.42 2253.24 478.40 2243.20 501.14 C 2191.86 500.95 2140.52 501.15 2089.18 501.04 C 2135.83 414.96 2182.48 328.87 2229.17 242.81 C 2184.23 164.58 2139.19 86.41 2094.25 8.17 Z" />
        </svg>
    ) : null

    return (
        <div
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#000',
            }}
        >
            <img
                src={src}
                style={{
                    width: backgroundWidth,
                    height: backgroundHeight,
                    filter: `blur(${blurSize}px)`,
                    position: 'absolute',
                    top: (backgroundHeight - outputHeight) / -2,
                    left: (backgroundWidth - outputWidth) / -2,
                    transform: `rotate(${rotateDegrees}deg)`,
                }}
            />

            <figure
                style={{
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: fontSize,
                }}
            >
                <div style={{
                    display: 'flex',
                    width: containerWidth,
                    height: containerHeight,
                    borderRadius: span / 2,
                    overflow: 'hidden',
                    boxShadow: `0 0 ${shadowSize}px black`,
                }}
                >
                    <img
                        src={src}
                        style={{
                            width,
                            height,
                            transform,
                        }}
                    />
                </div>

                <figcaption style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: captionGap,
                }}
                >
                    {makeIcon}

                    <p style={{
                        margin: 0,
                        lineHeight: 1,
                        color: 'white',
                        fontWeight: 600,
                        display: 'flex',
                        gap: fontSize,
                        fontSize,
                    }}
                    >
                        {!!(exif.FocalLengthIn35mmFormat || exif.FocalLength) && <span>{exif.FocalLengthIn35mmFormat || exif.FocalLength}mm</span>}
                        {!!exif.FNumber && <span>F/{parseFloat(exif.FNumber.toFixed(2)) === exif.FNumber ? exif.FNumber : exif.FNumber.toFixed(2)}</span>}
                        {!!exif.ExposureTime && <span>{exif.ExposureTime < 1 ? `1/${Math.floor(1 / exif.ExposureTime)}` : Math.floor(exif.ExposureTime)}s</span>}
                        {!!exif.ISO && <span>ISO{exif.ISO}</span>}
                    </p>
                </figcaption>
            </figure>
        </div>

    )
}
