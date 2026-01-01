import {useState, useRef, useEffect} from 'react'
import {FFmpeg} from '@ffmpeg/ffmpeg'
import {toBlobURL} from '@ffmpeg/util'

export default function useFFmpeg () {
    const [loaded, setLoaded] = useState(false)
    const ffmpegRef = useRef<FFmpeg>(undefined)
    // eslint-disable-next-line eslint-plugin-no-null/no-null
    const messageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!ffmpegRef.current) {
            ffmpegRef.current = new FFmpeg()
        }
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd'
        const ffmpeg = ffmpegRef.current
        ffmpeg.on('log', ({message}) => {
            if (messageRef.current) messageRef.current.innerHTML = message
        })
        Promise.all([
            toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        ]).then(([coreURL, wasmURL]) => ffmpeg.load({
            coreURL,
            wasmURL,
        })).then(() => {
            setLoaded(true)
        })
    }, [])

    return [ffmpegRef, messageRef, loaded] as const
}
