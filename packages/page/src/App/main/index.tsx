
import { h } from 'preact' // lgtm [js/unused-local-variable]

import PanelLeft from 'src/components/panel/left'
import PanelRight from 'src/components/panel/right'
import { Route, Switch } from 'src/router'
import F0F from './404'


export default function Main () {
  return (
    <main>
      <Switch>
        <Route path="/">
          <div class="container">
            <div class="row">
              <PanelLeft />
              <PanelRight />
            </div>
          </div>
        </Route>

        <Route path="/:missing*" component={F0F} />
      </Switch>
    </main>
  )
}
