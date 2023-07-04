import {PropsWithChildren} from 'react'

import './layout.scss'


export default function Layout ({children}: PropsWithChildren) {
    return (
        <>{children}</>
    )
}
