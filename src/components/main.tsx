import * as React from 'react'
import PanelLeft from './panel/left'
import PanelRight from './panel/right'


export default function Main () {
  return (
    <main>
      <div className="container">
        <div className="row">
          <PanelLeft />
          <PanelRight />
        </div>
      </div>
    </main>
  )
}
