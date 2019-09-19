import { h, Component } from 'preact' // lgtm [js/unused-local-variable]

import { useCallback } from 'preact/hooks'

import { IImplState, useMappedState } from '../../redux/store'

// import WeatherBoard from '../weather/board'


export default class PanelRight extends Component<{}, {}> {
  public render () {
    const { global } = useMappedState(useCallback((state: IImplState) => state, []))

    return (
      <section className={`col-md panel-right fluent-arcylic ${global.terminalState === 'output' ? '' : 'panel-right_hidden'}`}>
        <article className="panel-right__content font-read">
          {global.richOutput}
        </article>
      </section>
    )
  }
}
