import { h } from 'preact' // lgtm [js/unused-local-variable]
import WeatherWidget from './weather/widget'


export default function Header () {
  return (
    <header class="nav absolute--tl flex">
      <WeatherWidget />
    </header>
  )
}
