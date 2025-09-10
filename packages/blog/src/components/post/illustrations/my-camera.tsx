'use client'

import {useState, ChangeEventHandler} from 'react'
import styles from './my-camera.module.scss'


type ILenseFormat = 'APS-C' | 'Full-frame'
type IValueOrRange<T> = T | [T, T]
type INumberOrRange = IValueOrRange<number>

interface ICameraData {
    model: string
    make: string
    url: string
    year: number
    format: ILenseFormat
    mount: string
}

interface ILenseData {
    model: string
    make: string
    url: string
    year: number
    format: ILenseFormat
    mount: string
    fieldOfView: {
        [k in ILenseFormat]: {
            diagnoal: INumberOrRange
            horizontal: INumberOrRange
        }
    },
    weight: number
    focus: {
        min: number
        focalLength: INumberOrRange
        magnification: number
        method: string
    },
    aperture: {
        max: INumberOrRange
        min: INumberOrRange
        blades: number
        ring: boolean | 'auto'
    },
    optics: {
        elements: number
        groups: number
        aspherical?: number
        coating: string | string[]
    },
    size: {
        filter: number
        length: number
        diameter: number
    },
    weather: {
        sealing: boolean
        temperature?: [number, number]
        humidity?: [number, number]
    },
    accessories?: {
        hood?: string
        cap?: string
        case?: string
    },
}

export default function MyCamera ({camera, lenses}: {
    camera: ICameraData
    lenses: ILenseData[]
}) {
    return (
        <>
            <section>
                <CameraDataTable item={camera} />
            </section>

            <section>
                <h2>My Lenses</h2>
                <MyLenses items={lenses} />
            </section>
        </>
    )
}

function CameraDataTable ({item}: {item: ICameraData}) {
    return (
        <table className={styles.table}>
            <tbody>
                <tr>
                    <td colSpan={4}>
                        <b>Pentax K-3 II</b>
                        <br />
                        © www.pentaxforums.com, sharable with attribution
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}><b>Year Introduced</b><br />2015</td>
                    <td colSpan={2}><b>In Production</b><br />No (Discontinued 2019)</td>
                </tr>
                <tr>
                    <td colSpan={4}><b>Sensor</b></td>
                </tr>
                <tr>
                    <td><b>Sensor Format</b><br />APS-C</td>
                    <td><b>Sensor Type</b><br />CMOS</td>
                    <td><b>Megapixels</b><br />24.35</td>
                    <td><b>Resolution</b><br />4000 x 6016 pixels</td>
                </tr>
                <tr>
                    <td><b>AA Filter</b><br />No (AA filter simulator)</td>
                    <td><b>Super Resolution</b><br />Yes</td>
                    <td colSpan={2}><b>Bit Depth</b><br />14</td>
                </tr>
                <tr>
                    <td><b>Minimum ISO</b><br />100</td>
                    <td><b>Maximum ISO</b><br />51200</td>
                    <td colSpan={2}><b>ISO Range</b><br />100 - 51,200</td>
                </tr>
                <tr>
                    <td colSpan={4}><b>Imaging</b></td>
                </tr>
                <tr>
                    <td><b>Exposure Modes</b><br />Auto (green), HyP, Sv, Av, Tv, TAv, HyM, X, B, User(3)</td>
                    <td><b>Program Modes</b><br />Auto, Normal, Action, Depth of Field (deep/shallow), MTF priority</td>
                    <td><b>Maximum FPS</b><br />8.3</td>
                    <td><b>Continuous Shooting</b><br />Hi: 8.3 fps up to approx. 60 frames (JPG), up to approx. 23 frames (RAW), M: 4.5 fps up to approx 100 frames (JPG), 32 frames (RAW), Lo: 3 fps uup to approx. 200 frames (JPG), up to appox. 52 frames (RAW)</td>
                </tr>
                <tr>
                    <td><b>Shutter Speeds (Auto)</b><br />30s - 1/8000s (stepless)</td>
                    <td><b>Shutter Speeds (Manual)</b><br />B, 30s - 1/8000s. Up to 300s in Astrotracer mode</td>
                    <td><b>Shutter Life</b><br />200000</td>
                    <td><b>Exposure compensation</b><br />+/-5 EV (+/-2 EV in movie mode)</td>
                </tr>
                <tr>
                    <td><b>Auto bracketing</b><br />Exposure (2, 3 or 5 frames), one-push EV bracketing, AA filter (3 frames)</td>
                    <td><b>Expanded dynamic range</b><br />Highlight (auto, on, off),
                        Shadow (auto, high, medium, low, off)</td>
                    <td><b>Exposure lock</b><br />Yes</td>
                    <td><b>Self timer</b><br />2 s with mirror lock-up, 12 s</td>
                </tr>
                <tr>
                    <td><b>Metering Sensor</b><br />86K Pixel</td>
                    <td><b>Meter range</b><br />-3 to 20 EV</td>
                    <td><b>Meter pattern</b><br />Multi-Segment,Center Weighted,Spot</td>
                    <td><b>Mirror lock-up</b><br />Yes</td>
                </tr>
                <tr>
                    <td><b>Interval shooting</b><br />Up to 2000 frames, 2 sec to 24 hours interval</td>
                    <td><b>HDR mode</b><br />Yes</td>
                    <td><b>Multiple exposures</b><br />Yes, average, additive and bright, 2 to 2000 shots</td>
                    <td><b>Pixel mapping</b><br />Yes</td>
                </tr>
                <tr>
                    <td colSpan={4}><b>Lens Mount</b></td>
                </tr>
                <tr>
                    <td><b>Mount</b><br />KAF2 (no aperture coupler)</td>
                    <td><b>Composition Adjustment</b><br />Yes</td>
                    <td><b>Stabilization</b><br />Yes (sensor-shift SR)</td>
                    <td><b>Power zoom</b><br />Supported (zoom only)</td>
                </tr>
                <tr>
                    <td colSpan={2}><b>Supported Lenses</b><br />All Pentax K-mount lenses. Support for lenses with the KAF4 mount variant requires a firmware update. Manual focus only with K-, M-, and A-series lenses. Stop down metering only with K- and M-series lenses. M42, Pentax 645 and Pentax 6x7 lenses with the appropriate adapters (stop down metering and manual focus only).</td>
                    <td colSpan={2}><b>Lens correction</b><br />Distortion,Lateral Chromatic Aberration,Vignetting,Diffraction</td>
                </tr>
                <tr>
                    <td colSpan={4}> <b>Focusing</b></td>
                </tr>
                <tr>
                    <td colSpan={2}><b>Autofocus (viewfinder)</b><br />Yes (SAFOX 11, 27 focus points (25 cross type))</td>
                    <td><b>AF Points</b><br />27</td>
                    <td><b>Autofocus sensitivity</b><br />-3 EV</td>
                </tr>
                <tr>
                    <td colSpan={2}><b>Front/back focus correction</b><br />Yes (adjustment for up to 20 lenses)</td>
                    <td><b>Autofocus with SDM</b><br />Yes</td>
                    <td><b>Autofocus assist</b><br />Dedicated LED</td>
                </tr>
                <tr>
                    <td colSpan={4}><b>Viewfinder/LCD</b></td>
                </tr>
                <tr>
                    <td><b>Viewfinder</b><br />0.95x, 100%</td>
                    <td><b>Viewfinder type</b><br />Pentaprism</td>
                    <td><b>Diopter adjustment</b><br />-2.5 to +1.5</td>
                    <td><b>AF Points in viewfinder</b><br />Yes</td>
                </tr>
                <tr>
                    <td><b>Exchangeable screen</b><br />Yes</td>
                    <td><b>Depth of field preview</b><br />Yes</td>
                    <td><b>Digital preview</b><br />Yes (with image magnificaion)</td>
                    <td><b>Live View</b><br />Yes</td>
                </tr>
                <tr>
                    <td><b>Top LCD</b><br />Yes</td>
                    <td><b>Focus Peaking</b><br />Yes</td>
                    <td colSpan={2}><b>Back LCD</b><br />3.2 in., 1,037,000 dots, 3:2 aspect ratio</td>
                </tr>
                <tr>
                    <td colSpan={4}><b>Body</b></td>
                </tr>
                <tr>
                    <td><b>Weather resistant</b><br />Yes</td>
                    <td><b>Control wheels</b><br />2</td>
                    <td><b>Battery grip</b><br /><a href="https://www.pentaxforums.com/accessoryreviews/pentax-battery-grip-bg-5-k-3.html" rel="external nofollow">D-BG5</a> (takes D-LI90 or 6x AA)</td>
                    <td><b>Card slots</b><br />2</td>
                </tr>
                <tr>
                    <td colSpan={2}><b>Dust removal</b><br />Yes, Ultrasonic DR II</td>
                    <td><b>Dust alert</b><br />Yes</td>
                    <td><b>Memory card type</b><br />SD, SDHC, SDXC (UHS-I Compatible), Eye-Fi, Flucard</td>
                </tr>
                <tr>
                    <td colSpan={2}><b>Size (W x H x D)</b><br />131.5 x 102.5 x 77.5 mm</td>
                    <td><b>Weight</b><br />700 g (785 g with battery and SD card)</td>
                    <td><b>File format</b><br />PEF (RAW),DNG (RAW),JPG,MOV</td>
                </tr>
                <tr>
                    <td colSpan={2}><b>Battery life</b><br />720 images Video playback time: 370 minutes</td>
                    <td colSpan={2}><b>Battery</b><br /> <a href="https://www.pentaxforums.com/accessoryreviews/pentax-d-li90-rechargeable-battery-k-5-k-7-645d.html" rel="external nofollow">D-LI90 lithium-ion rechargeable</a> </td>
                </tr>
                <tr>
                    <td colSpan={4}><b>Flash</b></td>
                </tr>
                <tr>
                    <td colSpan={2}><b>Built-in flash</b><br />No</td>
                    <td><b>Sync speed</b><br />1/180s</td>
                    <td><b>P-TTL flash</b><br />Yes</td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <b>Flash functions</b><br />
                        Auto discharge, On (leading curtain sync), Redeye reduction, Slow-speed sync, Trailing curtain sync, High-speed sync, Manual, Wireless, Contrast control<br />
                    </td>
                    <td><b>TTL flash</b><br />No</td>
                    <td><b>Flash exposure comp</b><br />-2 to 1 EV</td>
                </tr>
                <tr>
                    <td colSpan={4}><b>Video</b></td>
                </tr>
                <tr>
                    <td colSpan={2} rowSpan={2}>
                        <b>Resolution / Framerates</b><br />
                        1920x1080 (16:9 Full HD) at 60i, 50i, 30p, 25p and 24p fps,<br />
                        1280x720 (16:9) at 60p, 50p, 30p, 25p and 24p fps,<br />
                        MPEG4 AVC/H.264,<br />
                        Interval Movie (4K, Full HD, HD)
                    </td>
                    <td><b>Exposure Modes</b><br />P, Av, TAv, Tv, M</td>
                    <td><b>Movie mode restrictions</b><br />Clips up to 4 GB / 25 minutes</td>
                </tr>
                <tr>
                    <td><b>AF During Recording</b><br />On-Demand</td>
                    <td><b>Sound in Movie mode</b><br />Stereo (external mic), Mono (built-in mic). Adjustable sound level</td>
                </tr>
                <tr>
                    <td colSpan={4}><b>Interfacing</b></td>
                </tr>
                <tr>
                    <td><b>GPS</b><br />Built-In</td>
                    <td><b>Tethering</b><br />Via O-FC1 FLUcard</td>
                    <td><b>Connectivity</b><br />USB 3, HDMI out, stereo mic, headphones, DC in, X-sync, cable release</td>
                    <td><b>Latest Firmware</b><br /> <a rel="nofollow" href="http://www.ricoh-imaging.co.jp/english/support/digital/k3_2.html">Link to Download Page</a> </td>
                </tr>
            </tbody>
        </table>
    )
}

const orderByOptions = ['model', 'make', 'focal length', 'max aperture', 'weight'] as const

function orderLensesBy (lenses: ILenseData[], orderBy: C<typeof orderByOptions>) {
    if (orderBy === 'model' || orderBy === 'make') return lenses.concat().sort((l, r) => l[orderBy].localeCompare(r[orderBy]))
    else if (orderBy === 'weight') return lenses.concat().sort((l, r) => l[orderBy] - r[orderBy])
    else if (orderBy === 'focal length') return lenses.concat().sort((l, r) => getValueOrRangeValue(l.focus.focalLength) - getValueOrRangeValue(r.focus.focalLength))
    else if (orderBy === 'max aperture') return lenses.concat().sort((l, r) => getValueOrRangeValue(l.aperture.max) - getValueOrRangeValue(r.aperture.max))
    return lenses

    function getValueOrRangeValue<T> (valueOrRange: IValueOrRange<T>, index = 0) {
        return Array.isArray(valueOrRange) ? valueOrRange[index] : valueOrRange
    }
}

function MyLenses ({items}: {
    items: Array<ILenseData>
}) {
    const [orderedItems, setOrderedItems] = useState(items)
    const handleSelectOrderBy: ChangeEventHandler<HTMLSelectElement> = ({target}) => {
        setOrderedItems(orderLensesBy(items, target.value as C<typeof orderByOptions>))
    }

    return (
        <>
            <div className={styles.filters}>
                <label>
                    <span>Order By </span>
                    <select defaultValue="model" onChange={handleSelectOrderBy} name="orderby">
                        {orderByOptions.map(key => (
                            <option key={key} value={key}>{key}</option>
                        ))}
                    </select>
                </label>
            </div>

            <ol className={styles.list}>
                {orderedItems.map(item => (
                    <li key={item.model}>
                        <details>
                            <summary>{item.model}</summary>
                            <LensDataTable item={item} />
                        </details>
                    </li>
                ))}
            </ol>
        </>
    )
}

function LensDataTable ({item}: {
    item: ILenseData
}) {
    return (
        <table>
            <tbody>
                <tr style={{backgroundColor: 'var(--color-bg-secondary)'}}>
                    <td>Make</td>
                    <td colSpan={2}>{item.make}</td>
                </tr>
                <tr>
                    <td>Publish Year</td>
                    <td colSpan={2}>{item.year}</td>
                </tr>
                <tr style={{backgroundColor: 'var(--color-bg-secondary)'}}>
                    <td>format</td>
                    <td colSpan={2}>{item.format}</td>
                </tr>
                <tr>
                    <td>Mount</td>
                    <td colSpan={2}>{item.mount}</td>
                </tr>
                <tr style={{backgroundColor: 'var(--color-bg-secondary)'}}>
                    <td>Weight</td>
                    <td colSpan={2}>{item.weight}g</td>
                </tr>
                <tr>
                    <td rowSpan={3}>Size</td>
                    <td>Filter Size</td>
                    <td>{item.size.filter}mm</td>
                </tr>
                <tr>
                    <td>Length</td>
                    <td>{item.size.length}mm</td>
                </tr>
                <tr>
                    <td>Diameter</td>
                    <td>{item.size.diameter}mm</td>
                </tr>
                <tr style={{backgroundColor: 'var(--color-bg-secondary)'}}>
                    <td rowSpan={4}>Focus</td>
                    <td>Focal Length</td>
                    <td><ValueOrRange value={item.focus.focalLength} />mm</td>
                </tr>
                <tr style={{backgroundColor: 'var(--color-bg-secondary)'}}>
                    <td>Min Focus</td>
                    <td>{item.focus.min}cm</td>
                </tr>
                <tr style={{backgroundColor: 'var(--color-bg-secondary)'}}>
                    <td>Max Magnification</td>
                    <td>{item.focus.magnification}</td>
                </tr>
                <tr style={{backgroundColor: 'var(--color-bg-secondary)'}}>
                    <td>Method</td>
                    <td>{item.focus.method}</td>
                </tr>
                <tr>
                    <td rowSpan={3}>Aperture(1/f)</td>
                    <td>Max</td>
                    <td><ValueOrRange value={item.aperture.max} /></td>
                </tr>
                <tr>
                    <td>Min</td>
                    <td><ValueOrRange value={item.aperture.min} /></td>
                </tr>
                <tr>
                    <td>Blades</td>
                    <td>{item.aperture.blades}</td>
                </tr>
                <tr style={{backgroundColor: 'var(--color-bg-secondary)'}}>
                    <td>Optics</td>
                    <td colSpan={2}>{item.optics.elements} elements in {item.optics.groups} groups{!item.optics.aspherical ? null : (<>({item.optics.aspherical} aspherical)</>)}</td>
                </tr>
                <tr>
                    <td>Coating</td>
                    <td colSpan={2}>{Array.isArray(item.optics.coating) ? (item.optics.coating.join(', ')) : item.optics.coating}</td>
                </tr>
                <tr style={{backgroundColor: 'var(--color-bg-secondary)'}}>
                    <td>Weather sealing</td>
                    <td colSpan={2}>{item.weather.sealing ? 'Yes' : 'No'}</td>
                </tr>
            </tbody>
        </table>
    )
}

function ValueOrRange ({value}: {value: IValueOrRange<string | number>}) {
    if (Array.isArray(value)) return (<>{value[0]} - {value.at(-1)}</>)
    return value
}
