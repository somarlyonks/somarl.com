
import { h } from 'preact' // lgtm [js/unused-local-variable]

import WeatherWidget from 'src/components/weather'
import { Avatar, Login } from 'src/components/sui'
import Terminal from 'src/components/terminal'

import { useRedux } from 'src/redux'


export default function Header () {
  const { user, logged } = useRedux(state => ({
    logged: state.user.isLoggedIn,
    user: state.user.user,
  }))

  return (
    <header class="nav absolute--tl flex">
      <WeatherWidget />
      <Terminal />
      <div class="flex-grow" />
      {logged
        ? <Avatar class="mg--5" user={user} />
        : <Login />
      }
    </header>
  )
}
