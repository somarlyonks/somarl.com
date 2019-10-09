import { h } from 'preact' // lgtm [js/unused-local-variable]
import PanelLeft from './panel/left'
import PanelRight from './panel/right'


export default function Main () {
  return (
    <main>
      <div class="container">
        <div class="row">
          <PanelLeft />
          <PanelRight />
        </div>
      </div>
    </main>
  )
}
