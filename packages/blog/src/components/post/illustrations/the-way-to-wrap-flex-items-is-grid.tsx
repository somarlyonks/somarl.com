import {useState} from 'react'

import styles from './the-way-to-wrap-flex-items-is-grid.module.scss'


export default function Items ({className = '', defaultItemCount}: {
    className?: string,
    defaultItemCount?: number,
}) {
    const minCount = 5
    const maxCount = 100
    const [itemCount, setItemCount] = useState(defaultItemCount || minCount)
    const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItemCount(Number(event.target.value))
    }

    return (
        <section className={`${styles['illustration-items-container']} ${className && styles[className]}`}>
            <ul>
                {Array.from({length: itemCount}, (_, i) => (
                    <li key={i}>
                        {i < 2 ? <CheckedCircleFilled /> : <CheckedCircle />}
                    </li>
                ))}
            </ul>
            <input type="range" min={minCount} max={maxCount} step={1} value={itemCount} onChange={handleCountChange} />
        </section>
    )
}

function CheckedCircle () {
    return (
        <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M25 2C12.317 2 2 12.317 2 25s10.317 23 23 23 23-10.317 23-23c0-4.56-1.34-8.81-3.637-12.389l-1.369 1.618A20.846 20.846 0 0146 25c0 11.579-9.421 21-21 21S4 36.579 4 25 13.421 4 25 4c5.443 0 10.394 2.1 14.129 5.51l1.309-1.545A22.912 22.912 0 0025 2zm18.236 5.754l-19.322 22.8-8.133-7.585-1.363 1.463 9.666 9.015 20.68-24.4-1.528-1.293z" />
        </svg>
    )
}

function CheckedCircleFilled () {
    return (
        <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M43.171 10.925L24.085 33.446l-9.667-9.015 1.363-1.463 8.134 7.585L41.861 9.378C37.657 4.844 31.656 2 25 2 12.317 2 2 12.317 2 25s10.317 23 23 23 23-10.317 23-23a22.876 22.876 0 00-4.829-14.075z" />
        </svg>
    )
}
