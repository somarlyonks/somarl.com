import { render, h } from 'preact'
import App from './App'
import './css/index.css'
import registerServiceWorker from './registerServiceWorker'


render(<App />, document.body, document.body.lastElementChild!)


registerServiceWorker()
