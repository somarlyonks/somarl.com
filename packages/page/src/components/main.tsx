import { h } from 'preact' // lgtm [js/unused-local-variable]
import PanelLeft from './panel/left'
import PanelRight from './panel/right'
import WeatherWidget from './weather/widget'


export default function Main () {
  return (
    <main>
      <nav class="nav absolute tl-0 flex">
        <WeatherWidget />
      </nav>

      <div class="container">
        <div class="row">
          <PanelLeft />
          <PanelRight />
        </div>
      </div>
    </main>
  )
}
