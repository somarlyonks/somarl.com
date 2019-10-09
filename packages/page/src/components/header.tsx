import { h } from 'preact' // lgtm [js/unused-local-variable]
import WeatherWidget from './weather/widget'


export default function Header () {
  return (
    <header>
      <nav class="nav absolute tl-0 flex">
        <WeatherWidget />
      </nav>
    </header>
  )
}
