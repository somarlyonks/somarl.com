import { h, Component } from 'preact' // lgtm [js/unused-local-variable]

import { useRedux } from '../../redux'


export default class PanelRight extends Component<{}, {}> {
  public render () {
    const { terminalState, richOutput } = useRedux(state => ({
      terminalState: state.global.terminalState,
      richOutput: state.global.richOutput,
    }))

    return (
      <section className={`col-md panel-right fluent-arcylic ${terminalState === 'output' ? '' : 'panel-right_hidden'}`}>
        <article className="panel-right__content no-scrollbar font-read">
          {richOutput}
        </article>
      </section>
    )
  }
}
