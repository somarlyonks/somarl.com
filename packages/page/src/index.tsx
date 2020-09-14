
import { h, render } from 'preact' // lgtm [js/unused-local-variable]

import App from './App'
import './css/index.css'
import registerServiceWorker from './registerServiceWorker'


render(<App />, document.body, document.body.lastElementChild!)


registerServiceWorker()
