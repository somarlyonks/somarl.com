import { h } from 'preact' // lgtm [js/unused-local-variable]

import { useRedux } from 'src/redux'

import WeatherWidget from './weather/widget'
import { Avatar } from 'src/components/sui'


export default function Header () {
  const { user } = useRedux(state => ({
    user: state.user.user,
  }))

  return (
    <header class="nav absolute--tl flex">
      <WeatherWidget />
      <div class="flex-grow" />
      <Avatar class="mg--5" user={user} />
    </header>
  )
}
