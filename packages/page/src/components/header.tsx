import { h } from 'preact' // lgtm [js/unused-local-variable]
import WeatherWidget from './weather/widget'


export default function Header () {
  return (
    <header class="nav absolute tl-0 flex">
      <WeatherWidget />
    </header>
  )
}
