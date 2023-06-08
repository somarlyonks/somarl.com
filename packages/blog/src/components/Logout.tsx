'use client'

import Userfront from '@/libs/userfront'


export default function Logout () {
    Userfront.logout()
    return null
}
