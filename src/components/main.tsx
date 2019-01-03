import * as React from 'react'
import PanelLeft from './panel/left'
import PanelRight from './panel/right'
import WeatherAnimation from './weather/animation'


export default function Main () {
  return (
    <main>
      <WeatherAnimation
        type="sun"
        size="small"
        backgroundColor="rgba(#000, 0.4)"
      />

      <div className="container">
        <div className="row">
          <PanelLeft />
          <PanelRight />
        </div>
      </div>
    </main>
  )
}
